import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    _id: {type: String, required: true},
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    imageUrl : {type: String, required: true},
    cartItems: {type: Object, default: {}},
}, {minimize: false})


const UserModel = models.user || model('user', userSchema);

export default UserModel;