const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  deleteUser,
  updateUser,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;
