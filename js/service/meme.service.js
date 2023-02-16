'use strict'
const STORAGE_KEY = 'memeDB'
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
        50,
        100,
        gTxts[getRandomInt(0, 14)],
        getRandomInt(10, 40),
        getRandomColor(),
        getRandomColor()
      ),
      creatLine(
        50,
        300,
        gTxts[getRandomInt(0, 14)],
        getRandomInt(10, 40),
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

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}
function addLine() {
  gMeme.lines.push(
    creatLine(
      50,
      200,
      gTxts[getRandomInt(0, 14)],
      getRandomInt(10, 40),
      getRandomColor(),
      getRandomColor()
    )
  )
  console.log(gMeme)
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
  console.log(diraction)
  gMeme.lines[gMeme.selectedLineIdx].align = diraction
}

function setCurrLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
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

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function isLineClicked(clickedPos) {
  const currLine = gMeme.lines[gMeme.selectedLineIdx]
  var x = currLine.x
  var y = currLine.y

  const lineMeasure = gCtx.measureText(currLine)
  const currLineWidth = lineMeasure.width
  const currLineHight =
    lineMeasure.fontBoundingBoxAscent + lineMeasure.fontBoundingBoxDescent

  if (currLine.align === 'right')
    return (
      (clickedPos.x < x && clickedPos.x > x + currLineWidth) ||
      (clickedPos.y < y && clickedPos.y > y + currLineHight)
    )

  if (currLine.align === 'left')
    return (
      (clickedPos.x > x && clickedPos.x < x + currLineWidth) ||
      (clickedPos.y > y && clickedPos.y < y + currLineHight)
    )

  if (currLine.align === 'center')
    return (
      (clickedPos.x < x + currLineWidth / 2 &&
        clickedPos.x > x - currLineWidth / 2) ||
      (clickedPos.y < y + currLineHight / 2 &&
        clickedPos.y > y - currLineHight / 2)
    )
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
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
function getMemes() {
  return gMemes
}
function deleteSavedMeme(memeId) {
  const memeIdx = getMemeId(memeId)
  gMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
}

function getMemeId(memeId) {
  const meme = gMemes.findIndex((meme) => memeId === meme.selectedImgId)
  return meme
}

function getSevedMemes() {
  return _loadMemesFromStorage()
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gMemes)
}

function _loadMemesFromStorage() {
  return loadFromStorage(STORAGE_KEY)
}
