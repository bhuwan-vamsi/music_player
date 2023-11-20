import React,{ useState } from 'react';
import '../css/Account.css';

function Account() {

    const user = {
        name: 'George Smith',
        nickname: 'Kitty',
        email: 'george@gmail.com',
        bio: 'I am a Good Boy',
        avatarUrl: 'https://w0.peakpx.com/wallpaper/632/1014/HD-wallpaper-anime-spy-x-family-anya-forger.jpg',
        password: 'goodboy',
        DOB: '16-10-2000',
        gender: 'Male',
    };

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showAccountDetails, setShowAccountDetails] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleItemClick = (item) => {
        if(item==='1') {
            setShowAccountDetails(true);
            setShowChangePassword(false);
            setShowEditProfile(false);
        } else if(item==='2') {
            setShowAccountDetails(false);
            setShowChangePassword(false);
            setShowEditProfile(true);
        } else {
            setShowAccountDetails(false);
            setShowChangePassword(true);
            setShowEditProfile(false);
        }
    };

    const handlePassChange = (e) => {
        const { name, value } = e.target;
        if (name === oldPassword) {
            setOldPassword(value);
        } else if (name === newPassword) {
          setNewPassword(value);
        } else {
          setConfirmPassword(value);
        }
    };
    
    const handlePassSubmit = (e) => {
        e.preventDefault();
        if (oldPassword === user.password) {
            if(newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                //return;
            } else {
                user.password = newPassword;
                alert('Password changed!');
            }
        }
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setEditedUser({ ...editedUser });
        alert('Profile details saved!');
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
                        <h1>Mail: {user.email}</h1>
                        <h1>DOB: {user.DOB}</h1>
                    </div>
                )}

                {showEditProfile && (
                    <form className="editProfileForm" onSubmit={handleProfileSubmit}>
                        <label>Name:</label>
                        <input
                        type="text"
                        name="name"
                        value={editedUser.name}
                        onChange={handleEditInputChange}
                        />
                        <label>Nickname:</label>
                        <input
                        type="text"
                        name="nickname"
                        value={editedUser.nickname}
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
                        <input
                        type="text"
                        name="gender"
                        value={editedUser.gender}
                        onChange={handleEditInputChange}
                        />
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
                        onChange={handlePassChange}/>
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
