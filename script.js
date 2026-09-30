const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const threatCards = document.querySelectorAll(".threat-card");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");

const quizQuestion = document.getElementById("quiz-question");
const quizAnswers = document.getElementById("quiz-answers");
const quizFeedback = document.getElementById("quiz-feedback");
const quizProgress = document.getElementById("quiz-progress");
const bestScoreText = document.getElementById("best-score");
const nextQuestionButton = document.getElementById("next-question");
const restartQuizButton = document.getElementById("restart-quiz");

const quizPool = [
  {
    question: "Why are AI databases attractive targets for attackers?",
    answers: [
      "Because they usually contain little valuable information",
      "Because they can store large volumes of sensitive data and model-related assets",
      "Because they are always offline and easier to ignore",
      "Because they cannot be connected to APIs"
    ],
    correct: 1,
    explanation: "AI databases can hold prompts, datasets, logs, user records, and model assets, making them highly valuable."
  },
  {
    question: "What is prompt injection in a generative AI system?",
    answers: [
      "A hardware failure in the data centre",
      "A type of backup strategy for prompts",
      "An attack that inserts malicious instructions to manipulate model behaviour",
      "A way to compress training data"
    ],
    correct: 2,
    explanation: "Prompt injection tries to influence how the model behaves by adding malicious or misleading instructions."
  },
  {
    question: "Which protection method reduces the impact of stolen passwords?",
    answers: [
      "Multi-Factor Authentication",
      "Increasing prompt length",
      "Removing all system logs",
      "Turning off monitoring"
    ],
    correct: 0,
    explanation: "Multi-Factor Authentication adds another verification step, so a password alone is not enough."
  },
  {
    question: "What is a likely consequence of model theft?",
    answers: [
      "Improved trust in the organisation",
      "Loss of intellectual property and competitive advantage",
      "Automatic patching of all systems",
      "Guaranteed safer outputs"
    ],
    correct: 1,
    explanation: "A stolen model can be copied, misused, or repurposed, reducing the value of the original organisation's work."
  },
  {
    question: "Why does generative AI need extra protection compared with ordinary systems?",
    answers: [
      "It handles prompts, large datasets, and can spread failure across many users quickly",
      "It never stores information",
      "It cannot be accessed through the internet",
      "It removes the need for access control"
    ],
    correct: 0,
    explanation: "Generative AI combines sensitive inputs, unpredictable prompts, and wide public use, which raises security risk."
  },
  {
    question: "Which approach best supports recovery after ransomware?",
    answers: [
      "Keeping only one live copy of data",
      "Ignoring software updates",
      "Maintaining secure backups and a recovery plan",
      "Allowing every employee full admin access"
    ],
    correct: 2,
    explanation: "Backups and tested recovery procedures are essential for restoring services after ransomware."
  },
  {
    question: "Why is access control especially important in AI systems?",
    answers: [
      "Because all users should be able to change model settings",
      "Because it limits who can view data, manage models, or use powerful system functions",
      "Because it makes encryption unnecessary",
      "Because it removes the need for monitoring"
    ],
    correct: 1,
    explanation: "Access control reduces both accidental misuse and deliberate abuse by limiting privileges."
  },
  {
    question: "What is one major effect of a data breach on users?",
    answers: [
      "More accurate AI outputs",
      "Guaranteed refund protection",
      "Loss of privacy and reduced trust in the service",
      "Automatic recovery of stolen files"
    ],
    correct: 2,
    explanation: "Users may lose confidence in a platform if their data, prompts, or personal information are exposed."
  },
  {
    question: "Why do AI data centres need stronger protection than ordinary systems?",
    answers: [
      "Because they often support dense compute, model serving, and multiple critical AI workloads at once",
      "Because they never store valuable data",
      "Because physical security is the only thing that matters",
      "Because they are not connected to networks"
    ],
    correct: 0,
    explanation: "AI data centres combine high-value hardware, storage, orchestration systems, and critical services in one environment."
  },
  {
    question: "What is API abuse in an AI platform?",
    answers: [
      "Encrypting traffic incorrectly",
      "Using interface endpoints in excessive, stolen, or automated ways that harm the service",
      "Improving user authentication",
      "Testing a model for fairness"
    ],
    correct: 1,
    explanation: "API abuse includes excessive requests, stolen keys, and automated misuse that can disrupt or expose the system."
  },
  {
    question: "Which best practice helps defend against insider threats?",
    answers: [
      "Giving broad permanent access to all staff",
      "Avoiding all audit logs",
      "Using least-privilege access and auditing sensitive actions",
      "Storing passwords in shared documents"
    ],
    correct: 2,
    explanation: "Least-privilege access and audit trails make insider misuse harder and easier to detect."
  },
  {
    question: "What does encryption mainly help protect?",
    answers: [
      "Data at rest and data in transit",
      "Only physical building access",
      "Only social media accounts",
      "The colour theme of the website"
    ],
    correct: 0,
    explanation: "Encryption helps protect stored files and transmitted data from being easily read if intercepted or stolen."
  },
  {
    question: "What is an adversarial attack on AI?",
    answers: [
      "A scheduled software update",
      "A carefully crafted input designed to confuse a model",
      "A secure backup process",
      "An employee awareness workshop"
    ],
    correct: 1,
    explanation: "Adversarial attacks manipulate inputs so the model produces incorrect or unsafe outputs."
  },
  {
    question: "Why is monitoring important for AI security?",
    answers: [
      "It helps detect suspicious behaviour, unusual requests, and early signs of attack",
      "It guarantees that no attack can happen",
      "It replaces patching and backups",
      "It removes the need for secure APIs"
    ],
    correct: 0,
    explanation: "Monitoring helps teams notice incidents faster so they can respond before damage spreads."
  },
  {
    question: "Which statement about phishing is most accurate in an AI security context?",
    answers: [
      "It can be used to steal staff credentials and then access AI systems",
      "It only affects social media platforms",
      "It makes backups stronger",
      "It is the same as model training"
    ],
    correct: 0,
    explanation: "Phishing often targets employees so attackers can gain valid credentials to internal systems."
  },
  {
    question: "What is a good secure API practice for AI services?",
    answers: [
      "Leaving endpoints open for convenience",
      "Using authentication, rate limiting, and key rotation",
      "Disabling logs completely",
      "Allowing unlimited query volume from every client"
    ],
    correct: 1,
    explanation: "Secure APIs rely on identity checks, usage limits, and key management to reduce abuse."
  },
  {
    question: "Why can user trust matter as much as technical performance in AI services?",
    answers: [
      "Because users only care about page colours",
      "Because a secure, reliable service is more likely to be used responsibly and confidently",
      "Because trust removes all cyber risk",
      "Because trust replaces access control"
    ],
    correct: 1,
    explanation: "If users no longer trust the service, even a capable system may lose adoption and credibility."
  },
  {
    question: "What is one risk of storing prompts carelessly in a generative AI platform?",
    answers: [
      "Prompt history may reveal confidential or personal information",
      "It always makes models faster",
      "It prevents all cyber attacks",
      "It reduces the need for encryption"
    ],
    correct: 0,
    explanation: "Prompt histories may contain sensitive content and should be stored and retained carefully."
  }
];

