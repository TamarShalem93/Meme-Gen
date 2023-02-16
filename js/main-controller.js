'use strict'
var gCurrNav

function init() {
  createImgs()
  renderGallery()
}

function onOpenSection(section, elCurrNav) {
  if (gCurrNav === section) return
  if (section === 'gallery') {
    renderGallery()
    elCurrNav.classList.add('active')
    document.querySelector('.nav-meme').classList.remove('active')
  }
  if (section === 'meme') {
    renderMeme()
    elCurrNav.classList.add('active')
    document.querySelector('.nav-gallery').classList.remove('active')
  }
  gCurrNav = section
}

function openModal() {
  const modal = document.querySelector('.modal')
  modal.classList.remove('hide')
  const memes = getMemes()

  if (memes.length === 0) return

  renderSavedMemes()
}

function closeModal() {
  const modal = document.querySelector('.modal')
  modal.classList.add('hide')
}
