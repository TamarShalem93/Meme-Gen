'use strict'

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
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      x: 200,
      y: 100,
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
    {
      x: 100,
      y: 300,
      txt: 'I love CSS',
      size: 50,
      align: 'rigth',
      color: 'blue',
    },
  ],
}

createImgs()
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

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(diff) {
  let fontSize = 1
  if (diff === '-') fontSize = -1
  gMeme.lines[gMeme.selectedLineIdx].size += fontSize
}

function setCurrLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function creatMeme(selectedImgId, selectedLineIdx, lines) {
  return {
    selectedImgId,
    selectedLineIdx,
    lines,
  }
}

function creatLines(
  txt = gTxts[getRandomInt(0, 14)],
  size = getRandomInt(10, 100),
  color = getRandomColor(),
  length = getRandomInt(1, 2)
) {
  let lines = []

  for (var i = 0; i < length; i++) {
    lines.push({
      x: i + 100,
      y: i + 200,
      txt,
      size,
      align: 'center',
      color,
    })
  }
  return lines
}

function creatMemes() {}

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
