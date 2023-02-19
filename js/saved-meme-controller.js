'use strict'
const _gElGallery = document.querySelector('.saved-memes-gallery')

function renderSavedMemes() {
  const memes = getSevedMemes()

  var strHTMLs
  if (memes.length === 0) {
    renderEmptyGallery()
    return
  }
  var strHTMLs = `<button class="btn btn-back flex" onclick="closeSavedGallery()"><i class="fa-solid fa-arrow-left"></i> Back </button>`
  strHTMLs += memes
    .map(
      (meme) =>
        (meme = `
        <div>
    <img class="saved-meme-img" onclick="onSelectSaveImg('${meme.id}')"
    src="${meme.src}" alt="" />
     <button class="btn btn-dalete-meme" onclick="deleteSevedMeme('${meme.id}')"><i class="fa-solid fa-trash-can"></i></button>
     </div>
  `)
    )
    .join('')

  _gElGallery.innerHTML = strHTMLs
  _gElGallery.classList.add('gallery-layout')
}

function renderEmptyGallery() {
  _gElGallery.classList.remove('gallery-layout')
  _gElGallery.innerHTML = `<p> You Don't Have Memes yet... </br> Let's creat one! </p>
          <button class="btn btn-make-meme" onclick="onMakeMeme()"> Click Me(me)!</button>`
}

function onSelectSaveImg(id) {
  const meme = getSavedMeme(id)
  renderMeme(meme)
  // setImg(imgId)

  // setSaveMeme(imgId)

  // renderMeme()
  // closeSavedGallery()
}

function onSaveImg() {
  const memeUrl = gElCanvas.toDataURL('image/jpeg')
  updateMemeSrc(memeUrl)

  setTimeout(() => {
    const meme = getMeme()
    setSaveMemeId(meme)
    saveMeme(meme)
    renderSavedMemes()
    flashMsg('Meme saved')
  }, 200)
}

function deleteSevedMeme(memeId) {
  deleteSavedMeme(memeId)
  renderSavedMemes()
  flashMsg('Meme deleted')
}

function onOpenGallery() {
  document.querySelector('.saved-memes-gallery').classList.remove('hide')
  document.querySelector('.main-canvas-continer').classList.add('hide')

  const memes = getMemes()

  if (memes.length === 0) return

  renderSavedMemes()
}

function closeSavedGallery() {
  document.querySelector('.saved-memes-gallery').classList.add('hide')

  document.querySelector('.main-canvas-continer').classList.remove('hide')
  const elCurrNav = document.querySelector('.nav-meme')
  onOpenSection(elCurrNav)
}
