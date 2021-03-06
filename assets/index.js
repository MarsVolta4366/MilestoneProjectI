let isPlayerXsTurn = true
let winnerDisplay = document.getElementById("winnerDisplay")
let turn = 0
let isGameOver = false
let applause = document.getElementById("applause")
let crowdCry = document.getElementById("crowdCry")
let clickSound = document.getElementById("click")
let boxes = document.querySelectorAll(".box")
let playerSpan = document.getElementById("playerSpan")
let turnSoundOff = document.getElementById("turnSoundOff")
let turnSoundOn = document.getElementById("turnSoundOn")
let reset = document.getElementById("reset")
let resetScores = document.getElementById("resetScores")

// Display score of each player stored in local storage on page load
displayScores()

// Sound button logic
function muteSound() {
    applause.muted = true 
    crowdCry.muted = true
    clickSound.muted = true
    localStorage.isMuted = true
    turnSoundOff.classList.add("hide")
    turnSoundOn.classList.remove("hide")
}

if(localStorage.isMuted) {
    muteSound()
}

turnSoundOff.addEventListener("click", () => {
    muteSound()
})

turnSoundOn.addEventListener("click", () => {
    localStorage.removeItem("isMuted")
    turnSoundOn.classList.add("hide")
    turnSoundOff.classList.remove("hide")
    applause.muted = false 
    crowdCry.muted = false
    clickSound.muted = false
})

// Reset button logic
reset.addEventListener("click", () => {
    location.reload()
})

// Reset scores button logic
resetScores.addEventListener("click", () => {
    if(localStorage.xScore) {
        localStorage.removeItem("xScore")
    }
    if(localStorage.oScore) {
        localStorage.removeItem("oScore")
    }
    location.reload()
})

// If amount of games is even, let X have first turn, if odd let O have first turn
let amountOfGames = 0
if(localStorage.xScore) {
    amountOfGames += Number(localStorage.xScore)
}

if(localStorage.oScore) {
    amountOfGames += Number(localStorage.oScore)
}

if(amountOfGames%2 !== 0) {
    isPlayerXsTurn = false
    playerSpan.classList.remove("playerX")
    playerSpan.classList.add("playerO")
    playerSpan.textContent = "O"
}

// When empty box is clicked call boxClicked
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(box.textContent === "" && !isGameOver) {
            boxClicked(box)
        }
    })
})

// Fill box with approriate text based on player, switch to other players turn, call checkForWinner()
function boxClicked(box) {
    clickSound.currentTime = 0
    clickSound.play()
    let boxText = isPlayerXsTurn ? "X":"O"
    let boxTextColor = isPlayerXsTurn ? "#98DFEA":"#07BEB8"
    let boxClassToRemove = isPlayerXsTurn ? "playerX":"playerO"
    let boxClassToAdd = isPlayerXsTurn ? "playerO":"playerX"
    let playerSpanText = !isPlayerXsTurn ? "X":"O"
    isPlayerXsTurn = !isPlayerXsTurn

    box.textContent = boxText
    box.style.color = boxTextColor
    playerSpan.classList.remove(boxClassToRemove)
    playerSpan.classList.add(boxClassToAdd)
    playerSpan.textContent = playerSpanText
    turn++
    checkForWinner()
}

// Check for winner or tie and display if found
function checkForWinner() {
    if(boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent && boxes[0].textContent != "") {
        displayWinner(0)
        highlightWinningBoxes(0, 1, 2)
    } else if(boxes[3].textContent === boxes[4].textContent && boxes[3].textContent === boxes[5].textContent && boxes[3].textContent != "") {
        displayWinner(3)
        highlightWinningBoxes(3, 4, 5)
    } else if(boxes[6].textContent === boxes[7].textContent && boxes[6].textContent === boxes[8].textContent && boxes[6].textContent != "") {
        displayWinner(6)
        highlightWinningBoxes(6, 7, 8)
    } else if(boxes[0].textContent === boxes[3].textContent && boxes[0].textContent === boxes[6].textContent && boxes[0].textContent != "") {
        displayWinner(0)
        highlightWinningBoxes(0, 3, 6)
    } else if(boxes[1].textContent === boxes[4].textContent && boxes[1].textContent === boxes[7].textContent && boxes[1].textContent != "") {
        displayWinner(1)
        highlightWinningBoxes(1, 4, 7)
    } else if(boxes[2].textContent === boxes[5].textContent && boxes[2].textContent === boxes[8].textContent && boxes[2].textContent != "") {
        displayWinner(2)
        highlightWinningBoxes(2, 5, 8)
    } else if(boxes[0].textContent === boxes[4].textContent && boxes[0].textContent === boxes[8].textContent && boxes[0].textContent != "") {
        displayWinner(0)
        highlightWinningBoxes(0, 4, 8)
    } else if(boxes[2].textContent === boxes[4].textContent && boxes[2].textContent === boxes[6].textContent && boxes[2].textContent != "") {
        displayWinner(2)
        highlightWinningBoxes(2, 4, 6)
    } else if(turn === 9) {
        winnerDisplay.textContent = "It's a tie!"
        crowdCry.volume = .5
        crowdCry.play()
        isGameOver = true
    }
}

// Display winner and end game
function displayWinner(index) {
    winnerDisplay.textContent = `${boxes[index].textContent} wins!`
    applause.volume = .5
    applause.play()
    isGameOver = true
    updateScore(boxes[index].textContent)
}

// Highlight winning boxes green and flash three times
function highlightWinningBoxes(box1, box2, box3) {
    boxes[box1].style.background = "#278841"
    boxes[box1].classList.add("winner")
    boxes[box2].style.background = "#278841"
    boxes[box2].classList.add("winner")
    boxes[box3].style.background = "#278841"
    boxes[box3].classList.add("winner")
}

// Update the winners score in localStorage
function updateScore(winner) {
    if(winner === "X") {
        if(localStorage.xScore) {
            localStorage.xScore = Number(localStorage.xScore) + 1
        } else {
            localStorage.xScore = 1
        }
    } else if(winner === "O") {
        if(localStorage.oScore) {
            localStorage.oScore = Number(localStorage.oScore) + 1
        } else {
            localStorage.oScore = 1
        }
    }
    displayScores()
}

// Display current scores
function displayScores() {
    let xScore = document.getElementById("xScore")
    let oScore = document.getElementById("oScore")
    if(localStorage.xScore) {
        xScore.textContent = localStorage.xScore
    }
    if(localStorage.oScore) {
        oScore.textContent = localStorage.oScore
    }
}