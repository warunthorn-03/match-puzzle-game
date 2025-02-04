// ===================
// ข้อมูลคำถามทั้งหมด
// ===================
const allQuestions = [
  {
    image: "images/bridge.jpg",
    choices: ["Tree", "Bridge", "House", "Door"],
    correct: "Bridge",
  },
  {
    image: "images/butterfly.jpg",
    choices: ["Bug", "Bee", "Butterfly", "Ant"],
    correct: "Butterfly",
  },
  {
    image: "images/cave.jpg",
    choices: ["Hill", "House", "Rock", "Cave"],
    correct: "Cave",
  },
  {
    image: "images/crow.jpg",
    choices: ["Duck", "Bird", "Crow", "Owl"],
    correct: "Crow",
  },
  {
    image: "images/deer.jpg",
    choices: ["Goat", "Horse", "Deer", "Sheep"],
    correct: "Deer",
  },
  {
    image: "images/feather.jpg",
    choices: ["Cloth", "Paper", "Leaf", "Feather"],
    correct: "Feather",
  },
  {
    image: "images/hedgehog.jpg",
    choices: ["Rabbit", "Hedgehog", "Mouse", "Hamster"],
    correct: "Hedgehog",
  },
  {
    image: "images/ladybug.jpg",
    choices: ["Bug", "Spider", "Ladybug", "Ant"],
    correct: "Ladybug",
  },
  {
    image: "images/key.jpg",
    choices: ["Key", "Door", "Box", "Lock"],
    correct: "Key",
  },
  {
    image: "images/lake.jpg",
    choices: ["Waterfall", "Sea", "Water", "Lake"],
    correct: "Lake",
  },
  {
    image: "images/leaf.jpg",
    choices: ["Leaf", "Grass", "Flower", "Tree"],
    correct: "Leaf",
  },
  {
    image: "images/mushroom.jpg",
    choices: ["Food", "Mushroom", "Tree", "Plant"],
    correct: "Mushroom",
  },
  {
    image: "images/owl.jpg",
    choices: ["Duck", "Owl", "Eagle", "Bird"],
    correct: "Owl",
  },
  {
    image: "images/rabbit.jpg",
    choices: ["Dog", "Cat", "Mouse", "Rabbit"],
    correct: "Rabbit",
  },
  {
    image: "images/rainbow.jpg",
    choices: ["Cloud", "Rainbow", "Moon", "Sun"],
    correct: "Rainbow",
  },
  {
    image: "images/stone.jpg",
    choices: ["Rainbow", "Brick", "Stone", "Wall"],
    correct: "Stone",
  },
  {
    image: "images/snail.jpg",
    choices: ["Worm", "Bug", "Ant", "Snail"],
    correct: "Snail",
  },
  {
    image: "images/book.jpg",
    choices: ["Story", "Books", "Paper", "Note"],
    correct: "Books",
  },
  {
    image: "images/spiderweb.jpg",
    choices: ["Line", "Spiderweb", "Spider", "Net"],
    correct: "Spiderweb",
  },
  {
    image: "images/squirrel.jpg",
    choices: ["Mouse", "Rabbit", "Squirrel", "Hamster"],
    correct: "Squirrel",
  },
  {
    image: "images/tree.jpg",
    choices: ["Leaf", "Tree", "Plant", "Grass"],
    correct: "Tree",
  },
  {
    image: "images/vine.jpg",
    choices: ["Vine", "Leaf", "Branch", "Root"],
    correct: "Vine",
  },
  {
    image: "images/waterfall.jpg",
    choices: ["Waterfall", "River", "Lake", "Leaf"],
    correct: "Waterfall",
  },
  {
    image: "images/wolf.jpg",
    choices: ["Bear", "Wolf", "Fox", "Dog"],
    correct: "Wolf",
  },
  {
    image: "images/flower.jpg",
    choices: ["Flower", "Tree", "Grass", "River"],
    correct: "Flower",
  },
  {
    image: "images/cloud.jpg",
    choices: ["Cloud", "Rain", "Sun", "Fog"],
    correct: "Cloud",
  },
  {
    image: "images/grass.jpg",
    choices: ["Tree", "Grass", "Leaf", "Plant"],
    correct: "Grass",
  },
  {
    image: "images/star.jpg",
    choices: ["Sky", "Sun", "Star", "Moon"],
    correct: "Star",
  },
  {
    image: "images/moon.jpg",
    choices: ["Star", "Moon", "Plant", "Sun"],
    correct: "Moon",
  },
  {
    image: "images/forest.jpg",
    choices: ["Rock", "Wood", "Mountain", "Forest"],
    correct: "Forest",
  },
  {
    image: "images/mountain.jpg",
    choices: ["Tree", "Rock", "Nest", "Mountain"],
    correct: "Mountain",
  },
  {
    image: "images/wood.jpg",
    choices: ["Wood", "Tree", "Grass", "Plant"],
    correct: "Wood",
  },
  {
    image: "images/horse.jpg",
    choices: ["Cow", "Horse", "Dog", "Zebra"],
    correct: "Horse",
  },
  {
    image: "images/nest.jpg",
    choices: ["Spider", "Bird", "Nest", "Tree"],
    correct: "Nest",
  },
  {
    image: "images/foggy.jpg",
    choices: ["Cloud", "Rain", "Sun", "Fog"],
    correct: "Fog",
  },
  {
    image: "images/daisy.jpg",
    choices: ["Daisy", "Rose", "Tulip", "Sunflower"],
    correct: "Daisy",
  },
  {
    image: "images/swan.jpg",
    choices: ["Swan", "Duck", "Goose", "Bird"],
    correct: "Swan",
  },
  {
    image: "images/castle.jpg",
    choices: ["Town", "Castle", "City", "Country"],
    correct: "Castle",
  },
  {
    image: "images/fox.jpg",
    choices: ["Fox", "Wolf", "Dog", "Cat"],
    correct: "Fox",
  },
];

