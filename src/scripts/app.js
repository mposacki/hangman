import 'babel-polyfill'
import fetch from 'unfetch'
import '../scss/main.scss'
import HangmanGame from './hangman'

let game
const stage = document.querySelector('.hangman__word')
const guesses = document.querySelector('.hangman__guesses')

const getWord = async (wordCount) => {
  const response = await fetch(`https://api.mposacki.pl/getWord?wordCount=${wordCount}`)

  if (response.status === 200) {
    const data = await response.json()
    return data.word
  } else {
    throw new Error('Unable to fetch word')
  }
}

const renderStage = () => {
  stage.textContent = game.getWord
  guesses.textContent = game.statusMsg
}

const play = async () => {
  const word = await getWord('2')
  game = new HangmanGame(word, 5)
  renderStage()
}

document.querySelector('.hangman__reset').addEventListener('click', play)

play()

window.addEventListener('keypress', (e) => {
  if (e.charCode >= 97 && e.charCode <= 122) {
    const attempt = String.fromCharCode(e.charCode)
    game.checkLetter(attempt)
    renderStage()
  }
})