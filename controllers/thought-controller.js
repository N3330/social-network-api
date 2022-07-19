const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) { // find all thoughts 
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },//find one thought by id
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
    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },// delete thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },//update thought
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
  
    // add reaction
    addReaction({params, body}, res) {
        // update the thought by adding reaction and deleting reaction just like add friend
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body }},
        { new: true, runValidators: true }
      ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } }},
            { runValidators: true, new: true }
        ).then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    }
  };