// ===============================
// ตัวแปรควบคุมเกมและ DOM element
// ===============================
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let startTime; // เวลาเริ่มเล่น (timestamp)
let consecutiveCorrect = 0; // ตัวนับคำตอบที่ถูกติดกัน
let ownedBonuses = []; // เก็บไอเทมที่ได้รับ

const timerElement = document.getElementById("timer");
const questionImage = document.getElementById("question-image");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const popupContainer = document.getElementById("popup-container");
const popupTitle = document.getElementById("popup-title");
const popupMessage = document.getElementById("popup-message");
const bonusContainer = document.getElementById("bonus-container");
const bonusCardsContainer = document.getElementById("bonus-cards");
const bonusItemsContainer = document.getElementById("bonus-items-container");

const baseScore = 20; // ✅ คะแนนพื้นฐานสำหรับทุกข้อ
const timeBonus = timeLeft * 2; // ✅ โบนัสเพิ่ม 2 คะแนนต่อวินาทีที่เหลือ
const totalScore = baseScore + timeBonus;

// ===============================
// เริ่มต้นเมื่อโหลดหน้าเสร็จ
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion(currentQuestionIndex);
  startTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("gameFinished") === "true") {
    console.log("🛑 เกมจบแล้ว → หยุดทุกอย่าง");
    document.getElementById("game-background").style.display = "block";
    document.querySelector(".game-container").style.display = "none";
    return;
  }
});

function startGame() {
  let selectedQuestions = getRandomQuestions(40, 5); // สุ่ม 5 ข้อ
  localStorage.setItem("savedQuestions", JSON.stringify(selectedQuestions)); // ✅ บันทึกคำถามที่เล่น
  localStorage.setItem("latestAnswers", JSON.stringify([])); // ✅ เคลียร์คำตอบก่อนเริ่มเกมใหม่
}

// ===============================
// ฟังก์ชันโหลดคำถาม
// ===============================

