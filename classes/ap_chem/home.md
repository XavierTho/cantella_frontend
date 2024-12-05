---
layout: post
title: AP Chemistry
permalink: classes/ap/chem/home
---

<style>
    #display {
        color: white;
        font-weight: bold;
        font-size: 18px;
    }
</style>

<p id="display"></p>
Answer: <input id ="userAnswer">
<button onclick="checkAnswer()">Submit</button>

<p id="result"></p>

<script>
    // Define set of questions
    const questions = [
        "What is the equilibrium constant (K) of the reaction: "
    ]

    // Define set of reactions
    const reactions = [
        "N<sub>2</sub> + 3H<sub>2</sub> <--> 2NH<sub>3</sub>",
        "N<sub>2</sub>O<sub>4(g)</sub> <--> N<sub>2(g)</sub> + 2O<sub>2(g)</sub>"
    ]

    // Temporary array till we can directly parse and answer the question
    const correctAnswers = [
        "K = [NH3]^2/([N2][H2]^3)",
        "K = [N2][O2]^2/([N2][O4])",
    ]

    // Don't merge reactions and correctAnswers array into an object

    // Index a random Question & Reaction
    randomQuestionIndex = [Math.floor((Math.random() * questions.length))]
    randomReactionIndex = [Math.floor((Math.random() * reactions.length))]

    // Search for random index
    randomQuestion = questions[randomQuestionIndex]
    randomReaction = reactions[randomReactionIndex]

    // Set question to be seen
    let display = randomQuestion + randomReaction
    console.log(display)

    // Display question to HTML
    document.getElementById('display').innerHTML = display;

    function checkAnswer() {
        const userAnswer = document.getElementById('userAnswer').value;
        const correctAnswer = correctAnswers[randomReactionIndex];

        (userAnswer === correctAnswer) ? console.log(true) : console.log(false)

        isCorrect = (userAnswer.trim() === correctAnswer)

        if (isCorrect) {
            document.getElementById('result').innerHTML = "Correct! Great job."
            document.getElementById('result').style.color = "green"
        } else {
            document.getElementById('result').innerHTML = "That's incorrect. Try again."
            document.getElementById('result').style.color = "red"
        }
    }
</script>