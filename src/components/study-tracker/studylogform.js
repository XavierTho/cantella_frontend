import React, { useState } from 'react';
import axios from 'axios';

const StudyLogForm = () => {
    const [subject, setSubject] = useState('');
    const [hours, setHours] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/study-tracker/log', {
                user_id: 1, // Replace with dynamic user ID if available
                subject,
                hours,
                notes,
            });
            alert('Study session logged successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to log study session.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Subject:</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <label>Hours:</label>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
            <label>Notes:</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button type="submit">Log Study</button>
        </form>
    );
};

export default StudyLogForm;