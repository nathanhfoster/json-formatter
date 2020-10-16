const copyStringToClipboard = (s) => {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(s)
      .then((text) => {
        // Success!
        alert("Copied to clipboard!")
        return text
      })
      .catch((error) => {
        console.log("Something went wrong", error)
        return error
      })
  } else {
    // Create new element
    let el = document.createElement("textarea")
    // Set value (string to be copied)
    el.value = s
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute("readonly", "")
    document.body.appendChild(el)
    // Select text inside element
    el.select()
    // Copy text to clipboard
    document.execCommand("copy")
    // Remove temporary element
    document.body.removeChild(el)

    alert("Copied to clipboard!")
  }
}

const exportJSON = (data, name = "formattedJson") => {
  const fileName = `${name}.json`
  // const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  // let downloadAnchorNode = document.createElement('a')
  // downloadAnchorNode.setAttribute('href', dataStr)
  // downloadAnchorNode.setAttribute('download', fileName)
  // document.body.appendChild(downloadAnchorNode) // required for firefox
  // downloadAnchorNode.click()
  // downloadAnchorNode.remove()

  if (!data) {
    alert("No data")
    return
  }

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4)
  }

  let blob = new Blob([data], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a")

  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":")
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  a.dispatchEvent(e)
}

const loadJSON = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = ({ target: { result } }) => {
      const json = JSON.parse(result)
      return resolve(json)
    }
    reader.onerror = (error) => reject(error)
  })

export { copyStringToClipboard, exportJSON, loadJSON }
