const express = require('express');
const { registerUser, signInUser, changeUsername, updateUserDetails, changePassword, forgotPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signInUser);
router.post('/change-username', changeUsername);
router.post('/update-user-details', updateUserDetails);
router.post('/change-password', changePassword);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
