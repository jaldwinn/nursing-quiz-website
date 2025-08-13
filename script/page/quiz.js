import { questions } from "../../data/quizdata.js";

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let questionNumber = 1;

function getTopicFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('topic');
}

function startQuiz() {
  const startButton = document.querySelector('.js-start-button');
  if (!startButton) return;

  startButton.addEventListener('click', () => {
    document.querySelector('.start-screen').classList.add('hidden');

    const topic = getTopicFromURL();
    const topicQuestions = questions.filter(q => q.topic === topic); // filter by topic

    sortDifficulty(topicQuestions);
    showQuestion();
  });
}

let easyDifficulty = [];
let normalDifficulty = [];
let hardDifficulty = [];

function sortDifficulty(filteredQuestions) {
  easyDifficulty = [];
  normalDifficulty = [];
  hardDifficulty = [];

  filteredQuestions.forEach((question) => {
    if (question.difficulty === 'easy') {
      easyDifficulty.push(question);
    } else if (question.difficulty === 'normal') {
      normalDifficulty.push(question);
    } else if (question.difficulty === 'hard') {
      hardDifficulty.push(question);
    }
  });

  const sortedEasyQuestions = [...easyDifficulty].sort(() => Math.random() - 0.5);
  const sortedNormalQuestions = [...normalDifficulty].sort(() => Math.random() - 0.5);
  const sortedHardQuestions = [...hardDifficulty].sort(() => Math.random() - 0.5);

  const completeEasyQuestions = sortedEasyQuestions.slice(0, 20);
  const completeNormalQuestions = sortedNormalQuestions.slice(0, 5);
  const completeHardQuestions = sortedHardQuestions.slice(0, 5);

  shuffledQuestions = [...completeEasyQuestions, ...completeNormalQuestions, ...completeHardQuestions];
  shuffledQuestions = shuffledQuestions.sort(() => Math.random() - 0.5);
}





function getFinalMessage() {
  if (rightAnswers >= 20 ) {
  document.querySelector('.js-box-container').innerHTML= 
  `<p>You have ${rightAnswers} right answers and ${wrongAnswers} wrong answers.
  You have free Iced Coffee!</p>`
  } else {
   document.querySelector('.js-box-container').innerHTML= 
  `<p>You have ${rightAnswers} right answers and ${wrongAnswers} wrong answers.
  No Iced Coffee! Try again!</p>`
  };
}
function showQuestion () {
let hasAnswered = false
document.querySelector('.js-box-container').innerHTML = '';
const question = shuffledQuestions[currentQuestionIndex];

const container = document.createElement('div')
const questionNumberElement = document.createElement('div')
const showQuestionsElement = document.createElement('div')
questionNumberElement.textContent = `Question: ${questionNumber}`
showQuestionsElement.textContent = question.question
showQuestionsElement.classList.add('question-text')
questionNumberElement.classList.add('number-page')
container.appendChild(questionNumberElement)
container.appendChild(showQuestionsElement)

const nextButtonElement = document.createElement('button')
nextButtonElement.textContent = 'Next Question'
nextButtonElement.classList.add('next-button', 'hidden')

question.answers = question.answers.sort(() => Math.random() - 0.5);
question.answers.forEach((answer, index) => {
const answerButton = document.createElement('button')
answerButton.classList.add('answer-button')
answerButton.textContent = answer.text
answerButton.dataset.index = index;
container.appendChild(answerButton)

answerButton.addEventListener('click', (event) => {
  let feedback = ''
  let explanationWrongAnswer = ''
  let rightAnswer = question.answers.find(answer => answer.correct === true)
  const index = event.target.dataset.index
  const selectedAnswer = question.answers[Number(index)]
  if (hasAnswered) return;
  hasAnswered = true;
  
  document.querySelectorAll('.answer-button').forEach((btn) => {
    btn.disabled = true;
  });

  if (!answer.correct) {
    feedback = "Wrong!"
    explanationWrongAnswer = selectedAnswer.explanation
    rightAnswer.explanation

    const feedbackElement = document.createElement('p')
    feedbackElement.textContent = feedback 
    feedbackElement.classList.add('wrong')  
    container.appendChild(feedbackElement)

    const explanationWrongAnswerElement = document.createElement('p')
    explanationWrongAnswerElement.textContent = explanationWrongAnswer;
    explanationWrongAnswerElement.classList.add('wrong');
    container.appendChild(explanationWrongAnswerElement);

    const explanationRightAnswerElement = document.createElement('p')
    explanationRightAnswerElement.textContent = rightAnswer.explanation;
    explanationRightAnswerElement.classList.add('correct');
    container.appendChild(explanationRightAnswerElement);
    wrongAnswers++

  } else {
    feedback ="True"
    rightAnswer.explanation

    const feedbackElement = document.createElement('p')
    feedbackElement.textContent = feedback 
    feedbackElement.classList.add('correct')  
    container.appendChild(feedbackElement)

    const explanationRightAnswerElement = document.createElement('p')
    explanationRightAnswerElement.textContent = rightAnswer.explanation;
    explanationRightAnswerElement.classList.add('correct');
    container.appendChild(explanationRightAnswerElement);
    rightAnswers++
  }
  questionNumber++
nextButtonElement.classList.remove('hidden')
});
});

container.appendChild(nextButtonElement)
nextButtonElement.addEventListener('click', () => {
currentQuestionIndex++;

if (currentQuestionIndex < shuffledQuestions.length) {
showQuestion();
} else {
getFinalMessage()
}

})

document.querySelector('.js-box-container').appendChild(container);
}
startQuiz()