import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/User.css';
import '../styles/Search.css';

const User = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`https://api.github.com/users/${username}`);
                setUserData(userResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('User not found or an error occurred while fetching data.');
            }

            try {
                const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`);
                setRepositories(reposResponse.data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setError('An error occurred while fetching repositories.');
            }
        };

        fetchData();
    }, [username]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="user-container">
            {userData && (
                <div className="user-info">
                    <h2>Public info about the user</h2>
                    <div className="user-profile">
                        <img src={userData.avatar_url} alt="User avatar" className="user-avatar" />
                        <div className="user-details">
                            <h3>{userData.name ? userData.name : 'Name not available'}</h3>
                            <div className="user-stats">
                                <p><strong>Repositories:</strong> {userData.public_repos}</p>
                                <p><strong>Followers:</strong> {userData.followers}</p>
                                <p><strong>Following:</strong> {userData.following}</p>
                            </div>
                        </div>
                    </div>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="github-button">
                        Go to GitHub
                    </a>
                    
                    <p>Link to user's GitHub</p>
                </div>
            )}
            <div className="my-repositories-container">
                <h2>My Repositories</h2>
                {repositories.map(repo => (
                    <div key={repo.id} className="repo-container">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                        <span>Updated at {new Date(repo.updated_at).toLocaleDateString()}</span>
                        <p>{repo.description || ''}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default User;
