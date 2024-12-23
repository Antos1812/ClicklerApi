const userId = 1;
let score = 0;

const updateScore = () => {
    fetch(`/api/users/${userId}/points`, {
        method: "PUT",
        headers: {"Content-Type": "application"},
        body: JSON.stringify({points: 1}),
    })
    .then((response) => response.json())
    .then((data) => {
        score++;
        document.getElementById("score").innerHTML = `Score: $(score)`;
        console.log("Points updated:", data);
    })
    .catch((err) => console.error("Error updateing points", err));
};

document.getElementById("clicker").addEventListener("click", updateScore);