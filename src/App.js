import React, { useState, useCallback, useMemo, useEffect } from 'react'
import JSONPretty from 'react-json-pretty'
import { copyStringToClipboard, downloadObjectAsJson } from 'utils'
import {
  Button,
  CodeEditor,
  TextArea,
  Input,
  MemoizedComponent,
  Container,
  Row,
  Col,
} from 'components'
import { useScrollable } from 'hooks'

const DEFAULT_JSON = [{ id: 'Upload your json file' }]

const DEFAULT_CODE = `.reduce((acc, e) => {
   acc.push(e)
   return acc
}, [])`

const JSON_RENDER_OFFSET = 6
const DEFAULT_JSON_RANGE = [0, JSON_RENDER_OFFSET * 2]

const getCode = (json, code) => {
  let result
  const expression = JSON.stringify(json).concat(code)

  try {
    result = eval(expression)
  } catch (e) {
    // console.log(e)
  }

  return result
}

const App = () => {
  const [json, setJSON] = useState(() => getCode(DEFAULT_JSON, DEFAULT_CODE))
  const [formattedJSON, setFormattedJSON] = useState(json)

  const [code, setCode] = useState(DEFAULT_CODE)

  const [error, setError] = useState(false)

  const handleCodeChange = useCallback(({ target: { value } }) => setCode(value), [])

  const loadJSON = useCallback(
    ({
      target: {
        files: { 0: file },
        value,
      },
    }) => {
      var reader = new FileReader()
      reader.onload = ({ target: { result } }) => {
        const json = JSON.parse(result)
        const formattedJson = getCode(json, code)
        setJSON(json)
        if (formattedJson) {
          setFormattedJSON(formattedJson)
        } else {
          setError(true)
        }
      }
      reader.readAsText(file)
    },
    [code],
  )

  const applyCode = useCallback(() => {
    setFormattedJSON(prevJSON => {
      const nextJson = getCode(json, code)
      if (nextJson) {
        setError(false)
        return nextJson
      } else {
        setError(true)
        return prevJSON
      }
    })
  }, [json, code])

  const copyFormattedJSOn = useCallback(() => {
    copyStringToClipboard(JSON.stringify(formattedJSON))
  }, [formattedJSON])

  const exportFormattedJSON = useCallback(() => {
    downloadObjectAsJson(formattedJSON)
  }, [formattedJSON])

  const [viewableJsonObjects, setViewableJsonObjects] = useState(DEFAULT_JSON_RANGE)

  const [beginOffset, endOffset] = viewableJsonObjects

  const [reachedBottom, setReachedBottomCallback] = useScrollable()

  useEffect(() => {
    if (reachedBottom) {
      setViewableJsonObjects(prev => [prev[0], prev[1] + JSON_RENDER_OFFSET])
    }
  }, [reachedBottom])

  const viewableJson = useMemo(() => formattedJSON?.slice(beginOffset, endOffset), [
    beginOffset,
    endOffset,
    formattedJSON,
  ])

  return (
    <Container className='App' onScroll={setReachedBottomCallback}>
      <Row>
        <header className='App-header'>
          <h1>JSON Formatter</h1>
          <p style={{ margin: 0 }}>Use JavaScript to manipulate the JSON file</p>
        </header>
      </Row>
      <Row>
        <h2>{`Code Input | length: ${json?.length}`}</h2>
      </Row>
      <Row>
        <Input type='file' accept='.json' onChange={loadJSON} multiple={false} />
      </Row>
      <Row>
        <TextArea value={code} onChange={handleCodeChange} />
        <Col xs={error ? 10 : 12}>
          <Button onClick={applyCode}>APPLY CODE</Button>
          <Button color='#2ecc71' onClick={copyFormattedJSOn}>
            COPY JSON
          </Button>
          <Button color='#e74c3c' onClick={exportFormattedJSON} disabled={error}>
            EXPORT JSON
          </Button>
        </Col>
        {error && (
          <Col xs={2}>
            <h3 style={{ color: '#e74c3c' }}>ERROR!</h3>
          </Col>
        )}
      </Row>
      <Row>
        <h2>{`JSON Output | length: ${formattedJSON?.length}`}</h2>
      </Row>
      <Row style={{ height: 'calc(100vh - 115px - 70px - 21px - 90px - 48px - 70px)' }}>
        <MemoizedComponent
          Component={JSONPretty}
          id='json-pretty'
          // data={formattedJSON}
          json={viewableJson}
          // silent={false}
          space={1}
          // onJSONPrettyError={}
        />
      </Row>
    </Container>
  )
}

export default App
