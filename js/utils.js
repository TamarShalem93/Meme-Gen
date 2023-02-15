'use strict'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  console.log('#' + randomColor)
  return '#' + randomColor
}
