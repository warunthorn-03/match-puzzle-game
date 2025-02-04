document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script Loaded");

    
const sounds = {
    click: new Audio("sounds/click.mp3"),
    drag: new Audio("sounds/drag.mp3"),
    gameOver: new Audio("sounds/gameOver.mp3"),
    goodJob: new Audio("sounds/good-job.mp3"),
    goodTry: new Audio("sounds/good-try.mp3"),
    music: new Audio("sounds/music.mp3"),
    success: new Audio("sounds/success.mp3"),
    timesUp: new Audio("sounds/times-up.mp3")
};

// ตั้งค่าให้เพลงเล่นซ้ำ
sounds.music.loop = true;
console.log("✅ Puzzle Quest Script Loaded");
    
let playerName = localStorage.getItem("playerName") || "Guest";
let puzzleScore = parseInt(localStorage.getItem(`score_${playerName}_puzzle`) || "0");
let matchScore = parseInt(localStorage.getItem(`score_${playerName}_match`) || "0");
let totalScore = puzzleScore + matchScore;

document.getElementById("playerName").textContent = playerName;
document.getElementById("playerScore").textContent = `${totalScore} POINT`;

function updatePuzzleScore(newScore) {
    let playerName = localStorage.getItem("playerName") || "Guest";
    let puzzleScore = parseInt(localStorage.getItem(`score_${playerName}_puzzle`) || 0);
    puzzleScore += newScore;

    localStorage.setItem(`score_${playerName}_puzzle`, puzzleScore);
    updateProfileScore(); // ✅ ทำให้คะแนนรวมอัปเดตหลังจากเล่นจบ
}


function updateTotalScore() {
    totalScore = puzzleScore + matchScore;
    localStorage.setItem("totalScore", totalScore);
    document.getElementById("playerScore").textContent = `${totalScore} POINT`;
}

window.updatePuzzleScore = updatePuzzleScore;

function dragStart(event) {
    sounds.drag.play();
}

    // 📌 ดึงค่าผู้เล่นจาก localStorage
    document.getElementById("playerName").innerText = localStorage.getItem("playerName") || "Player";
    document.getElementById("playerScore").innerText = (localStorage.getItem("score") || 0) + " POINT";

    // 📌 ตรวจสอบค่าธีม
    let theme = localStorage.getItem("theme");
    if (!theme || theme.includes("selectTheme")) {
        console.error("❌ Invalid theme value found in localStorage:", theme);
        theme = "forest"; // กำหนดค่าเริ่มต้นใหม่
        localStorage.setItem("theme", theme);
    }
    
    console.log("✅ Loaded Theme:", theme);

    // 📌 ตรวจสอบขนาดตาราง (Grid Size)
    let gridSize = parseInt(localStorage.getItem("gridSize")) || 3;
    document.documentElement.style.setProperty('--grid-size', gridSize);

    let puzzleBoard = document.getElementById("puzzle-board");

    if (puzzleBoard) {
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    }

    console.log("Grid Size from LocalStorage:", gridSize);
console.log("Puzzle Board Element:", puzzleBoard);

    // 📌 สุ่มเลือกภาพ
    let randomImageIndex = Math.floor(Math.random() * 20) + 1;
    let imagePath = `imagesPuzzle/${theme}/${theme}${randomImageIndex}.jpg`;
   // ✅ เซ็ตค่าภาพให้ถูกต้องใน LocalStorage
localStorage.setItem("randomImagePath", imagePath);

