'use strict'

function renderSavedMemes() {
  const memes = getSevedMemes()
  var strHTMLs
  if (memes.length === 0) {
    strHTMLs = `<p> You Don't Have Memes yet... </br> Let's creat one! </p>
          <button class="btn btn-make-meme" onclick="onMakeMeme()"> Click Me(me)!</button>`
  } else {
    var strHTMLs = `<button class="btn btn-back flex" onclick="onToggelGallery()">Back <i class="fa-solid fa-arrow-left"></i></button>`
    strHTMLs += memes
      .map(
        (meme) =>
          (meme = `
        <div>
    <img class="saved-meme-img" onclick="onImgSelect(${meme.selectedImgId})"
    src="${meme.src}" alt="" />
     <button class="btn btn-dalete-meme" onclick="deleteSevedMeme(${meme.selectedImgId})"><i class="fa-solid fa-trash-can"></i></button>
     </div>
  `)
      )
      .join('')
  }

  document.querySelector('.saved-memes-gallery').innerHTML = strHTMLs
}

function onSaveImg() {
  const memeUrl = gElCanvas.toDataURL('image/jpeg')
  updateMemeSrc(memeUrl)

  const meme = getMeme()
  saveMeme(meme)

  renderSavedMemes()
  flashMsg('Meme saved')
}

function deleteSevedMeme(memeId) {
  deleteSavedMeme(memeId)
  renderSavedMemes()
  flashMsg('Meme deleted')
}

function onToggelGallery() {
  document.querySelector('.saved-memes-gallery').classList.toggle('hide')

  document.querySelector('.main-canvas-continer').classList.toggle('hide')

  const memes = getMemes()

  if (memes.length === 0) return

  // renderSavedMemes()
}

function closeSavedGallery() {
  document.querySelector('.saved-memes-gallery').classList.add('hide')

  document.querySelector('.main-canvas-continer').classList.remove('hide')
}

// function closeModal() {
//   const modal = document.querySelector('.modal')
//   modal.classList.add('hide')
// }

// function downloadCanvas(elLink) {
//   console.log(elLink)
//   const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
//   elLink.href = imgContent
// }
