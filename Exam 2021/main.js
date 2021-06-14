const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Hvilke typer cykler står Maravelo for?',
    answers: [
      { text: 'flotte E-Bikes med italiensk design og et godt strejf af dansk robust-og enkelthed.', correct: true },
      { text: 'Marveløse heste.', correct: false }
    ]
  },
  {
    question: 'Hvad er dyrere end vores løsningspakke til studerende?',
    answers: [
      { text: 'Et togkort, som tager en evighed, at nå frem med', correct: true },
      { text: 'en pakke tyggegumi', correct: false },
      { text: 'Kantinen på CPH Business', correct: false },
      { text: 'Din lokale købmand', correct: false }
    ]
  },
  {
    question: 'Hvorfor vælge en E-bike fra Maravelo?',
    answers: [
      { text: 'Pænt og mere moderigtigt design end offentlig transport', correct: true },
      { text: 'Fleksibilitet i hverdagen; nå frem til din destination, som du har planlagt', correct: true },
      { text: 'forældet design og teknologi', correct: false },
      { text: 'SU-venlige betalingsløsninger', correct: true }
      
    ]
  },
  {
    question: 'Hvor er Maravelo baseret?',
    answers: [
      { text: 'Gentofte', correct: false },
      { text: 'Humlebæk', correct: true }
    ]
  }
]