const express = require("express");
const { isLoggedIn, notLogged } = require('../app/middlewares/auth')

const {
  createUserTable,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  logIn,

} = require("../app/controllers/user");

const router = express.Router();

router.get('/init', createUserTable)
router.get('/', isLoggedIn, getUsers)
router.post('/login', logIn)
router.get('/:id', isLoggedIn, getUserById)
router.post('/', createUser)
router.put('/:id', isLoggedIn, updateUser)
router.delete('/:id', isLoggedIn, deleteUser)

module.exports = router;