async function loadQuestion(index) {
  const questionObj = questions[index];
  const imgElement = document.getElementById("question-image");
  const optionsContainer = document.getElementById("options-container");
  const questionTitle = document.getElementById("question-title"); //  ตรวจสอบว่ามีการกำหนดค่าหรือไม่

  //  ซ่อนปุ่มและรูปภาพก่อนโหลด
  optionsContainer.style.visibility = "hidden";
  imgElement.style.display = "none";

  //  โหลดรูปภาพล่วงหน้าก่อนแสดงผล
  await new Promise((resolve) => {
    imgElement.src = questionObj.image;
    imgElement.onload = resolve; //  รอให้โหลดเสร็จ
  });

  //  แสดงรูปหลังโหลดเสร็จ
  imgElement.style.display = "block";

  questionTitle.textContent = "Match It Up!!";
  questionImage.src = questionObj.image;

  optionsContainer.innerHTML = "";

  questionObj.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = choice;
    btn.addEventListener("click", () => checkAnswer(choice));
    optionsContainer.appendChild(btn);
  });

  //  แสดงปุ่มหลังจากรูปโหลดเสร็จ
  optionsContainer.style.visibility = "visible";

  //  บันทึกคำตอบหลังจากปุ่มถูกโหลดเสร็จ
  saveRoundAnswers();

  document.getElementById("score").textContent = `✔ ${score}`;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
  });
}

// // ดึง 5 คำถามแบบสุ่ม
// let questions = getRandomQuestions(allQuestions.length, 5);
// console.log("คำถามที่ถูกสุ่ม:", questions); // ตรวจสอบว่าได้คำถามมาแล้ว

function getRandomQuestions(total, numToPick) {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()); // สุ่มลำดับ
  return shuffled.slice(0, numToPick); // เลือก 5 ข้อแรกจากที่สุ่มแล้ว
}

const bonusItems = [
  { type: "x2", label: "x2 Score", icon: "×2" },
  { type: "cut", label: "Cut Choices", icon: "✂" },
  { type: "time", label: "+10s", icon: "⏳" },
];

let selectedBonus = null;

// ดึง 5 คำถามแบบสุ่ม
let questions = getRandomQuestions(40, 5);

//  เก็บคำตอบของรอบล่าสุด
let currentRoundAnswers = [
  ...questions.map((q) => ({
    image: q.image,
    correctAnswer: q.correct,
    userAnswer: null, //  ตั้งค่าเริ่มต้นว่าไม่ได้ตอบ
    timeout: true, //  ตั้งค่าเริ่มต้นว่าหมดเวลา
  })),
];

function checkAnswer(userAnswer) {
  buttonClickSound.play(); // 🔊 เล่นเสียงเมื่อกดปุ่ม

  clearInterval(timerInterval); //  หยุด Timer เมื่อเลือกคำตอบ

  const questionObj = questions[currentQuestionIndex];
  const correctAnswer = questionObj.correct;
  const allButtons = document.querySelectorAll(".option");

  allButtons.forEach((btn) => {
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn.textContent === userAnswer && userAnswer !== correctAnswer) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  //  อัปเดตคำตอบใน `currentRoundAnswers`
  const answerIndex = currentRoundAnswers.findIndex(
    (q) => q.image === questionObj.image
  );
  if (answerIndex !== -1) {
    currentRoundAnswers[answerIndex].userAnswer = userAnswer;
    currentRoundAnswers[answerIndex].timeout = false;
  }

  //  บันทึก `latestAnswers` ใหม่ลง `localStorage`
  localStorage.setItem("latestAnswers", JSON.stringify(currentRoundAnswers));

  //  ตรวจสอบว่าตอบถูกหรือไม่
  if (userAnswer === correctAnswer) {
    //  ใช้สูตรคะแนนที่กำหนด
    const baseScore = 20; // คะแนนพื้นฐาน
    const timeBonus = timeLeft * 2; // คะแนนโบนัสตามเวลาที่เหลือ
    const totalScore = baseScore + timeBonus; // คะแนนรวมของข้อนี้
    score += totalScore; // เพิ่มคะแนนสะสมของผู้เล่น

    document.getElementById("score").textContent = `✔ ${score}`;

    consecutiveCorrect++; //  นับจำนวนที่ตอบถูกติดกัน

    // ตรวจสอบว่าเป็นข้อสุดท้ายของเกมหรือไม่
    // const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (consecutiveCorrect === 3) {
      consecutiveCorrect = 0;

      //  ถ้าตอบถูก 3 ข้อ และเป็นข้อสุดท้าย → แสดง `Bonus Time` แบบพิเศษ
      if (isLastQuestion()) {
        setTimeout(() => {
          showBonusTime(true, () => {
            setTimeout(endGame, 1000); //  จบเกมหลังจากรับโบนัส
          });
        }, 1000);
      } else {
        setTimeout(() => showBonusTime(false, goNext), 1000); //  แสดง Bonus Time ปกติ
      }
      return;
    }

    playSound("correct"); // ✅ เล่นเสียง Good job!
    showPopup("🎉 GOOD JOB! 🎉", `You got it right!`, goNext);
  } else {
    consecutiveCorrect = 0; //  รีเซ็ตตัวนับหากตอบผิด
    playSound("wrong"); // ❌ เล่นเสียง That’s a good try!
    showPopup(
      "😔 THAT'S A GOOD TRY! 😔",
      `The correct answer is "<span class='highlight'>${correctAnswer}</span>".`,
      goNext
    );
  }
}

