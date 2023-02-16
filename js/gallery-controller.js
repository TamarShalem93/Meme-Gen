'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  const imgs = getImgs()
  var strHTMLs =
    '<button class="btn btn-random flex" onclick="onMakeMeme()">Random Meme</button>'
  strHTMLs += imgs
    .map(
      (img) =>
        (img = `
    <img onclick="onImgSelect(${img.id})"
    src="img/${img.id}.JPEG" alt="" />
  `)
    )
    .join()

  elGallery.innerHTML = strHTMLs
  elGallery.classList.remove('hide')
  document.querySelector('.main-canvas-continer').classList.add('hide')
}

function onImgSelect(imgId) {
  creatMeme(imgId)
  setImg(imgId)
  const elNavMeme = document.querySelector('.nav-meme')
  onOpenSection('meme', elNavMeme)
  renderMeme()
}

function onMakeMeme() {
  creatMeme()
  updateNav()
  renderMeme()
}

function updateNav() {
  const elNavMeme = document.querySelector('.nav-meme')
  onOpenSection('meme', elNavMeme)
}
