let router = require('express').Router();

//import controllers

let { fetchUser, createUser, loginUser, deleteUser, logOutUser, auth, fetchAllUsers} = require('../Controllers/userControllers');

router.get('/me', fetchUser);
router.get('/', fetchAllUsers);
router.post('/', createUser );
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.post('/me/logout', logOutUser);

module.exports = router;