function isLastQuestion() {
  return currentQuestionIndex === questions.length - 1;
}

function getScoreMultiplier() {
  let multiplier = 1;
  if (ownedBonuses.some((bonus) => bonus.type === "x2")) {
    multiplier *= 2;
    ownedBonuses = ownedBonuses.filter((bonus) => bonus.type !== "x2"); // ✅ ลบไอเทมที่ใช้แล้ว
  }
  return multiplier;
}

function handleTimeout() {
  console.log(" หมดเวลา! กำลังบันทึกข้อมูล...");

  const questionObj = questions[currentQuestionIndex];

  //  ค้นหาคำถามปัจจุบันใน `currentRoundAnswers`
  const answerIndex = currentRoundAnswers.findIndex(
    (q) => q.image === questionObj.image
  );

  if (answerIndex !== -1) {
    //  ตั้งค่าว่าหมดเวลา และยังไม่ได้ตอบ
    currentRoundAnswers[answerIndex].userAnswer = null;
    currentRoundAnswers[answerIndex].timeout = true;
  }

  //  บันทึกลง `localStorage` เพื่อใช้ในหน้าคำตอบ
  localStorage.setItem("latestAnswers", JSON.stringify(currentRoundAnswers));
  console.log("📌 บันทึกคำตอบล่าสุด:", currentRoundAnswers);

  // ✅ 4️⃣ ให้คะแนนเป็น 0 เพราะหมดเวลา
  const totalScore = 0; // ❌ หมดเวลา = 0 คะแนน
  score += totalScore;
  document.getElementById("score").textContent = `✔ ${score}`;

  //  แสดง Popup "Time's Out"
  playSound("timeout"); // 🔊 เล่นเสียง Time’s up!
  showPopup(
    "⏳ TIME'S UP! ⏳",
    `The correct answer is "<span class='highlight'>${questionObj.correct}</span>".`,
    () => {
      if (!isLastQuestion()) {
        goNext();
      } else {
        endGame();
      }
    }
  );
}

function saveRoundAnswers() {
  console.log("บันทึกคำตอบลง localStorage:", currentRoundAnswers);
  localStorage.setItem("latestAnswers", JSON.stringify(currentRoundAnswers));
}

function showBonusTime(isFinalBonus = false, callback = null) {
  console.log(`Bonus Time ถูกเรียกใช้! (isFinalBonus = ${isFinalBonus})`);
  bonusCardsContainer.innerHTML = ""; // ล้างการ์ดเก่าก่อน
  selectedBonus = null;

  //  เล่นเสียง Bonus Time
  playBonusSound();

  //  กำหนดโบนัสสำหรับข้อสุดท้าย
  const finalBonuses = [
    { type: "superX2", label: "🔥 x2 Score", icon: "×2" },
    { type: "super200", label: "💰 +200 Points", icon: "+200" },
    { type: "super450", label: "💰 +450 Points", icon: "+450" },
  ];

  //  กำหนดโบนัสสำหรับรอบปกติ
  const normalBonuses = [
    { type: "x2", label: "⭐ x2 Score", icon: "×2" },
    { type: "cut", label: "✂ Cut Choices", icon: "✂" },
    { type: "time", label: "⏳ +10s", icon: "⏳" },
  ];

  // ✅ สุ่มเลือก 3 โบนัสจากรายการที่กำหนด
  const availableBonuses = isFinalBonus ? finalBonuses : normalBonuses;
  const shuffledBonuses = shuffleArray([...availableBonuses]).slice(0, 3); // ✅ สุ่มแล้วเลือก 3 อัน

  // ✅ สร้างการ์ดโบนัสจากที่สุ่มได้
  shuffledBonuses.forEach((bonus) => {
    const card = document.createElement("div");
    card.classList.add("bonus-card");

    const hiddenIcon = document.createElement("span");
    hiddenIcon.classList.add("hidden-icon");
    hiddenIcon.textContent = bonus.icon;
    card.appendChild(hiddenIcon);

    card.addEventListener("click", () => {
      if (selectedBonus) return; // ป้องกันการเลือกหลายครั้ง
      selectedBonus = bonus;
      card.classList.add("flipped");

      bonusClickSound.play(); // 🔊 เล่นเสียงคลิก
      setTimeout(() => {
        bonusContainer.style.display = "none";
        applyBonus(selectedBonus.type);

        //  ถ้ามี callback ให้เรียกต่อ
        if (callback) callback();
      }, 1500);
    });

    bonusCardsContainer.appendChild(card);
  });

  bonusContainer.style.display = "flex";
}

