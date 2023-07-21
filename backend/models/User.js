const moongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const { Schema } = moongoose;


const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    },
    passwordverificationtoken: {
        type: String,
        default: "a"
    },
    date:{
        type: Date,
        default: Date.now
    },
})

// UserSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ id: this.id }, process.env.JWTPRIVATEKEY, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

module.exports = moongoose.model('user', UserSchema);