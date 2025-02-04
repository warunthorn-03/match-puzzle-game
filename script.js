document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script Loaded");
    updateProfileScore();
    // ✅ ตั้งค่าเสียง
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

    // ✅ เล่นเพลงพื้นหลังและให้เล่นซ้ำ
    sounds.music.loop = true;
    sounds.music.play();

    // ✅ เสียงคลิกปุ่ม
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => sounds.click.play());
    });

    // ✅ โหลดข้อมูลผู้เล่น
    document.addEventListener("DOMContentLoaded", () => {
        let playerName = localStorage.getItem("playerName") || "Guest";
        let totalScore = parseInt(localStorage.getItem(`score_${playerName}`) || "0");
    
        document.getElementById("playerName").textContent = playerName;
        document.getElementById("playerScore").textContent = `${totalScore} POINT`;
    });
    

    let playerScore = parseInt(localStorage.getItem(`score_${playerName}`)) || 0;

    // ✅ แสดงชื่อและคะแนนผู้เล่น
    updateProfileUI(playerName, playerScore);

    // ✅ ตรวจสอบและปลดล็อกธีม
    updateThemeUnlocking(playerName);

    // ✅ ตรวจสอบว่าผู้เล่นอยู่หน้าไหน
    let currentPage = window.location.pathname;
    if (currentPage.includes("game.html")) {
        startGame();
    } else if (currentPage.includes("selectTheme.html")) {
        initializeThemeSelection();
    }
});

// ✅ ฟังก์ชันเลือกธีม (แก้ไขปัญหา undefined function)
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

// 📌 โหลดข้อมูลคะแนนเมื่อเปิดหน้า
document.addEventListener("DOMContentLoaded", updateProfileScore);



// ✅ อัปเดตโปรไฟล์ UI
function updateProfileUI(name, score) {
    document.getElementById("playerName").textContent = name;
    document.getElementById("playerScore").textContent = `${score} POINT`;
}

// ✅ อัปเดตคะแนนของผู้เล่น
function updateTotalScore(newScore) {
    let playerName = localStorage.getItem("playerName") || "Guest";
    let totalScoreKey = `score_${playerName}`;

    let totalScore = parseInt(localStorage.getItem(totalScoreKey) || "0");
    totalScore += newScore;
    localStorage.setItem(totalScoreKey, totalScore); // ✅ บันทึกคะแนนรวมของผู้เล่นแต่ละคน

    // ✅ อัปเดต UI
    const playerScoreElement = document.getElementById("playerScore");
    if (playerScoreElement) {
        playerScoreElement.textContent = `${totalScore} POINT`;
        console.log(`📌 อัปเดต UI: ${playerName} มีคะแนนรวม ${totalScore} POINT`);
    } else {
        console.error("❌ ไม่พบ Element `playerScore` ใน DOM");
    }
}
window.updateTotalScore = updateTotalScore;


// ✅ ตรวจสอบและปลดล็อกธีมตามคะแนนของผู้เล่น
function updateThemeUnlocking(playerName) {
    let totalScore = parseInt(localStorage.getItem(`score_${playerName}`)) || 0;

    const themes = [
        { id: "theme1", requiredPoints: 3000 },
        { id: "theme2", requiredPoints: 5000 }
    ];

    themes.forEach(theme => {
        const themeElement = document.getElementById(theme.id);
        if (themeElement) {
            if (totalScore >= theme.requiredPoints) {
                themeElement.classList.remove("locked");
                themeElement.querySelector(".lock-icon").style.display = "none";
            } else {
                themeElement.classList.add("locked");
                themeElement.querySelector(".lock-icon").style.display = "block";
            }
        }
    });
}

// ✅ ฟังก์ชันเลือกธีม
function selectTheme(theme) {
    localStorage.setItem("theme", theme);
    window.location.href = "selectGame.html";
}
window.selectTheme = selectTheme;

// ✅ ฟังก์ชันย้อนกลับ
function goBack() {
    if (document.referrer !== "") {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}
window.goBack = goBack;

function goBackIndex() {
    window.location.href = "index.html";
}
window.goBackIndex = goBackIndex;

function goBackTheme() {
    window.location.href = "selectTheme.html";
}
window.goBackTheme = goBackTheme;

// ✅ ฟังก์ชันเปลี่ยนหน้าเลือกเกม
function selectGame(game) {
    if (game === "puzzle") {
        window.location.href = "level.html";
    } else if (game === "match") {
        window.location.href = "start_Match.html";
    }
}
window.selectGame = selectGame;

// ✅ ฟังก์ชันบันทึกคะแนนลง ranking
function saveRanking(playerName, score) {
    let rankingData = JSON.parse(localStorage.getItem("rankingData")) || [];
    
    let existingPlayer = rankingData.find(player => player.name === playerName);
    if (existingPlayer) {
        existingPlayer.score += score;
    } else {
        rankingData.push({ name: playerName, score });
    }

    rankingData.sort((a, b) => b.score - a.score);
    localStorage.setItem("rankingData", JSON.stringify(rankingData));
}
window.saveRanking = saveRanking;

// ✅ โหลดข้อมูลผู้เล่นและคะแนน
function loadPlayerData() {
    let playerName = localStorage.getItem("playerName") || "Guest";
    let totalScoreKey = `score_${playerName}`;
    let totalScore = parseInt(localStorage.getItem(totalScoreKey) || "0");

    document.getElementById("playerName").textContent = playerName;
    document.getElementById("playerScore").textContent = `${totalScore} POINT`;

    console.log(`📌 โหลดข้อมูลผู้เล่น: ${playerName}, คะแนน: ${totalScore}`);
}
document.addEventListener("DOMContentLoaded", loadPlayerData);


function updateTotalScore(newScore) {
    let playerName = localStorage.getItem("playerName") || "Guest";
    let totalScoreKey = `score_${playerName}`;

    let totalScore = parseInt(localStorage.getItem(totalScoreKey) || "0");
    totalScore += newScore;
    localStorage.setItem(totalScoreKey, totalScore); // ✅ บันทึกคะแนนรวมของผู้เล่นแต่ละคน

    // ✅ อัปเดต UI
    const playerScoreElement = document.getElementById("playerScore");
    if (playerScoreElement) {
        playerScoreElement.textContent = `${totalScore} POINT`;
    }

    console.log(`✅ อัปเดตคะแนนรวมของ ${playerName}: ${totalScore}`);
}
window.updateTotalScore = updateTotalScore;
