const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const friendsSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  friends: [
    {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
});

const FriendsModel = mongoose.models.Friends || mongoose.model('Friends', friendsSchema);

export default FriendsModel;
