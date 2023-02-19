'use strict'

let gElCanvas, gCtx
let gStartPos = { x: null, y: null }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme(savedMeme = false) {
  let meme = savedMeme ? savedMeme : getMeme()

  loadImage(meme)
  document.querySelector('.gallery').classList.add('hide')
  document.querySelector('.saved-memes-gallery').classList.add('hide')
  document.querySelector('.main-canvas-continer').classList.remove('hide')

  setCanvas()
}

function setCanvas() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
  renderMeme()
}

function loadImage(meme) {
  let img = new Image()
  img.src = `img/${meme.selectedImgId}.jpeg`
  img.onload = () => {
    renderImg(img)
    gCtx.imageSmoothingEnabled = true
    gCtx.imageSmoothingQuality = 'high'
    drawText(meme.lines)
  }
}

function onImgInput(ev) {
  setMemeSrc(ev)
  loadImage(ev, renderImg)
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadCanvas(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function drawText(lines) {
  lines.forEach((line) => {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = `${line.colorStroke}`
    gCtx.fillStyle = `${line.colorTxt}`
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
  })
}

function onTxtInput(ev, txt) {
  ev.preventDefault()
  setLineTxt(txt)
  renderMeme()
}

function setTxtInput() {
  const currLineTxt = getCurrLineTxt()
  const txtInput = document.querySelector("[name = 'txt']")
  txtInput.value = currLineTxt
}

function onAlingTxt(ev, diraction) {
  ev.preventDefault()
  setTxtAling(diraction)
  renderMeme()
}
function onUpdateFontFamily(value) {
  setFontFamily(value)
  renderMeme()
}

function onOpenColor(elLabel) {
  var labelID

  elLabel.click(() => {
    labelID = elLabel.attr('for')
    document.querySelector('#' + labelID).trigger('click')
    document.querySelector('#' + labelID).hidden = false
  })
}

function onAddLine() {
  addLine()
  const lines = getLines()
  updateCurrLine(lines.length - 1)
  renderMeme()
  setTxtInput()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
  flashMsg('Line deleted')
}

function onChangeTxtColor(color) {
  setColor(color, 'txt')
  renderMeme()
}

function onChangeStrokeColor(color) {
  setColor(color, 'stroke')
  renderMeme()
}

function onChangeFontSize(ev, diff) {
  ev.preventDefault()
  setFontSize(diff)
  renderMeme()
}

function onChangeLine() {
  setCurrLine()
  setTxtInput()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) return

  setLineDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  if (!getLine()) return
  const { isDrag } = getLine()
  if (!isDrag) return

  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveLine(dx, dy)

  gStartPos = pos
  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function isLineClicked(clickedPos) {
  const { lines } = getMeme()
  // debugger
  for (let idx = 0; idx < lines.length; idx++) {
    let isLineClicked = checkLineCliked(lines[idx], clickedPos)
    console.log(isLineClicked)
    if (isLineClicked) {
      updateCurrLine(idx)
      return true
    }
  }
  return false
}

function checkLineCliked(line, clickedPos) {
  let lineWidth = getLineWidth(line.txt)
  console.log(line)
  console.log(line.x, lineWidth, clickedPos)

  let lineHight = getLineHight(line.txt)
  console.log(line.y, lineHight, clickedPos)

  if (line.align === 'right')
    return (
      line.x >= clickedPos.x &&
      clickedPos.x >= line.x + lineWidth &&
      line.y >= clickedPos.y &&
      clickedPos.y >= line.y - lineHight
    )

  if (line.align === 'left')
    return (
      line.x <= clickedPos.x &&
      clickedPos.x <= line.x + lineWidth &&
      line.y >= clickedPos.y &&
      clickedPos.y >= line.y - lineHight
    )

  if (line.align === 'center')
    return (
      clickedPos.x <= line.x + lineWidth / 2 &&
      clickedPos.x >= line.x - lineWidth / 2 &&
      line.y >= clickedPos.y &&
      clickedPos.y >= line.y - lineHight
    )
}

function getLineWidth(txt) {
  return gCtx.measureText(txt).width
}

function getLineHight(txt) {
  return (
    gCtx.measureText(txt).fontBoundingBoxAscent +
    gCtx.measureText(txt).fontBoundingBoxDescent
  )
}
