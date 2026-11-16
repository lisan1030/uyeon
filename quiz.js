// =========================================
// 1. 문제 목록
//    문제를 추가하려면 { ... }, 묶음을 복사해서 붙여넣으세요.
//    answer는 정답 보기의 번호입니다. (첫 번째 보기 = 0, 두 번째 = 1 ...)
// =========================================
const questions = [
  {
    question: "훈민정음을 창제한 조선의 왕은?",
    options: ["태종", "세종", "세조", "성종"],
    answer: 1,
    explain: "세종대왕은 1443년 훈민정음을 창제하고 1446년에 반포했습니다."
  },
  {
    question: "경복궁을 처음 지은 왕은?",
    options: ["태조", "태종", "세종", "광해군"],
    answer: 0,
    explain: "경복궁은 조선을 세운 태조 이성계 때인 1395년에 지어졌습니다."
  },
  {
    question: "임진왜란 때 한산도 대첩을 승리로 이끈 장수는?",
    options: ["권율", "김시민", "이순신", "곽재우"],
    answer: 2,
    explain: "이순신 장군은 1592년 한산도 앞바다에서 학익진 전법으로 일본 수군을 크게 무찔렀습니다."
  },
  {
    question: "고구려를 세운 인물은?",
    options: ["온조", "박혁거세", "김수로", "주몽"],
    answer: 3,
    explain: "고구려는 주몽(동명성왕)이 세웠습니다. 온조는 백제, 박혁거세는 신라, 김수로는 금관가야를 세웠습니다."
  },
  {
    question: "3·1 운동이 일어난 해는?",
    options: ["1910년", "1919년", "1926년", "1945년"],
    answer: 1,
    explain: "3·1 운동은 1919년 3월 1일, 일제에 맞서 전국적으로 일어난 독립 만세 운동입니다."
  },
  {
    question: "대한민국 임시정부가 처음 세워진 도시는?",
    options: ["상하이", "충칭", "베이징", "도쿄"],
    answer: 0,
    explain: "대한민국 임시정부는 3·1 운동 직후인 1919년 4월 중국 상하이에서 수립되었습니다."
  },
  {
    question: "고려를 세운 인물은?",
    options: ["궁예", "견훤", "왕건", "이성계"],
    answer: 2,
    explain: "왕건은 918년 고려를 세우고 936년 후삼국을 통일했습니다."
  },
  {
    question: "나당 전쟁에서 승리해 삼국 통일을 완성한 신라의 왕은?",
    options: ["진흥왕", "무열왕", "법흥왕", "문무왕"],
    answer: 3,
    explain: "문무왕은 676년 당나라 군대를 몰아내고 삼국 통일을 완성했습니다."
  },
  {
    question: "다음 중 궁궐 자체가 유네스코 세계유산으로 등재된 곳은?",
    options: ["경복궁", "창덕궁", "덕수궁", "창경궁"],
    answer: 1,
    explain: "창덕궁은 자연과 조화를 이룬 궁궐 건축으로 인정받아 1997년 유네스코 세계유산에 등재되었습니다."
  },
  {
    question: "국민대학교 설립을 이끈 대한민국 임시정부 요인은?",
    options: ["김구", "안창호", "신익희", "여운형"],
    answer: 2,
    explain: "국민대학교는 1946년 해공 신익희 선생 등 임시정부 요인들이 중심이 되어 세운 대학입니다."
  }
];

// =========================================
// 2. 화면 요소 가져오기
// =========================================
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const explainEl = document.getElementById("explain");
const nextBtn = document.getElementById("next-btn");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");

// =========================================
// 3. 퀴즈 상태
// =========================================
let order = [];       // 섞인 문제 순서
let current = 0;      // 지금 몇 번째 문제인지
let score = 0;        // 맞힌 개수

document.getElementById("total-count").textContent = questions.length;

// =========================================
// 4. 기능들
// =========================================

// 화면 바꾸기
function showScreen(screen) {
  [startScreen, questionScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// 배열 섞기 (문제 순서를 매번 다르게)
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 퀴즈 시작
function startQuiz() {
  order = shuffle(questions);
  current = 0;
  score = 0;
  showScreen(questionScreen);
  showQuestion();
}

// 문제 보여주기
function showQuestion() {
  const q = order[current];

  // 진행 상황 표시
  progressText.textContent = `${current + 1} / ${order.length}`;
  progressFill.style.width = `${(current / order.length) * 100}%`;
  scoreText.textContent = `점수 ${score}`;

  // 문제 글자
  questionEl.textContent = `Q${current + 1}. ${q.question}`;

  // 이전 보기·해설 지우기
  optionsEl.innerHTML = "";
  explainEl.classList.remove("show");
  nextBtn.classList.remove("show");

  // 보기 버튼 만들기
  q.options.forEach(function (text, index) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${index + 1}. ${text}`;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });
}

// 보기 골랐을 때
function selectAnswer(selected) {
  const q = order[current];
  const buttons = optionsEl.querySelectorAll(".option");

  // 더 이상 누르지 못하게
  buttons.forEach(b => (b.disabled = true));

  // 정답은 초록색
  buttons[q.answer].classList.add("correct");

  if (selected === q.answer) {
    score++;
    explainEl.innerHTML = `<b>⭕ 정답!</b> ${q.explain}`;
    explainEl.className = "explain show right";
  } else {
    // 내가 고른 오답은 빨간색
    buttons[selected].classList.add("wrong");
    explainEl.innerHTML = `<b>❌ 아쉬워요!</b> ${q.explain}`;
    explainEl.className = "explain show miss";
  }

  scoreText.textContent = `점수 ${score}`;

  // 마지막 문제면 버튼 글자 바꾸기
  nextBtn.textContent = current === order.length - 1 ? "결과 보기" : "다음 문제";
  nextBtn.classList.add("show");
}

// 다음 문제로
function nextQuestion() {
  current++;
  if (current < order.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 결과 보여주기
function showResult() {
  progressFill.style.width = "100%";

  const total = order.length;
  const percent = (score / total) * 100;
  let emoji, title, message;

  // ▼ 점수별 등급: 기준과 문구를 자유롭게 바꾸세요
  if (percent === 100) {
    emoji = "👑"; title = "역사 박사";
    message = "만점! 우연에 오시면 세미나 발표자로 모시겠습니다.";
  } else if (percent >= 70) {
    emoji = "🏆"; title = "역사 고수";
    message = "대단해요! 역사 골든벨 우승 후보입니다.";
  } else if (percent >= 40) {
    emoji = "📚"; title = "역사 꿈나무";
    message = "좋은 출발이에요. 우연에서 함께 공부하면 금방 고수가 될 거예요!";
  } else {
    emoji = "🌱"; title = "역사 새싹";
    message = "괜찮아요! 몰라도 환영하는 곳이 바로 우연입니다.";
  }

  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-title").textContent = title;
  document.getElementById("final-score").textContent = score;
  document.getElementById("final-total").textContent = total;
  document.getElementById("result-message").textContent = message;

  showScreen(resultScreen);
}

// =========================================
// 5. 버튼 연결
// =========================================
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("retry-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);