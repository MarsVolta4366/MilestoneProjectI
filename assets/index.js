let boxes = document.querySelectorAll(".box")
let isPlayerXsTurn = true
let playerSpan = document.getElementById("playerSpan")
let winnerDisplay = document.getElementById("winnerDisplay")
let turn = 0

function boxClicked(box) {
    if(isPlayerXsTurn && box.textContent === "") {
        turn++
        box.textContent = "X"
        box.style.color = "var(--x)"
        isPlayerXsTurn = false
        playerSpan.classList.remove("playerX")
        playerSpan.classList.add("playerO")
        playerSpan.textContent = "O"
    } else if(!isPlayerXsTurn && box.textContent === "") {
        turn++
        box.textContent = "O"
        box.style.color = "var(--o)"
        isPlayerXsTurn = true
        playerSpan.classList.remove("playerO")
        playerSpan.classList.add("playerX")
        playerSpan.textContent = "X"
    }

    // Determine winner and display
    if(boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent && boxes[0].textContent != "") {
        winnerDisplay.textContent = `${boxes[0].textContent} wins!`
        // Make function to remove event listeners?
        // box.removeEventListener("click", boxClicked(box))
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => boxClicked(box))
})