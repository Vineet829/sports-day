const score = {
    "Red": 0,
    "Blue": 0,
    "Green": 0
};

function raceTime() {
    let result = Math.floor(Math.random() * (20 - 5 + 1)) + 5; 
    return result * 1000; 
}

function Race100M(callback) {
    setTimeout(() => {
        let arr = [raceTime(), raceTime(), raceTime()];
        let winner = Math.max(...arr);
        let filtered = arr.filter((item) => item !== winner);
        let runnerUp = Math.max(...filtered);
        
        Object.keys(score).forEach((item, index) => {
            if (arr[index] === winner) {
                score[item] += 10;
            } else if (arr[index] === runnerUp) {
                score[item] += 5;
            }
        });
        
        logOutput(`🏃 Race Results: ${JSON.stringify(score)}`);
        callback();
    }, 3000);
}

function LongJump(callback) {
    setTimeout(() => {
        let arr = Object.keys(score);
        let winner = arr[Math.floor(Math.random() * arr.length)];
        let runnerUp = arr.filter((item) => item !== winner)[Math.floor(Math.random() * (arr.length - 1))];
    
        Object.keys(score).forEach((item, index) => {
            if (arr[index] === winner) {
                score[item] += 10;
            } else if (arr[index] === runnerUp) {
                score[item] += 5;
            }
        });
        
        logOutput(`🏅 Long Jump Results: ${JSON.stringify(score)}`);
        callback();
    }, 2000);
}

function HighJump(callback) {
    setTimeout(() => {
        let winner = prompt("Who is the winner of High Jump?").toLowerCase();
        let runnerUp = prompt("Who is the runner up of High Jump?").toLowerCase();
        
        if (Object.keys(score).map(color => color.toLowerCase()).includes(winner) && 
            Object.keys(score).map(color => color.toLowerCase()).includes(runnerUp)) {
            Object.keys(score).forEach((item) => {
                if (item.toLowerCase() === winner) {
                    score[item] += 10;
                } else if (item.toLowerCase() === runnerUp) {
                    score[item] += 5;
                }
            });
            logOutput(`🏆 High Jump Results: ${JSON.stringify(score)}`);
        } else {
            alert("Invalid input! Please enter valid colors.");
            return HighJump(callback);
        }
        callback();
    }, 1000);
}

function AwardCeremony() {
    logOutput(`🎉 Final Scores: ${JSON.stringify(score)}`);
    let winner = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    logOutput(`🏅 Winner of the Sports Day: ${winner}!`);
}

function logOutput(message) {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML += `<p>${message}</p> \n`;
    outputElement.scrollTop = outputElement.scrollHeight;
}

document.getElementById("start-button").addEventListener("click", () => {
    const startButton = document.getElementById("start-button");
    startButton.disabled = true;
    logOutput("Starting the Sports Day Events...\n");
    Race100M(() => {
        LongJump(() => {
            HighJump(() => {
                AwardCeremony();
                startButton.disabled = false;
            });
        });
    });
});
