export default class HangmanGame {
    constructor(word, chances) {
        this.chances = chances
        this.word = word.toLowerCase().split('')
        this.checkedLetters = []
        this.status = 'play'
    }

    get statusMsg() {
        if (this.status === 'play') {
            return `Chances left: ${this.chances}`
        } else if (this.status === 'failed') {
            return `Failed! The word was "${this.word.join('')}".`
        } else {
            return 'Win!'
        }
    }

    get getWord() {
        let word = ''

        this.word.forEach((letter) => {
            if (this.checkedLetters.includes(letter) || letter === ' ') {
                word += letter
            } else {
                word += '*'
            }
        })

        return word
    }

    setStatus() {
        const finish = this.word.every((letter) => this.checkedLetters.includes(letter) || letter === ' ')

        if (this.chances === 0) {
            this.status = 'failed'
        } else if (finish) {
            this.status = 'finish'
        } else {
            this.status = 'play'
        }
    }

    checkLetter(guess) {
        guess = guess.toLowerCase()
        const uniqeLetter = this.checkedLetters.includes(guess)
        if (this.status !== 'play') {
            return
        }

        if (!uniqeLetter) {
            this.checkedLetters.push(guess)
        }

        if (!uniqeLetter && !this.word.includes(guess)) {
            this.chances--
        }

        this.setStatus()
    }
}