console.log("✅ Selected Image Path:", imagePath);

    let previewImage = document.getElementById("preview-image");
    if (previewImage) {
        previewImage.src = imagePath;
    }

    let gameStarted = false;
    let timeLeft, timer;

    // 📌 ตรวจสอบว่าผู้เล่นอยู่หน้าไหน
    let currentPage = window.location.pathname;
    if (currentPage.includes("gamePuzzle.html")) {
        startGame();
    } else if (currentPage.includes("selectTheme.html")) {
        initializeThemeSelection();
    }

    // 🎮 ฟังก์ชันเริ่มเกม
    function startGame() {
        console.log("🎮 Starting Puzzle Game...");
        sounds.music.play(); 
        let puzzleBoard = document.getElementById("puzzle-board");
        if (!puzzleBoard) {
            console.error("❌ puzzleBoard not found.");
            return;
        }

        createPuzzle(); // ✅ สร้างพัซเซิล
        startTimer();  // ✅ เริ่มจับเวลา
    }


    // 🎲 ฟังก์ชันสลับตำแหน่งอาร์เรย์แบบสุ่ม
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    window.shuffle = shuffle;

    // 🧩 ฟังก์ชันสร้างจิ๊กซอว์
    function createPuzzle() {
        if (!puzzleBoard) return;
        puzzleBoard.innerHTML = "";
        puzzleBoard.style.display = "grid";
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        puzzleBoard.style.width = `${gridSize * 100}px`;
        puzzleBoard.style.height = `${gridSize * 100}px`;

        let positions = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                positions.push({ x: col * 100, y: row * 100 });
            }
        }
        positions = shuffle(positions);

        positions.forEach((pos, index) => {
            let piece = document.createElement("div");
            piece.classList.add("piece");
            piece.style.width = "100px";
            piece.style.height = "100px";
            piece.style.backgroundImage = `url('${imagePath}')`;
            piece.style.backgroundSize = `${gridSize * 100}px ${gridSize * 100}px`;
            piece.style.backgroundPosition = `-${pos.x}px -${pos.y}px`;
            piece.draggable = true;
            piece.id = `piece-${index}`;

            // เพิ่ม event สำหรับ Drag & Drop
            piece.setAttribute("draggable", true);
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);

            puzzleBoard.appendChild(piece);
        });

        gameStarted = true;
    }
    
    let isPaused = false; // ตัวแปรตรวจสอบว่าเกมหยุดชั่วคราวหรือไม่

    
function pauseGame() {
    console.log("⏸ Game Paused");
    isPaused = true; // ตั้งค่าว่าเกมถูกหยุด
    sounds.music.pause();
    clearInterval(timer); // หยุดจับเวลา
    document.getElementById("pause-popup").style.display = "block"; // แสดง popup แจ้งเตือน
}

function resumeGame() {
    console.log("▶️ Game Resumed");
    isPaused = false; // ตั้งค่ากลับเป็นเล่นต่อ
    document.getElementById("pause-popup").style.display = "none"; // ซ่อน popup แจ้งเตือน
    sounds.music.play(); // เล่นเพลงต่อเมื่อกดเล่นต่อ
    startTimer(timeLeft); // เรียกฟังก์ชันจับเวลาต่อ โดยใช้เวลาที่เหลือ
    
}   

    // 🕰 ฟังก์ชันเริ่มจับเวลา
    function startTimer(remainingTime) {
        timeLeft = remainingTime !== undefined ? remainingTime : (parseInt(localStorage.getItem("gridSize")) === 3 ? 60 : 90);
    
        let timerElement = document.getElementById("timer");
    
        function updateTimerDisplay() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerElement.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    
        updateTimerDisplay();
    
        timer = setInterval(() => {
            if (!isPaused) { // ให้เวลานับถอยหลังต่อเมื่อเกมไม่ได้หยุด
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    showLosePopup();
                    return;
                }
    
                updateTimerDisplay();
                if (timeLeft < 10) {
                    timerElement.parentElement.style.background = "darkred";
                }
    
                timeLeft--; // ลดเวลาลง
            }
        }, 1000);
    }
