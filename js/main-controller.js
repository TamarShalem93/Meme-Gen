'use strict'
var gCurrNav = 'Gallery'

function onOpenNav(elOpenNav) {
  if (elOpenNav.innerText === gCurrNav) return
  gCurrNav = elOpenNav.innerText

  elOpenNav.classList.add('active')

  //TODO remove active class
}
