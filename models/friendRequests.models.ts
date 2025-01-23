const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const friendRequestsSchema = new Schema({
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

const FriendRequestsModel = mongoose.models.FriendRequests || mongoose.model('FriendRequests', friendRequestsSchema);

export default FriendRequestsModel;