// ทำให้สามารถเรียกใช้ฟังก์ชันจาก HTML ได้
window.pauseGame = pauseGame;
window.resumeGame = resumeGame;
    

    // 🎨 ฟังก์ชันเลือกธีม
    function selectTheme(theme) {
        console.log("✅ selectTheme() called with:", theme);
        localStorage.setItem("theme", theme);
        window.location.href = "level.html";
    }
    window.selectTheme = selectTheme;

    // 🔢 ฟังก์ชันเลือกระดับ
    function selectLevel(level) {
        localStorage.setItem("gridSize", level);
        console.log("✅ Level Selected:", level);
        window.location.href = "gamePuzzle.html";
    }
    window.selectLevel = selectLevel;

    // 🔄 ฟังก์ชันปุ่มย้อนกลับ
    function goBack() {
        if (document.referrer !== "") {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    }
    window.goBack = goBack;

    function goBackTheme() {
        window.location.href = "selectTheme.html"; // ✅ กลับไปเลือกธีมเสมอ
    }
    window.goBackTheme = goBackTheme;

    function goToLevel() {
        window.location.href = "level.html";
    }
    window.goToLevel = goToLevel;

    function goToSelectGame() {
        window.location.href = "selectGame.html";
    }
    window.goToSelectGame = goToSelectGame;

    // 🎨 ฟังก์ชันจัดการธีม
    function initializeThemeSelection() {
        console.log("✅ Loaded Theme Selection Page");

        document.querySelectorAll(".theme-card").forEach(card => {
            card.addEventListener("click", () => {
                const selectedTheme = card.getAttribute("data-theme");
                if (!card.classList.contains("locked")) {
                    selectTheme(selectedTheme);
                } else {
                    alert("🔒 This theme is locked! Earn more points to unlock.");
                }
            });
        });
    }
    window.initializeThemeSelection = initializeThemeSelection;

    // 🧩 Drag & Drop Functions
    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let draggedId = event.dataTransfer.getData("text/plain");
        let draggedPiece = document.getElementById(draggedId);
        let targetPiece = event.target;

        if (targetPiece.classList.contains("piece")) {
            let tempBgPosition = draggedPiece.style.backgroundPosition;
            draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
            targetPiece.style.backgroundPosition = tempBgPosition;

            checkWin(); // ✅ ตรวจสอบว่าชนะหรือยัง หลังจากสลับชิ้นส่วน
        }
    }

    window.dragStart = dragStart;
    window.dragOver = dragOver;
    window.drop = drop;


    // 🎉 ฟังก์ชันตรวจสอบว่าชนะหรือไม่
    // 🎉 ฟังก์ชันตรวจสอบว่าชนะหรือไม่
function checkWin() {
    let isWin = true;
    let pieces = document.querySelectorAll(".piece");

    pieces.forEach((piece, index) => {
        let expectedX = -(index % gridSize) * 100 + "px";
        let expectedY = -Math.floor(index / gridSize) * 100 + "px";

        if (piece.style.backgroundPosition !== `${expectedX} ${expectedY}`) {
            isWin = false;
        }
    });

    if (isWin) {
        clearInterval(timer);
        sounds.success.play();
        document.getElementById("win-popup").style.display = "block";

        // 🎯 คำนวณคะแนนพื้นฐาน
        let baseScore = gridSize === 3 ? 50 : gridSize === 4 ? 100 : 150;

        // 🎯 โบนัสเวลาที่เหลือ (ทุก 1 วินาที ได้ 2 คะแนน)
        let timeBonus = timeLeft * 2;

        // 🎯 โบนัสพิเศษ
        let speedBonus = timeLeft > 0.5 * (gridSize === 3 ? 60 : gridSize === 4 ? 90 : 120) ? 30 : 0;
        let finalScore = baseScore + timeBonus + speedBonus;

        // 🎯 อัปเดตคะแนนสะสม (รวมทุกครั้งที่เล่น)
        let totalScore = parseInt(localStorage.getItem("score") || 0);
        totalScore += finalScore;
        localStorage.setItem("score", totalScore);

        // 🎯 แสดงคะแนนใน Popup
        document.getElementById("final-score").innerText = finalScore;
        document.getElementById("win-image").src = imagePath;
        document.getElementById("win-popup").style.display = "block";

        updatePuzzleScore(finalScore); // ✅ Store score properly
        // 🎯 อัปเดตคะแนนที่โปรไฟล์
        updateProfileScore();
    }
}

    
    

    console.log("gridSize:", gridSize);
    console.log("timeLeft:", timeLeft);

    
