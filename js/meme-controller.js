'use strict'

let gElCanvas, gCtx
let gStartPos = { x: null, y: null }
let gIsDrag = false

function init() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  // addListeners()
  // renderCanvas()
  renderMeme()
  // createImgs()
}

function renderMeme() {
  const meme = getMeme()
  console.log(meme)
  // that renders an image
  // on the canvas and a line of text on top
  loadImage(meme)
}

function loadImage(meme) {
  let img = new Image()
  img.src = `img/${meme.selectedImgId}.jpg`
  img.onload = () => {
    renderImg(img)
    drawText(meme.lines[meme.selectedLineIdx])
  }
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(line) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = '#000'
  gCtx.fillStyle = `${line.color}`
  gCtx.font = `${line.size}px Impact`
  gCtx.textAlign = `${line.align}`
  gCtx.textBaseline = 'middle'

  gCtx.fillText(line.txt, line.x, line.y)
  gCtx.strokeText(line.txt, line.x, line.y)
}

function onTxtInput(txt) {
  ev.preventDefault()
  setLineTxt(txt)
  // return txt
}

function onClearCanvas() {
  gCtx.fillStyle = '#ede5ff59'
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    init()
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
