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
    src="img/${img.id}.jpeg" alt="" />
  `)
    )
    .join('')

  elGallery.innerHTML = strHTMLs
  elGallery.classList.remove('hide')
  document.querySelector('.main-canvas-continer').classList.add('hide')
  document.querySelector('.saved-memes-gallery').classList.add('hide')
}

function onImgSelect(imgId) {
  creatMeme(imgId)
  setImg(imgId)
  renderMeme()
  closeSavedGallery()
  window.addEventListener('resize', resizeCanvas)
}

function onMakeMeme() {
  creatMeme()
  const elCurrNav = document.querySelector('.nav-meme')
  onOpenSection(elCurrNav)

  renderMeme()
  closeSavedGallery()
}