// 🏆 ฟังก์ชันคำนวณคะแนน
function calculateScore(timeLeft, gridSize) {
    let baseScore = gridSize === 3 ? 50 : gridSize === 4 ? 100 : 150;
    let timeBonus = timeLeft * 2;
    let finalScore = baseScore + timeBonus;

    // 🎯 โบนัสพิเศษ
    if (timeLeft > 0.5 * (gridSize === 3 ? 60 : gridSize === 4 ? 90 : 120)) {
        finalScore += 30; // Speed Bonus
    }

    return finalScore;
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

// ✅ ให้ฟังก์ชันทำงานเมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", updateProfileScore);

function savePuzzleScore(finalScore) {
    let playerName = localStorage.getItem("playerName") || "Guest";
    let currentPuzzleScore = parseInt(localStorage.getItem(`score_${playerName}_puzzle`) || 0);
    let newPuzzleScore = currentPuzzleScore + finalScore;

    localStorage.setItem(`score_${playerName}_puzzle`, newPuzzleScore);
    updateProfileScore(); // ✅ อัปเดตคะแนนรวม
}
window.savePuzzleScore = savePuzzleScore;


// 📌 โหลดคะแนนสะสมตอนเริ่มเกม
    
    // Calculate the new puzzle score by adding the final score
document.addEventListener("DOMContentLoaded", () => {
    updateProfileScore();
    // Save the new puzzle score back to local storage
});

    // Update the total score displayed in the user's profile
    updateProfileScore(); // ✅ Update the total score

function updatePuzzleScore(newScore) {
    let currentScore = parseInt(localStorage.getItem("score_puzzle") || 0);
    let updatedScore = currentScore + newScore;

    localStorage.setItem("score_puzzle", updatedScore);
    updateProfileScore(); // Refresh total display
}



// ❌ ฟังก์ชันแสดงหน้าต่างแพ้
function showLosePopup() {
    sounds.gameOver.play();
    sounds.timesUp.play();
    document.getElementById("lose-popup").style.display = "block";
}


let playAgainButton = document.getElementById("play-again-btn");
if (playAgainButton) {
    playAgainButton.addEventListener("click", playAgain);
}

// 🔁 ฟังก์ชันเล่นเกมใหม่
function playAgain() {
    console.log("🔄 Play Again clicked! รีเฟรชภาพใหม่");

    let theme = localStorage.getItem("theme") || "forest";
    let usedImages = JSON.parse(localStorage.getItem("usedImages")) || [];

    let newImageIndex;
    do {
        newImageIndex = Math.floor(Math.random() * 20) + 1;
    } while (usedImages.includes(newImageIndex));

    usedImages.push(newImageIndex);
    if (usedImages.length >= 20) usedImages = []; // รีเซ็ตหากครบ 20 ภาพ

    localStorage.setItem("usedImages", JSON.stringify(usedImages));
    localStorage.setItem("randomImageIndex", newImageIndex);

    location.reload(); // รีโหลดหน้าเพื่อเล่นใหม่
}


let nextButton = document.getElementById("next-btn");
    if (nextButton) {
        nextButton.addEventListener("click", nextGame);
    }
// ⏭️ ฟังก์ชันไปหน้าเลือกระดับ
function nextGame() {
    console.log("🔄 Next game clicked! รีเฟรชภาพใหม่");

    let theme = localStorage.getItem("theme") || "forest";
    let usedImages = JSON.parse(localStorage.getItem("usedImages")) || [];

    let newImageIndex;
    do {
        newImageIndex = Math.floor(Math.random() * 20) + 1;
    } while (usedImages.includes(newImageIndex));

    usedImages.push(newImageIndex);
    if (usedImages.length >= 20) usedImages = [];

    localStorage.setItem("usedImages", JSON.stringify(usedImages));
    localStorage.setItem("randomImageIndex", newImageIndex);

    location.reload(); // ✅ ใช้ reload หน้าเพื่อเล่นใหม่
}
window.nextGame = nextGame; // ทำให้ nextGame() สามารถเข้าถึงได้จาก HTML

function updateScore(newScore) {
    let totalScore = parseInt(localStorage.getItem("totalScore") || 0);
    totalScore += newScore;
    localStorage.setItem("totalScore", totalScore);
    document.getElementById("playerScore").innerText = totalScore + " POINT";
}
window.updateScore = updateScore;

});
