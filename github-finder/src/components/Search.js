import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Search.css';

const Search = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (username.trim() !== '') {
            try {
                
                const response = await axios.get(`https://api.github.com/users/${username}`);
                if (response.status === 200) {
                    
                    navigate(`/user/${username}`);
                }
            } catch (error) {
                
                setError('No user found.'); 
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="search-container">
            <h1>GitHub User Finder</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {error && <p className="error-message">{error}</p>} 
            </form>
        </div>
    );
};

export default Search;
