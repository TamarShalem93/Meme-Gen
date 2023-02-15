'use strict'
var gCurrNav

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
