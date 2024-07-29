import React, { useState } from 'react';
import axios from 'axios'

import './App.css';

const App = () => {
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

    const postApiUrl = "https://v2minds-backend-project.onrender.com/addNotes";
    const getApiUrl = "https://v2minds-backend-project.onrender.com/notes";

    const onClickSaveNote = async () => {
        if (content.trim() === '') {
            alert("Note content cannot be empty");
            return;
        }

        try {
            // console.log("save button triggred");
            const response = await axios.post(postApiUrl, {content});

            console.log(response);
            
            if (response.status === 200) {
                alert("Note added successfully!");
                setContent('');
                onClickFetchNotes();
            } else {
                alert("Failed to add note");
            }
        } catch (error) {
            console.error("Error adding note:", error);
            alert("An error occurred while adding the note");
        }
    };

    const onClickFetchNotes = async () => {
        try {
            const response = await axios.get(getApiUrl);
            if (response.status === 200) {
                setNotes(response.data);
            } else {
                alert("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            alert("An error occurred while fetching the notes");
        }
    };

    const onClickDeleteNote = async (id) => {
        try {
            const response = await fetch(`${getApiUrl}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                onClickFetchNotes();
            } else {
                alert("Failed to delete note");
            }
        } catch (error) {
            console.error("Error deleting note:", error);
            alert("An error occurred while deleting the note");
        }
    };

    return (
        <div className="app-container">
            <h1 className="heading">Notes Application</h1>
            <div className="notes-container">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note here..."
                ></textarea>
                <div>
                    <button onClick={onClickSaveNote}>Save </button>
                    <button onClick={onClickFetchNotes}>Notes List</button>
                </div>
            </div>
            <div className="note-list">
                <h1 className="notes-heading">Notes</h1>
                <ul className='notes-list-container'>
                    {notes.map(note => (
                        <li className='list-container' key={note.id}>
                            {note.content} (Created at: {note.created_at})
                            <button onClick={() => onClickDeleteNote(note.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
