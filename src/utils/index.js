const copyStringToClipboard = (s) => {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(s)
      .then((text) => {
        // Success!
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
  }
}

const downloadObjectAsJson = (exportObj, exportName = "formattedJson") => {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj))
  var downloadAnchorNode = document.createElement("a")
  downloadAnchorNode.setAttribute("href", dataStr)
  downloadAnchorNode.setAttribute("download", exportName + ".json")
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

export { copyStringToClipboard, downloadObjectAsJson }
