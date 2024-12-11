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
