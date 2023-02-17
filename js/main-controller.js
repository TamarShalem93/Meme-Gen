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

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}
