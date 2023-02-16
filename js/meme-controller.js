'use strict'

let gElCanvas, gCtx
let gStartPos = { x: null, y: null }
let gIsDrag = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme() {
  const meme = getMeme()
  loadImage(meme)

  document.querySelector('.gallery').classList.add('hide')
  document.querySelector('.main-canvas-continer').classList.remove('hide')
  setCanvas()
  renderSavedMemes()
}

function setCanvas() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()
  addListeners()
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function loadImage(meme) {
  let img = new Image()
  img.src = meme.src
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
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

function drawText(lines) {
  lines.forEach((line) => {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = '#000'
    gCtx.fillStyle = `${line.color}`
    gCtx.font = `${line.size}px Impact`
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

function onChangeColor(color) {
  setColor(color)
  renderMeme()
}

function onChangeFontSize(ev, diff) {
  ev.preventDefault()
  setFontSize(diff)
  renderMeme()
}

function onChangeLine() {
  setCurrLine()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme()
  })
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

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
