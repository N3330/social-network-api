const { User, Thought } = require("../models/");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId})
      .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({msg: "no user with that ID"})
        } return Thought.deleteMany({_id: {$in: dbUserData.thoughts}})
      }
        
      ).then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        { $set: req.body },
        { runValidators: true, new: true}
    ).then((dbUserData) =>
    !dbUserData
      ? res.status(404).json({ message: "No user with that ID" })
      : res.json(dbUserData)
  )
  .catch((err) => res.status(500).json(err));
  },

  // add friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: {friends: req.params.friendId}},
        { new: true }
    ).then((dbUserData) =>
    !dbUserData
      ? res.status(404).json({ message: "No user with that ID" })
      : res.json(dbUserData)
  )
  .catch((err) => res.status(500).json(err));
  }
};