// random item card
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ✅ สลับตำแหน่ง
  }
  return array;
}

function applyBonus(bonusType) {
  console.log(`🎯 ใช้โบนัส: ${bonusType}`);

  if (bonusType === "x2" || bonusType === "superX2") {
    score *= 2;
  } else if (bonusType === "cut" || bonusType === "time") {
    ownedBonuses.push(bonusType); // ✅ เก็บไอเทมที่ได้รับ
    updateBonusItemsDisplay(); // ✅ อัปเดต UI ให้แสดงไอเทม
    return; // ❗ ไม่ต้องอัปเดตคะแนนทันที รอให้ใช้ไอเทม
  } else if (bonusType === "super200") {
    score += 200;
  } else if (bonusType === "super450") {
    score += 450;
  }

  document.getElementById("score").textContent = `✔ ${score}`;
}

function showFinalBonus() {
  console.log("🔥 แจกโบนัสพิเศษข้อสุดท้าย!");

  // ✅ เพิ่มคะแนนพิเศษ
  score += 450 + 200;
  score *= 2; // ✅ คูณ 2

  document.getElementById("score").textContent = `✔ ${score}`;

  // ✅ แสดงข้อความโบนัสพิเศษ
  showPopup("🎉 BONUS TIME!!! 🎉", "x2 Score + 450 + 200!", endGame);
}

function removeTwoWrongChoices() {
  const allButtons = document.querySelectorAll(".option");

  // 🔹 หาคำตอบที่ถูกต้องจากคำถามปัจจุบัน
  const correctAnswer = questions[currentQuestionIndex].correct;

  // 🔹 คัดกรองปุ่มที่เป็นตัวเลือกผิด
  const wrongChoices = Array.from(allButtons).filter(
    (btn) => btn.textContent !== correctAnswer
  );

  if (wrongChoices.length > 2) {
    // 🔹 สุ่มตัวเลือกผิด 2 ตัว และซ่อน
    shuffleArray(wrongChoices)
      .slice(0, 2)
      .forEach((btn) => (btn.style.display = "none"));
  }
}

// เพิ่มเวลา
function addExtraTime() {
  timeLeft += 5;
  updateTimerDisplay();
}

