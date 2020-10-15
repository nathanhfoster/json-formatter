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
  const [formattedJSON, setFormattedJSON] = useState(() => getCode(DEFAULT_JSON, DEFAULT_CODE))

  const [code, setCode] = useState(DEFAULT_CODE)

  const [error, setError] = useState(false)

  const handleCodeChange = useCallback(({ target: { value } }) => setCode(value), [])

  const loadJSON = useCallback(({ target: { files: { 0: file }, value } }) => {
    var reader = new FileReader()
    reader.onload = ({ target: { result } }) => {
      const json = JSON.parse(result)
      setFormattedJSON(json)
    }
    reader.readAsText(file)
  }, [])

  const submitCode = useCallback(() => {
    setFormattedJSON(prevJSON => {
      const nextJson = getCode(prevJSON, code)
      if (nextJson) {
        setError(false)
        return nextJson
      } else {
        setError(true)
        return prevJSON
      }
    })
  }, [code])

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
    <main className='App'>
      <Container onScroll={setReachedBottomCallback}>
        <Row>
          <header className='App-header'>
            <h1>JSON Formatter</h1>
            <p>Use JavaScript to manipulate the JSON file</p>
          </header>
        </Row>
        <Row>
          <h2 style={{ borderBottom: '2px solid white' }}>Code Input</h2>
        </Row>
        <Row>
          <Input type='file' accept='.json' onChange={loadJSON} multiple={false} />
        </Row>
        <Row>
          <Col>
            <TextArea value={code} onChange={handleCodeChange} />
            <Col xs={error ? 10 : 12}>
              <Button onClick={submitCode}>Save</Button>
              <Button color='#2ecc71' onClick={copyFormattedJSOn}>
                COPY
              </Button>
              <Button color='#e74c3c' onClick={exportFormattedJSON} disabled={error}>
                Export
              </Button>
            </Col>
            {error && (
              <Col xs={2}>
                <h3 style={{ color: '#e74c3c' }}>ERROR!</h3>
              </Col>
            )}
          </Col>
        </Row>
        <Row>
          <h2 style={{ borderBottom: '2px solid white' }}>JSON Output</h2>
        </Row>
        <Row>
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
    </main>
  )
}

export default App
