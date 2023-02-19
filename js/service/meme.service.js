'use strict'
const STORAGE_KEY = 'memeDB'
var gCurrPage = 'gallery'
var gImgs = []
var gMemes = []
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gTxts = [
  'I can buy myself flowers',
  'Talk to myself for hours',
  'I can take myself dancing',
  'I can love me better than you can',
  'Started to cry but then remembered I',
  'Write my name in the sand',
  'Paint my nails, cherry red',
  'No remorse, no regret',
  'I forgive every word you said',
  'We were good, we were gold',
  "Kinda dream that can't be sold",
  "We were right 'til we weren't",
  'Built a home and watched it burn',
  "POV: I didn't wanna leave you",
  "POV:I didn't wanna lie",
]
var gMeme = {}

function creatLine(x, y, txt, size, colorTxt, colorStroke) {
  return {
    x,
    y,
    txt,
    size,
    align: 'left',
    colorTxt,
    colorStroke,
    font: 'impact',
    isDrag: false,
  }
}

function creatMeme(imgId, src) {
  if (!imgId) imgId = getRandomInt(1, gImgs.length)

  if (!src) src = `img/${imgId}.JPEG`

  gMeme = {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    src,
    lines: [
      creatLine(
        10,
        100,
        gTxts[getRandomInt(0, 14)],
        getRandomInt(28, 35),
        getRandomColor(),
        getRandomColor()
      ),
      creatLine(
        10,
        300,
        gTxts[getRandomInt(0, 14)],
        getRandomInt(28, 35),
        getRandomColor(),
        getRandomColor()
      ),
    ],
  }
}
function updateMemeSrc(src) {
  gMeme.src = src
}
function updateMemeId() {
  gMeme.selectedImgId = getRandomInt(100, 999)
}

function updateFontSize(line) {
  line.size = line.size - 10
}

function updateCurrLine(idx) {
  gMeme.selectedLineIdx = idx
}

function getMeme() {
  return gMeme
}

function getMemes() {
  return gMemes
}

function getImgs() {
  return gImgs
}

function getCurrPage() {
  return gCurrPage
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getCurrLineTxt() {
  return gMeme.lines[gMeme.selectedLineIdx].txt
}
function getLines() {
  return gMeme.lines
}

function getCurrLineIdx() {
  return gMeme.selectedLineIdx
}

function getMemeId(memeId) {
  const meme = gMemes.findIndex((meme) => memeId === meme.selectedImgId)
  return meme
}

function getSevedMemes() {
  return _loadMemesFromStorage()
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function getSavedMeme(id) {
  gMemes = _loadMemesFromStorage()

  return gMemes.find((meme) => meme.id === id)
}

function setFontFamily(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setColor(color, element) {
  if (element === 'txt') gMeme.lines[gMeme.selectedLineIdx].colorTxt = color
  if (element === 'stroke')
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color
}

function setFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff * 2
}

function setTxtAling(diraction) {
  gMeme.lines[gMeme.selectedLineIdx].align = diraction
}

function setCurrLine() {
  gMeme.selectedLineIdx++

  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setSaveMemeId(meme) {
  meme.id = makeId()
}

function addLine() {
  gMeme.lines.push(creatLine(50, 200, 'Your Punch', 28, '#fff', '#333'))
}

function deleteLine() {
  const currLineIdx = getCurrLineIdx()
  gMeme.lines.splice(currLineIdx, 1)
}

function createImgs() {
  for (var i = 1; i < 8; i++) {
    gImgs.push(_creatImg(i))
  }
}

function _creatImg(id) {
  return {
    id,
    url: `img/${id}.jpg`,
    keywords: ['funny', 'cat'],
  }
}

function isLineInCanvas(line) {
  const lineWidth = getLineWidth(line)
  if (line.align === 'right') return line.x + lineWidth > gElCanvas.width
  if (line.align === 'left') return line.x - lineWidth > gElCanvas.width
  if (line.align === 'center') return line.x + lineWidth / 2 > gElCanvas.width
}

function moveLine(dx, dy) {
  const currLine = gMeme.lines[gMeme.selectedLineIdx]
  currLine.x += dx
  currLine.y += dy
}

function saveMeme(meme) {
  gMemes.push(meme)
  _saveMemesToStorage()
}

function deleteSavedMeme(memeId) {
  const memeIdx = getMemeId(memeId)
  gMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gMemes)
}

function _loadMemesFromStorage() {
  return loadFromStorage(STORAGE_KEY)
}
