
const topicButtons = document.querySelectorAll('.js-quiz-button');

topicButtons.forEach(button => {
  button.addEventListener('click', () => {
    const topic = button.dataset.topic;
    window.location.href = `/index/page/quiz.html?topic=${topic}`;
  });
});


const registerButton = document.querySelector('.js-register-button')
registerButton.addEventListener('click', () => {
  window.location.href = '/index/register/register.html';
});

const navLinks = document.querySelectorAll('.middle-section a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