function startTimer() {
  clearInterval(timerInterval); //  รีเซ็ต Timer ก่อนเริ่มใหม่
  timeLeft = 15; //  ตั้งค่าเริ่มต้นทุกข้อให้มี 15 วินาที
  document.getElementById("timer").textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    //  หยุด Timer ทันทีถ้า Game Complete Popup เปิดอยู่
    if (
      document.getElementById("game-complete-popup").style.display === "flex"
    ) {
      console.log("🛑 Timer หยุดทันที เพราะ Game Complete เปิดอยู่");
      clearInterval(timerInterval);
      return;
    }

    timeLeft--;
    document.getElementById("timer").textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateBonusItemsDisplay() {
  bonusItemsContainer.innerHTML = ""; // ล้างของเก่าก่อน

  ownedBonuses.forEach((bonus, index) => {
    const item = document.createElement("button");
    item.classList.add("bonus-item");
    item.textContent = bonus === "cut" ? "✂ Cut" : "⏳ +10s";

    // เมื่อคลิกไอเทม ให้ใช้งานและลบออกจาก inventory
    item.addEventListener("click", () => {
      applyStoredBonus(bonus); // ✅ ใช้ไอเทม
      ownedBonuses.splice(index, 1); // ลบไอเทมที่ใช้แล้ว
      updateBonusItemsDisplay(); // อัปเดต UI
    });

    bonusItemsContainer.appendChild(item);
  });
}

function applyStoredBonus(bonusType) {
  bonusUseSound.play(); // เล่นเสียงเมื่อใช้โบนัส

  if (bonusType === "cut") {
    removeTwoWrongChoices();
  } else if (bonusType === "time") {
    timeLeft += 10;
    document.getElementById("timer").textContent = formatTime(timeLeft);
  }
}

// ===============================
// ฟังก์ชันสำหรับ popup
// ===============================

function showPopup(titleText, messageText, callback) {
  popupTitle.textContent = titleText;
  popupMessage.innerHTML = `${messageText} <br><br> <strong>Score: ${score}</strong>`; // ✅ เพิ่มคะแนนใน popup

  popupContainer.style.display = "flex";

  // ลดเสียง Background Music ชั่วคราว
  backgroundMusic.volume = 0.3;

  // ปิด popup อัตโนมัติ แล้วไปทำ callback ต่อ
  setTimeout(() => {
    popupContainer.style.display = "none";

    // คืนเสียง Background Music เป็นปกติ
    backgroundMusic.volume = 0.5;

    if (callback) callback();
  }, 2500); //  เพิ่มเวลาให้อ่านง่ายขึ้น (2.5 วินาที)
}

// ===============================
// ฟังก์ชันไปข้อถัดไป
// ===============================

function goNext() {
  if (isLastQuestion()) {
    endGame();
  } else {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
    updateBonusItemsDisplay();
    startTimer();
  }
}

// ===============================
// ฟังก์ชันจบเกม (เมื่อหมดข้อ)
// ===============================

function endGame() {
  console.log("🏁 Game Over! Saving Score...");

  let playerName = localStorage.getItem("playerName") || "Guest";
  let totalScore = parseInt(localStorage.getItem(`score_${playerName}`) || "0");

  totalScore += score;  // Add new game score

  localStorage.setItem(`score_${playerName}`, totalScore); // Save player-specific score
  localStorage.setItem("totalScore", totalScore); // Update totalScore for display
  localStorage.setItem("finalScore", score);

  if (typeof updateProfileScore === "function") {
    updateProfileScore(score); // ตรวจสอบก่อนเรียกใช้
} else {
    console.error("❌ updateProfileScore is not defined!");
}

  console.log(`✅ Updated Score for ${playerName}: ${totalScore}`);
  document.getElementById("final-score").textContent = score;
  document.getElementById("game-complete-popup").style.display = "flex";
}

function updateProfileScore() {
  let playerName = localStorage.getItem("playerName") || "Guest";
  let matchScore = parseInt(localStorage.getItem(`score_${playerName}_match`) || 0);
  let puzzleScore = parseInt(localStorage.getItem(`score_${playerName}_puzzle`) || 0);
  let totalScore = matchScore + puzzleScore;

  localStorage.setItem("totalScore", totalScore);
  let playerScoreElement = document.getElementById("playerScore");
  if (playerScoreElement) {
      playerScoreElement.innerText = `${totalScore} POINT`;
  }
}
document.addEventListener("DOMContentLoaded", updateProfileScore);

function saveMatchScore(finalScore) {
  let playerName = localStorage.getItem("playerName") || "Guest";
  let currentMatchScore = parseInt(localStorage.getItem(`score_${playerName}_match`) || 0);
  let newMatchScore = currentMatchScore + finalScore;

  localStorage.setItem(`score_${playerName}_match`, newMatchScore);
  updateProfileScore(); // ✅ อัปเดตคะแนนรวม
}




// ฟังก์ชันฟอร์แมตเวลา
function formatTime(seconds) {
  return `00:${seconds < 10 ? "0" + seconds : seconds}`;
}

function showGameCompletePopup() {
  document.getElementById("final-score").textContent = score;
  document.getElementById("game-complete-popup").style.display = "flex";
}

document.getElementById("show-answers-btn").addEventListener("click", () => {
  window.location.href = "answers_Match.html";
});

document.getElementById("play-again-btn").addEventListener("click", () => {
  console.log("🔄 รีเซ็ตเกมและกลับไปเริ่มใหม่...");

  //  ล้างค่าใน localStorage เพื่อป้องกัน popup เด้งซ้ำ
  localStorage.removeItem("gameFinished");
  localStorage.removeItem("finalScore");

  //  ลบเฉลยเก่าต่อเมื่อเริ่มเกมใหม่ (ไม่ใช่ตอนกด Back)
  localStorage.removeItem("savedAnswers");

  //  ซ่อน Game Complete Popup และให้แน่ใจว่าหายไปจริง
  const gameCompletePopup = document.getElementById("game-complete-popup");
  gameCompletePopup.style.display = "none";

  //  ซ่อนพื้นหลังของเกม complete และแสดงเกมใหม่
  document.getElementById("game-complete-popup").style.display = "none";
  document.getElementById("game-background").style.display = "none";
  document.querySelector(".game-container").style.display = "block";

  //  รีเซ็ตตัวแปรเกม
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 15;
  ownedBonuses = [];

  //  รีเซ็ต UI
  document.getElementById("score").textContent = "✔ 0";
  document.getElementById("timer").textContent = "00:15";

  //  **ใช้ค่าคำตอบใหม่สำหรับเกมใหม่ แต่ไม่ลบคำตอบเก่า**
  questions = getRandomQuestions(40, 5);
  currentRoundAnswers = questions.map((q) => ({
    image: q.image,
    correctAnswer: q.correct,
    userAnswer: null,
    timeout: true,
  }));

  //  โหลดคำถามใหม่
  loadQuestion(currentQuestionIndex);
  startTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  const gameCompletePopup = document.getElementById("game-complete-popup");

  //  ถ้าค่าใน localStorage บอกว่าเกมจบแล้ว แสดงหน้า Game Complete
  if (localStorage.getItem("gameFinished") === "true") {
    console.log("🔹 กลับมาจากหน้า Answers → แสดง Game Complete");
    document.getElementById("final-score").textContent =
      localStorage.getItem("finalScore") || "0";
    gameCompletePopup.style.display = "flex";
  } else {
    //  ถ้าไม่มีค่า gameFinished → ให้เริ่มเกมปกติ
    console.log("🎮 เริ่มเกมใหม่...");
    gameCompletePopup.style.display = "none"; //  ป้องกัน popup โผล่ขึ้นมาเอง
    document.getElementById("game-background").style.display = "none";
    document.querySelector(".game-container").style.display = "block";

    questions = getRandomQuestions(40, 5);
    currentRoundAnswers = questions.map((q) => ({
      image: q.image,
      correctAnswer: q.correct,
      userAnswer: null,
      timeout: true,
    }));

    loadQuestion(currentQuestionIndex);
    startTimer();
  }
});

function exitGame() {
  console.log("🚪 กำลังออกจากเกม... กลับไปที่หน้าเริ่มต้น");

  stopBackgroundMusic(); // หยุดเพลง

  //  ล้างค่าใน localStorage เพื่อลบสถานะของเกมก่อนกลับไปหน้าเริ่มต้น
  localStorage.removeItem("gameFinished");
  localStorage.removeItem("finalScore");
  localStorage.removeItem("savedAnswers"); // ✅ ล้างเฉลยเก่า
  localStorage.removeItem("latestAnswers");

  //  เปลี่ยนหน้าไป `start.html`
  window.location.href = "start.html"; // ✅ กลับไปหน้าเริ่มเกม
}

// เล่น Background Music เมื่อกดปุ่ม PLAY AGAIN
document.getElementById("play-again-btn").addEventListener("click", () => {
  console.log("🔄 เริ่มเกมใหม่ และเล่น Background Music");
  playBackgroundMusic();
});

//  ผูกฟังก์ชัน `exitGame()` กับปุ่ม `EXIT`
// document.getElementById("exit-btn").addEventListener("click", exitGame);

document.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exit-btn");

  if (exitButton) {
    exitButton.addEventListener("click", () => {
      console.log("🔄 กลับไปหน้า Start..."); // ตรวจสอบใน Console
      window.location.href = "start_Match.html"; // กลับไปหน้า Start
    });
  } else {
    console.error("❌ ปุ่ม Exit ไม่ถูกพบใน DOM!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = `✔ ${score}`;
  } else {
    console.error("❌ ไม่พบองค์ประกอบ score ใน DOM!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer-container");
  const scoreElement = document.getElementById("score-container");
  const questionTitle = document.getElementById("question-title");

  if (timerElement) timerElement.style.display = "block";
  if (scoreElement) scoreElement.textContent = `✔ ${score}`;
  if (questionTitle) questionTitle.textContent = "Match It Up!!";
});

function goToSelectGame() {
  console.log("🔄 กำลังกลับไปหน้าเลือกเกม...");
  window.location.href = "selectGame.html";
}

// ✅ ตรวจสอบว่าฟังก์ชันสามารถเรียกใช้ได้
window.goToSelectGame = goToSelectGame;

// โหลดเสียงเมื่อเริ่มต้น
const correctSound = new Audio("sounds/good-Job.mp3");
const wrongSound = new Audio("sounds/good-try.mp3");
const timeoutSound = new Audio("sounds/times-up.mp3");
const backgroundMusic = new Audio("sounds/music.mp3");
const bonusSound = new Audio("sounds/bonus-time.mp3");
const bonusClickSound = new Audio("sounds/click.mp3"); // เสียงเมื่อคลิกการ์ดโบนัส
const bonusUseSound = new Audio("sounds/click.mp3"); // โหลดเสียงใช้โบนัส

const buttonClickSound = new Audio("sounds/click.mp3"); // เสียงกดปุ่ม
buttonClickSound.volume = 0.5; // 🔊 ปรับระดับเสียงให้พอดี

// ตั้งค่า Background Music ให้เล่นวนซ้ำ (Loop)
backgroundMusic.loop = true;
backgroundMusic.volume = 0.8; // ปรับระดับเสียงพื้นฐาน
backgroundMusic.play(); // เล่นอัตโนมัติเมื่อโหลดเกม

// ฟังก์ชันเล่นเสียงเมื่อเลือกคำตอบ
function playSound(result) {
  if (result === "correct") {
    correctSound.play();
  } else if (result === "wrong") {
    wrongSound.play();
  } else if (result === "timeout") {
    timeoutSound.play();
  }
}

// ฟังก์ชันเล่นเสียง Background Music
function playBackgroundMusic() {
  backgroundMusic.play();
}

// ฟังก์ชันหยุด Background Music
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0; // รีเซ็ตเพลงกลับไปเริ่มต้น
}

