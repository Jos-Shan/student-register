let router = require('express').Router();
//import controllers

let { fetchUser, createUser, updateUser, deleteUser} = require('../Controllers/userControllers');

router.get('/', fetchUser);
router.post('/', createUser );
router.patch('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
