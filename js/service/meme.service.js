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
  ],
}
// createImgs()
function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  console.log('hi')
  console.log(`${txt}`)
}

function createImgs() {
  for (var i = 1; i < 3; i++) {
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
