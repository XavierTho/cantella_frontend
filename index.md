---
layout: post
title: Cantella
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
    }
    .class-card {
        background: rgba(255, 255, 255, 0.15);
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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
</style>

 <div class="motivational-bar" onclick="cycleQuotes()">
    <span>💡</span> <span id="motivational-quote">"The best way to predict the future is to create it!"</span>
</div>

 <div class="search-container">
    <input type="text" id="class-search" placeholder="Search for classes..." oninput="filterClasses()" />
</div>

 <div class="classes-container" id="classes-container">
    <!-- Class Cards -->
    <div class="class-card"><a href="{{site.baseurl}}/classes/ap/world/home">AP World History</a></div>
    <div class="class-card"><a href="{{site.baseurl}}/classes/ap/chem/home">AP Chemistry</a></div>
    <div class="class-card"><a href="{{site.baseurl}}/classes/ap/physics/home">AP Physics</a></div>
    <div class="class-card"><a href="{{site.baseurl}}/classes/ap/csp/home">AP CSP</a></div>
    <div class="class-card"><a href="{{site.baseurl}}/classes/ap/ush/home">AP US History</a></div>
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
</script>



<div class="container">
    <div class="form-container">
        <h2>Select Group and Channel</h2>
        <form id="selectionForm">
            <label for="group_id">Group:</label>
            <select id="group_id" name="group_id" required>
                <option value="">Select a group</option>
            </select>
            <label for="channel_id">Channel:</label>
            <select id="channel_id" name="channel_id" required>
                <option value="">Select a channel</option>
            </select>
            <button type="submit">Select</button>
        </form>
    </div>
</div>

<div class="container">
    <div class="form-container">
        <h2>Add New Post</h2>
        <form id="postForm">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment" required></textarea>
            <button type="submit">Add Post</button>
        </form>
    </div>
</div>

<div class="container">
    <div id="data" class="data">
        <div class="left-side">
            <p id="count"></p>
        </div>
        <div class="details" id="details">
        </div>
    </div>
</div>



<script type="module">
    // Import server URI and standard fetch options
    import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

    /**
     * Fetch groups for dropdown selection
     * User picks from dropdown
     */
    async function fetchGroups() {
        try {
            const response = await fetch(`${pythonURI}/api/groups/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ section_name: "Vote for the GOAT" }) // Adjust the section name as needed
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups: ' + response.statusText);
            }
            const groups = await response.json();
            const groupSelect = document.getElementById('group_id');
            groups.forEach(group => {
                const option = document.createElement('option');
                option.value = group.name; // Use group name for payload
                option.textContent = group.name;
                groupSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    /**
     * Fetch channels based on selected group
     * User picks from dropdown
     */
    async function fetchChannels(groupName) {
        try {
            const response = await fetch(`${pythonURI}/api/channels/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ group_name: groupName })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch channels: ' + response.statusText);
            }
            const channels = await response.json();
            const channelSelect = document.getElementById('channel_id');
            channelSelect.innerHTML = '<option value="">Select a channel</option>'; // Reset channels
            channels.forEach(channel => {
                const option = document.createElement('option');
                option.value = channel.id;
                option.textContent = channel.name;
                channelSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    }

    /**
      * Handle group selection change
      * Channel Dropdown refresh to match group_id change
      */
    document.getElementById('group_id').addEventListener('change', function() {
        const groupName = this.value;
        if (groupName) {
            fetchChannels(groupName);
        } else {
            document.getElementById('channel_id').innerHTML = '<option value="">Select a channel</option>'; // Reset channels
        }
    });

    /**
     * Handle form submission for selection
     * Select Button: Computer fetches and displays posts
     */
    document.getElementById('selectionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const groupId = document.getElementById('group_id').value;
        const channelId = document.getElementById('channel_id').value;
        if (groupId && channelId) {
            fetchData(channelId);
        } else {
            alert('Please select both group and channel.');
        }
    });

    /**
     * Handle form submission for adding a post
     * Add Form Button: Computer handles form submission with request
     */
    document.getElementById('postForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Extract data from form
        const title = document.getElementById('title').value;
        const comment = document.getElementById('comment').value;
        const channelId = document.getElementById('channel_id').value;

        // Create API payload
        const postData = {
            title: title,
            comment: comment,
            channel_id: channelId
        };

        // Trap errors
        try {
            // Send POST request to backend, purpose is to write to database
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Failed to add post: ' + response.statusText);
            }

            // Successful post
            const result = await response.json();
            alert('Post added successfully!');
            document.getElementById('postForm').reset();
            fetchData(channelId);
        } catch (error) {
            // Present alert on error from backend
            console.error('Error adding post:', error);
            alert('Error adding post: ' + error.message);
        }
    });

    /**
     * Fetch posts based on selected channel
     * Handle response: Fetch and display posts
     */
    async function fetchData(channelId) {
        try {
            const response = await fetch(`${pythonURI}/api/posts/filter`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ channel_id: channelId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts: ' + response.statusText);
            }

            // Parse the JSON data
            const postData = await response.json();

            // Extract posts count
            const postCount = postData.length || 0;

            // Update the HTML elements with the data
            document.getElementById('count').innerHTML = `<h2>Count ${postCount}</h2>`;

            // Get the details div
            const detailsDiv = document.getElementById('details');
            detailsDiv.innerHTML = ''; // Clear previous posts

            // Iterate over the postData and create HTML elements for each item
            postData.forEach(postItem => {
                const postElement = document.createElement('div');
                postElement.className = 'post-item';
                postElement.innerHTML = `
                    <h3>${postItem.title}</h3>
                    <p><strong>Channel:</strong> ${postItem.channel_name}</p>
                    <p><strong>User:</strong> ${postItem.user_name}</p>
                    <p>${postItem.comment}</p>
                `;
                detailsDiv.appendChild(postElement);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch groups when the page loads
    fetchGroups();
</script>