let quizData = [];

let currentQuestionIndex = 0;
let currentScore = 0;
let answerLocked = false;
let countersStarted = false;

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function updateBestScoreText() {
  const bestScore = Number(localStorage.getItem("aiCyberBestScore")) || 0;
  bestScoreText.textContent = `Best score: ${bestScore}/${quizData.length}`;
}

function startQuiz() {
  quizData = shuffleArray(quizPool);
  currentQuestionIndex = 0;
  currentScore = 0;
  answerLocked = false;
  restartQuizButton.classList.add("hidden");
  nextQuestionButton.classList.remove("hidden");
  updateBestScoreText();
  renderQuestion();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

threatCards.forEach((card) => {
  const button = card.querySelector(".threat-toggle");
  button.addEventListener("click", () => {
    const isActive = card.classList.contains("active");
    threatCards.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".threat-toggle").setAttribute("aria-expanded", "false");
    });
    if (!isActive) {
      card.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

function renderQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  answerLocked = false;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  nextQuestionButton.disabled = true;
  quizQuestion.textContent = currentQuestion.question;
  quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  quizAnswers.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswer(button, index));
    quizAnswers.appendChild(button);
  });
}

function handleAnswer(button, selectedIndex) {
  if (answerLocked) {
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const answerButtons = quizAnswers.querySelectorAll(".answer-button");
  answerLocked = true;

  answerButtons.forEach((item, index) => {
    item.disabled = true;
    if (index === currentQuestion.correct) {
      item.classList.add("correct");
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    currentScore += 1;
    button.classList.add("correct");
    quizFeedback.textContent = `Correct. ${currentQuestion.explanation}`;
    quizFeedback.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    quizFeedback.textContent = `Not quite. ${currentQuestion.explanation}`;
    quizFeedback.classList.add("incorrect");
  }

  nextQuestionButton.disabled = false;
}

function showResults() {
  const bestScore = Number(localStorage.getItem("aiCyberBestScore")) || 0;
  const updatedBest = Math.max(bestScore, currentScore);
  const strongScoreThreshold = Math.ceil(quizData.length * 0.7);
  localStorage.setItem("aiCyberBestScore", String(updatedBest));

  quizQuestion.textContent = `Quiz complete. You scored ${currentScore} out of ${quizData.length}.`;
  quizProgress.textContent = "Quiz finished";
  bestScoreText.textContent = `Best score: ${updatedBest}/${quizData.length}`;
  quizAnswers.innerHTML = "";
  quizFeedback.textContent = currentScore >= strongScoreThreshold
    ? "Strong result. You have a solid overview of key cybersecurity risks in AI systems."
    : "Good effort. Revisiting the threats, protection, and generative AI sections will help reinforce the concepts.";
  quizFeedback.className = "quiz-feedback";
  nextQuestionButton.classList.add("hidden");
  restartQuizButton.classList.remove("hidden");
}

nextQuestionButton.addEventListener("click", () => {
  currentQuestionIndex += 1;
  if (currentQuestionIndex < quizData.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

restartQuizButton.addEventListener("click", () => {
  startQuiz();
});

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  let currentValue = 0;
  const duration = 1400;
  const increment = Math.max(1, Math.ceil(target / (duration / 16)));

  const updateCounter = () => {
    currentValue += increment;
    if (currentValue >= target) {
      counter.textContent = target;
      return;
    }
    counter.textContent = currentValue;
    requestAnimationFrame(updateCounter);
  };

  requestAnimationFrame(updateCounter);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

reveals.forEach((item) => revealObserver.observe(item));

const statsSection = document.querySelector(".stats-section");

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersStarted) {
      counters.forEach((counter) => animateCounter(counter));
      countersStarted = true;
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

startQuiz();
