const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
      Thought.findOneAndUpdate(
          {_id: req.params.thoughtId},
          { $set: req.body },
          { runValidators: true, new: true}
      ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },
  
    // add friend
    addReaction(req, res) {
        // update the thought by adding reaction and deleting reaction just like add friend
      
    },
    removeReaction(req, res) {
      
    }
  };