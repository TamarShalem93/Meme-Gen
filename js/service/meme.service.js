'use strict'

var gImgs = []
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
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

function createImgs() {
  for (var i = 1; i <= 18; i++) {
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
