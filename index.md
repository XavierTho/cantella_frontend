---
layout: base
title:
search_exclude: true
hide: true
menu: nav/home.html
---
<style>
    body {
        background-color: #fff3e6;
        background-image: 
            radial-gradient(#ffe4cc 15%, transparent 16%),
            radial-gradient(#ffe4cc 15%, transparent 16%);
        background-size: 60px 60px;
        background-position: 0 0, 30px 30px;
        position: relative;
        overflow-x: hidden;
    }

    /* Decorative elements */
    .decorative-corner {
        position: fixed;
        width: 200px;
        height: 200px;
        z-index: -1;
    }
    .top-left {
        top: 0;
        left: 0;
        background: linear-gradient(135deg, #ffa500 0%, transparent 70%);
    }
    .bottom-right {
        bottom: 0;
        right: 0;
        background: linear-gradient(315deg, #ffa500 0%, transparent 70%);
    }

    /* Updated search container */
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
        border: 2px solid #ffa500;
        outline: none;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
        transition: all 0.3s ease;
    }
    .search-container input:focus {
        box-shadow: 0 4px 20px rgba(255, 165, 0, 0.4);
        border-color: #ff8c00;
    }

    /* Updated motivational bar */
    .motivational-bar {
        text-align: center;
        font-size: 1.5rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        margin: 1rem auto;
        max-width: 800px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }
    .motivational-bar:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
        background: rgba(255, 255, 255, 0.3);
    }
    .motivational-bar span {
        font-size: 2rem;
    }

    /* Updated classes container */
    .classes-container {
        margin: 2rem auto;
        max-width: 800px;
        padding: 1.5rem;
        text-align: center;
        display: none;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(255, 165, 0, 0.2);
    }

    /* Updated prompt login */
    .prompt-login {
        display: none;
        text-align: center;
        margin: 2rem auto;
        max-width: 600px;
        font-size: 1.2rem;
        color: #ff6b00;
        background: rgba(255, 255, 255, 0.9);
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);
    }
    .prompt-login a {
        color: #ff8c00;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;
    }
    .prompt-login a:hover {
        color: #ff6b00;
        text-decoration: underline;
    }

    /* Keep existing class card styles */
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

    /* Add floating decorative elements */
    .floating-shape {
        position: fixed;
        background: rgba(255, 165, 0, 0.1);
        border-radius: 50%;
        z-index: -1;
        animation: float 20s infinite ease-in-out;
    }
    .shape1 { width: 100px; height: 100px; top: 20%; left: 10%; animation-delay: 0s; }
    .shape2 { width: 150px; height: 150px; top: 60%; right: 15%; animation-delay: -5s; }
    .shape3 { width: 80px; height: 80px; top: 40%; left: 80%; animation-delay: -10s; }

    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
    }

    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .cantella-title {
        text-align: center;
        margin: 20px 0;
        position: relative;
    }

    .cantella-title h1 {
        font-size: 5rem;
        color: #FF8A5B;
        font-family: 'Pacifico', cursive;
        display: inline-block;
        animation: float 3s ease-in-out infinite;
        letter-spacing: 0.1em;
    }

    .cantella-title h1 span {
        display: inline-block;
        animation: bounce 1.5s infinite alternate;
    }

    .cantella-title h1 span:nth-child(odd) {
        animation-delay: 0.1s;
    }

    .cantella-title h1 span:nth-child(even) {
        animation-delay: 0.2s;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-20px); }
    }

    .cantella-title::after {
        content: 'The Ultimate Study Hub';
        display: block;
        font-size: 1.5rem;
        color: #FFD6A5;
        margin-top: 5px;
        text-shadow: 0 0 10px #FF8A5B;
    }
</style>

<!-- Add decorative elements -->
<div class="decorative-corner top-left"></div>
<div class="decorative-corner bottom-right"></div>
<div class="floating-shape shape1"></div>
<div class="floating-shape shape2"></div>
<div class="floating-shape shape3"></div>

<div class="cantella-title">
    <h1>
        <span>C</span><span>a</span><span>n</span><span>t</span><span>e</span><span>l</span><span>l</span><span>a</span>
    </h1>
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

<div class="motivational-bar" onclick="cycleQuotes()">
    <span>💡</span> <span id="motivational-quote">"The best way to predict the future is to create it!"</span>
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



<script src="https://utteranc.es/client.js"
        repo="arushah2007/arushStudent"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
    </script> 
