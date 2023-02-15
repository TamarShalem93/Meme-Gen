'use strict'
var gCurrNav = 'Gallery'

function init() {
  gElCanvas = document.querySelector('#meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  resizeCanvas()

  // addListeners()
  // renderCanvas()
  renderMeme()
  // renderGallery()
  // createImgs()
}

function onOpenSection(section, elCurrNav) {
  if (gCurrNav === section) return
  if (section === 'gallery') {
    renderGallery()
    elCurrNav.classList.add('active')
    document.querySelector('.navMeme').classList.remove('active')
  }
  if (section === 'meme') {
    renderMeme()
    elCurrNav.classList.add('active')
    document.querySelector('.navGallery').classList.remove('active')
  }
  gCurrNav = section
}
