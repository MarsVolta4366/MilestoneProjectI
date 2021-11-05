// Remember to make commits!
// Add readme file description or whatever it says in canvas prompt
let boxes = document.querySelectorAll(".box")
let isPlayerXsTurn = true
let playerSpan = document.getElementById("playerSpan")
let winnerDisplay = document.getElementById("winnerDisplay")
let turn = 0
let isGameOver = false

function displayWinner(index) {
    if(index) {
        winnerDisplay.textContent = `${boxes[index].textContent} wins!`
        isGameOver = true
    } else {
        winnerDisplay.textContent = "It's a tie!"
        isGameOver = true
    }
}

boxes.forEach(box => {
    box.addEventListener("click", (e) => {

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

        // Check for winner and display if found
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
        } else if(turn >= 9) {
            displayWinner()
        }
    })
})

