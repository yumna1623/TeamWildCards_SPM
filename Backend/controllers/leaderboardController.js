// controllers/leaderboardController.js
const Task = require('../models/Task');
const User = require('../models/User');

exports.teamLeaderboard = async (req, res) => {
  const { teamId } = req.params;
  const list = await Task.aggregate([
    { $match: { team: mongoose.Types.ObjectId(teamId), status: 'Done' } },
    { $group: { _id: '$assignedTo', completed: { $sum: 1 } } },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { _id: 0, userId: '$_id', name: '$user.name', completed: 1 } },
    { $sort: { completed: -1 } },
    { $limit: 10 }
  ]);
  res.json(list);
};
