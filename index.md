---
layout: base
title:
search_exclude: true
hide: true
menu: nav/home.html
---
<style>
    .motivational-bar {
        text-align: center;
        font-size: 1.2rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.15);
        margin: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .motivational-bar:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
    .motivational-bar span {
        font-size: 2rem;
    }
    .search-container {
        display: flex;
        justify-content: center;
        margin: 1.5rem 0;
    }
    .search-container input {
        width: 80%;
        max-width: 500px;
        padding: 0.8rem;
        border-radius: 25px;
        border: none;
        outline: none;
        font-size: 1rem;
    }
    .classes-container {
        margin: 2rem auto;
        max-width: 800px;
        padding: 1rem;
        text-align: center;
        display: none; /* Hide by default */
    }
    .class-card {
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .class-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    }
    .class-card a {
        color: white;
        text-decoration: none;
    }
    .header {
        display: none;
    }
    .prompt-login {
        display: none; /* Hidden by default */
        text-align: center;
        margin: 2rem auto;
        font-size: 1.2rem;
        color: white;
        background: rgba(255, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
    .prompt-login a {
        color: lightblue;
        text-decoration: underline;
    }
    /* AP World History - Ancient/Archaeological theme */
    .class-card.world {
        background: rgba(139,69,19,0.8);
        border: 2px solid #8b4513;
        box-shadow: 0 4px 6px rgba(139,69,19,0.3);
        font-family: 'Papyrus', fantasy;
    }
    .class-card.world a {
        color: #d4b483;
    }
    .class-card.world:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(139,69,19,0.5);
    }

    /* AP CSP - Matrix/Hacker theme */
    .class-card.csp {
        background: #1a1a1a;
        border: 2px solid #0f0;
        box-shadow: 0 0 10px rgba(0,255,0,0.3);
        font-family: 'Courier New', monospace;
        animation: glitch 10s infinite;
    }
    .class-card.csp a {
        color: #0f0;
    }
    .class-card.csp:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px rgba(0,255,0,0.5);
    }

    /* AP US History - Patriotic theme */
    .class-card.ush {
        background: linear-gradient(45deg, #002868, #041E42);
        border: 3px solid #bf0a30;
        box-shadow: 0 4px 6px rgba(255,255,255,0.2);
        font-family: 'Times New Roman', serif;
    }
    .class-card.ush a {
        color: #fff;
    }
    .class-card.ush:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(255,255,255,0.4);
    }

    /* AP Chemistry - Lab/Science theme */
    .class-card.chem {
        background: #333;
        border: 2px solid #ff0;
        box-shadow: 0 0 10px rgba(255,255,0,0.2);
        font-family: 'Courier New', monospace;
    }
    .class-card.chem a {
        color: #0f0;
    }
    .class-card.chem:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px rgba(255,255,0,0.4);
    }
</style>

<div class="motivational-bar" onclick="cycleQuotes()">
    <span>💡</span> <span id="motivational-quote">"The best way to predict the future is to create it!"</span>
</div>

<div class="search-container">
    <input type="text" id="class-search" placeholder="Search for classes..." oninput="filterClasses()" />
</div>

<div id="prompt-login" class="prompt-login">
    <p>Please <a href="{{site.baseurl}}/login">login/sign up</a> to continue.</p>
</div>

<div id="classes-container" class="classes-container">
    <!-- Class Cards -->
    <div class="class-card world">
        <a href="{{site.baseurl}}/classes/ap/world/home">📜 AP World History</a>
    </div>
    <div class="class-card csp">
        <a href="{{site.baseurl}}/classes/ap/csp/home">💻 AP CSP</a>
    </div>
    <div class="class-card chem">
        <a href="{{site.baseurl}}/classes/ap/chem/home">⚗️ AP Chemistry</a>
    </div>
    <div class="class-card ush">
        <a href="{{site.baseurl}}/classes/ap/ush/home">🦅 AP US History</a>
    </div>
</div>

<script>
    // List of motivational quotes
    const motivationalQuotes = [
        "The best way to predict the future is to create it!",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Don't watch the clock; do what it does. Keep going.",
        "Strive for progress, not perfection.",
        "The expert in anything was once a beginner.",
        "Learning never exhausts the mind."
    ];
    let currentQuoteIndex = 0;

    // Cycle through motivational quotes
    function cycleQuotes() {
        currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
        document.getElementById("motivational-quote").textContent = motivationalQuotes[currentQuoteIndex];
    }

    // Search and filter classes
    function filterClasses() {
        const query = document.getElementById("class-search").value.toLowerCase();
        const classes = document.querySelectorAll(".class-card");

        classes.forEach(classCard => {
            const text = classCard.textContent.toLowerCase();
            classCard.style.display = text.includes(query) ? "block" : "none";
        });
    }

    // Check authentication status and show the appropriate content
    document.addEventListener('DOMContentLoaded', function() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            document.getElementById('classes-container').style.display = "block"; // Show the classes container
            document.getElementById('prompt-login').style.display = "none"; // Hide the login prompt
        } else {
            document.getElementById('classes-container').style.display = "none"; // Hide the classes container
            document.getElementById('prompt-login').style.display = "block"; // Show the login prompt
        }
    });
</script>