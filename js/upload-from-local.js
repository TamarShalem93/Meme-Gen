function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = function (event) {
    let img = new Image()
    img.src = event.target.result
    updateMemeSrc(img.src)
    updateMemeId(img.src)

    img.onload = onImageReady.bind(null, img)
    let meme = getMeme()
    drawText(meme.lines)
  }
  reader.readAsDataURL(ev.target.files[0])
  console.log(ev.target.files[0])
}
