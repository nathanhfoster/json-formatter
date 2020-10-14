import React, { useState, useCallback } from "react"
import JSONPretty from "react-json-pretty"
import jsonFile from "./jsonFile.json"
import { copyStringToClipboard, downloadObjectAsJson } from "utils"
import { Button, TextArea, Input, MemoizedComponent } from "components"

const DEFAULT_CODE = `.map(e => e)`

const RED_BUTTON = { background: "#e74c3c" }

const GREEN_BUTTON = { background: "#2ecc71" }

const getCode = (json, code) => {
  let result = json
  const expression = JSON.stringify(json).concat(code)

  try {
    result = eval(expression)
  } catch (e) {
    console.log(e)
  }

  return result
}

const App = () => {
  const [formattedJSON, setFormattedJSON] = useState(() =>
    getCode(jsonFile, DEFAULT_CODE)
  )

  const [code, setCode] = useState(DEFAULT_CODE)

  const handleCodeChange = useCallback(
    ({ target: { value } }) => setCode(value),
    []
  )

  const loadJSON = useCallback(({ target: { files } }) => {
    console.log(files)
  }, [])

  const submitCode = useCallback(() => {
    setFormattedJSON((prevJSON) => getCode(prevJSON, code))
  }, [code])

  const copyFormattedJSOn = useCallback(() => {
    copyStringToClipboard(JSON.stringify(formattedJSON))
  }, [formattedJSON])

  const exportFormattedJSON = useCallback(() => {
    downloadObjectAsJson(formattedJSON)
  }, [formattedJSON])

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Formatter</h1>
        <p>Use JavaScript to manipulate the JSON file</p>
      </header>
      <div>
        <Input
          type="file"
          accept=".json"
          onChange={loadJSON}
          multiple={false}
        />
      </div>
      <div style={{ width: "50%" }}>
        <TextArea value={code} onChange={handleCodeChange} />
        <Button onClick={submitCode}>Save</Button>
        <Button style={GREEN_BUTTON} onClick={copyFormattedJSOn}>
          COPY
        </Button>
        <Button style={RED_BUTTON} onClick={exportFormattedJSON}>
          Export
        </Button>
      </div>
      <div style={{ width: "50%" }}>
        <MemoizedComponent
          Component={JSONPretty}
          id="json-pretty"
          // data={formattedJSON}
          json={formattedJSON}
          // silent={false}
          space={1}
          // onJSONPrettyError={}
        />
      </div>
    </div>
  )
}

export default App
