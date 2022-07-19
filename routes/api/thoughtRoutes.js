const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought

} = require('../../controllers/thought-controller');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/users/:userId/friends/:friendsId
// router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);



module.exports = router;