// ฟังก์ชันเล่นเสียง Bonus Time
function playBonusSound() {
  bonusSound.play();
}

function playButtonClickSound() {
  buttonClickSound.currentTime = 0; // รีเซ็ตเวลาให้เล่นจากต้น
  playButtonClickSound(); // 🔊 เล่นเสียงเมื่อกดปุ่ม
}

function updateScore(newScore) {
  let totalScore = parseInt(localStorage.getItem("totalScore") || 0);
  totalScore += newScore;
  localStorage.setItem("totalScore", totalScore);
  document.getElementById("playerScore").innerText = totalScore + " POINT";
}

function updateTotalScore(newScore) {
  let totalScore = parseInt(localStorage.getItem("totalScore")) || 0;
  totalScore += newScore;
  localStorage.setItem("totalScore", totalScore);
}

function saveScore(finalScore) {
    let playerName = localStorage.getItem("playerName");
    let currentScore = parseInt(localStorage.getItem(`score_${playerName}`) || 0);
    let newScore = currentScore + finalScore;

    localStorage.setItem(`score_${playerName}`, newScore);
    document.getElementById("playerScore").innerText = `${newScore} POINT`; // อัปเดต UI
}

document.addEventListener("DOMContentLoaded", () => {
  let playerName = localStorage.getItem("playerName") || "Guest";
  let totalScore = parseInt(localStorage.getItem(`score_${playerName}`) || "0");

  document.getElementById("playerName").textContent = playerName;
  document.getElementById("playerScore").textContent = `${totalScore} POINT`;
});



