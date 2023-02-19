'use strict'

function init() {
  createImgs()
  renderGallery()
}

function onOpenSection(elCurrNav) {
  document.querySelector('.active')?.classList.remove('active')
  elCurrNav.classList.add('active')
  if (elCurrNav.dataset.section === 'gallery') renderGallery()
  if (elCurrNav.dataset.section === 'meme') renderMeme()
}

function onLogo() {
  const elCurrNav = document.querySelector('.nav-gallery')
  onOpenSection(elCurrNav)
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}
