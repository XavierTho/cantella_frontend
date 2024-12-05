---
layout: base
title: Logout
permalink: /logout
search_exclude: true
---

<script type="module">
    import { fetchOptions, pythonURI } from '{{site.baseurl}}/assets/js/api/config.js';
    const URL = pythonURI + '/api/authenticate'; // Assuming pythonURI is defined elsewhere
    const options = {
        ...fetchOptions, // Assuming fetchOptions is defined elsewhere and includes necessary headers, etc.
        method: 'DELETE',
    };
    console.log('Logout clicked');

    fetch(URL, options)
        .then(response => {
            if (response.ok) {
                window.location.href = "{{site.baseurl}}/login";
                // Successfully called the logout endpoint, now redirect to the current page
            } else {
                // Handle response not ok (e.g., display an error message)
                console.error('Logout failed:', response.statusText);
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error during logout:', error);
        });

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sample Webpage</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #333;
            color: white;
            padding: 20px 0;
            text-align: center;
        }
        nav {
            background-color: #444;
            padding: 10px;
            text-align: center;
        }
        nav a {
            color: white;
            padding: 10px;
            text-decoration: none;
            margin: 0 10px;
        }
        main {
            padding: 20px;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        .form-container {
            margin: 20px 0;
        }
        input[type="text"], input[type="email"], textarea {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 4px;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Sample Webpage</h1>
    </header>

    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>

    <main>
        <section id="home">
            <h2>Home</h2>
            <p>This is the homepage of the sample website. It showcases the basics of HTML and CSS styling.</p>
        </section>

        <section id="about">
            <h2>About Us</h2>
            <p>We are a team of passionate developers who create beautiful, responsive websites.</p>
        </section>

        <section id="services">
            <h2>Our Services</h2>
            <ul>
                <li>Web Development</li>
                <li>UI/UX Design</li>
                <li>SEO Optimization</li>
                <li>Mobile App Development</li>
            </ul>
        </section>

        <section id="contact">
            <h2>Contact Us</h2>
            <p>If you'd like to get in touch, please fill out the form below:</p>
            <div class="form-container">
                <form action="#" method="POST">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="message">Your Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>

                    <input type="submit" value="Send Message">
                </form>
            </div>
        </section>

        <section id="table">
            <h2>Sample Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>johndoe@example.com</td>
                        <td>+1234567890</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>janesmith@example.com</td>
                        <td>+0987654321</td>
                    </tr>
                    <tr>
                        <td>Samuel Green</td>
                        <td>samuelgreen@example.com</td>
                        <td>+1122334455</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Sample Webpage. All rights reserved.</p>
    </footer>
</body>
</html>
