import React, { useState } from 'react';
import '../css/Account.css';

function Account() {
    const user = {
        name: localStorage.getItem('name'),
        nickname: localStorage.getItem('nickname') || '',
        email: localStorage.getItem('email'),
        bio: localStorage.getItem('bio') || '',
        DOB: localStorage.getItem('DOB') || '',
        gender: localStorage.getItem('gender') || '',
    };

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showAccountDetails, setShowAccountDetails] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [newUsername, setNewUsername] = useState('');
    const [clearLikes, setClearLikes] = useState(false);
    const [clearRatings, setClearRatings] = useState(false);
    const [clearPlaylists, setClearPlaylists] = useState(false);

    const handleItemClick = (item) => {
        setShowChangePassword(false);
        setShowAccountDetails(false);
        setShowEditProfile(false);

        if (item === '1') {
            setShowAccountDetails(true);
        } else if (item === '2') {
            setShowEditProfile(true);
        } else {
            setShowChangePassword(true);
        }
    };

    const handleChangeUsername = () => {
        const updatedUser = { ...user, name: newUsername };
        fetch('http://localhost:5000/change-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, newUsername: newUsername }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('name', newUsername);
                setEditedUser(updatedUser);
                alert('Username changed successfully!');
            } else {
                alert('Failed to change username. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('nickname',editedUser.nickname);
        formData.append('bio', editedUser.bio);
        formData.append('gender', editedUser.gender);
        formData.append('clearLikes', clearLikes);
        formData.append('clearRatings', clearRatings);
        formData.append('clearPlaylists', clearPlaylists);
        formData.append('DOB', editedUser.DOB);
        
        fetch('http://localhost:5000/update-user-details', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User details updated successfully!');
                localStorage.setItem('nickname', editedUser.nickname);
                localStorage.setItem('bio', editedUser.bio);
                localStorage.setItem('gender', editedUser.gender);
                localStorage.setItem('DOB', editedUser.DOB);
            } else {
                alert('Failed to update user details. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    };
    
    const handlePassChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else {
            setConfirmPassword(value);
        }
    };

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        // Make a request to the server to change the password
        fetch('http://localhost:5000/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password changed successfully!');
            } else {
                alert('Failed to change password. Please check your old password.');
            }
        })
        .catch(error => console.error('Error:', error));
    
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    return (
        <div>
            <div className="sideMenu">
                <ul>
                    <li onClick={() => handleItemClick('1')}>Account Details</li>
                    <li onClick={() => handleItemClick('2')}>Edit Profile</li>
                    <li onClick={() => handleItemClick('3')}>Change Password</li>
                </ul>
            </div>
            <div className="mainContent">
                {showAccountDetails && (
                    <div>
                        <h1>UserName: {user.name}</h1>
                        <h1>Email: {user.email}</h1>
                        <label>New Username:</label>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <button onClick={handleChangeUsername}>Change Username</button>
                    </div>
                )}

                {showEditProfile && (
                    <form className="editProfileForm" onSubmit={handleProfileSubmit}>
                        <label>Nickname:</label>
                        <input
                            type="text"
                            name="nickname"
                            value={editedUser.nickname}
                            onChange={handleEditInputChange}
                        />
                        <label>Bio:</label>
                        <textarea
                            name="bio"
                            value={editedUser.bio}
                            onChange={handleEditInputChange}
                        />
                        <label>DOB:</label>
                        <input
                            type="text"
                            name="DOB"
                            value={editedUser.DOB}
                            onChange={handleEditInputChange}
                        />
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={editedUser.gender}
                            onChange={handleEditInputChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div>
                            <label>Clear Likes:</label>
                            <input
                                type="checkbox"
                                checked={clearLikes}
                                onChange={() => setClearLikes(!clearLikes)}
                            />
                        </div>
                        <div>
                            <label>Clear Ratings:</label>
                            <input
                                type="checkbox"
                                checked={clearRatings}
                                onChange={() => setClearRatings(!clearRatings)}
                            />
                        </div>
                        <div>
                            <label>Clear Playlists:</label>
                            <input
                                type="checkbox"
                                checked={clearPlaylists}
                                onChange={() => setClearPlaylists(!clearPlaylists)}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}


                {showChangePassword && (
                    <form className="changePasswordForm" onSubmit={handlePassSubmit}>
                        <label>Old Password:</label>
                        <input 
                            type="password" 
                            name="oldPassword" 
                            value={oldPassword}
                            onChange={handlePassChange}
                        />
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handlePassChange}
                        />
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handlePassChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Account;
