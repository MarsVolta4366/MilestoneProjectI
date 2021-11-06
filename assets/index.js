let boxes = document.querySelectorAll(".box")
let isPlayerXsTurn = true
let playerSpan = document.getElementById("playerSpan")
let winnerDisplay = document.getElementById("winnerDisplay")
let turn = 0
let isGameOver = false
let reset = document.getElementById("reset")

// Reset button
reset.addEventListener("click", () => {
    location.reload()
})

// Display winner and end game
function displayWinner(index) {
    winnerDisplay.textContent = `${boxes[index].textContent} wins!`
    isGameOver = true
}

boxes.forEach(box => {
    box.addEventListener("click", () => {

        if(box.textContent === "" && !isGameOver) {
            let boxText = isPlayerXsTurn ? "X":"O"
            let boxTextColor = isPlayerXsTurn ? "var(--x)":"var(--o)"
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
        }

        // Check for winner or tie and display if found
        if(boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent && boxes[0].textContent != "") {
            displayWinner(0)
        } else if(boxes[3].textContent === boxes[4].textContent && boxes[3].textContent === boxes[5].textContent && boxes[3].textContent != "") {
            displayWinner(3)
        } else if(boxes[6].textContent === boxes[7].textContent && boxes[6].textContent === boxes[8].textContent && boxes[6].textContent != "") {
            displayWinner(6)
        } else if(boxes[0].textContent === boxes[3].textContent && boxes[0].textContent === boxes[6].textContent && boxes[0].textContent != "") {
            displayWinner(0)
        } else if(boxes[1].textContent === boxes[4].textContent && boxes[1].textContent === boxes[7].textContent && boxes[1].textContent != "") {
            displayWinner(1)
        } else if(boxes[2].textContent === boxes[5].textContent && boxes[2].textContent === boxes[8].textContent && boxes[2].textContent != "") {
            displayWinner(2)
        } else if(boxes[0].textContent === boxes[4].textContent && boxes[0].textContent === boxes[8].textContent && boxes[0].textContent != "") {
            displayWinner(0)
        } else if(boxes[2].textContent === boxes[4].textContent && boxes[2].textContent === boxes[6].textContent && boxes[2].textContent != "") {
            displayWinner(2)
        } else if(turn === 9) {
            winnerDisplay.textContent = "It's a tie!"
            isGameOver = true
        }
    })
})

