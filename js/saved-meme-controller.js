'use strict'

function renderSavedMemes() {
  const memes = getSevedMemes()
  var strHTMLs = `<button class="btn btn-close-modal" onclick="closeModal()">X</button>`
  strHTMLs += memes
    .map(
      (meme) =>
        (meme = `
         <button class="btn btn-dalete-meme" onclick="deleteSevedMeme(${meme.selectedImgId})"><i class="fa-solid fa-trash-can"></i></button>
    <img onclick="onImgSelect(${meme.selectedImgId})"
    src="${meme.src}" alt="" />
  `)
    )
    .join('')

  document.querySelector('.saved-memes-gallery').innerHTML = strHTMLs
}

function onSaveImg() {
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

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}

// function downloadCanvas(elLink) {
//   console.log(elLink)
//   const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
//   elLink.href = imgContent
// }
