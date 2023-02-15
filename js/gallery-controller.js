'use strict'

function renderGallery() {
  const elGallery = document.querySelector('.gallery')
  const imgs = getImgs()
  var strHTMLS = imgs.map(
    (img) =>
      (img = `
    <img onclick="onImgSelect(${img.id})"
    src="img/${img.id}.jpg" alt="" />
  `)
  )

  elGallery.innerHTML = strHTMLS.join()
  elGallery.classList.remove('hide')
  document.querySelector('.main-continer').classList.add('hide')
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
}
