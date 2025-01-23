const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const sentFriendRequestsSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  friendRequests: [
    {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
});

const SentFriendRequestsModel = mongoose.models.SentFriendRequests || mongoose.model('SentFriendRequests', sentFriendRequestsSchema);

export default SentFriendRequestsModel;
