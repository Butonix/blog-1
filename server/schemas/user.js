/**
 * Created by scriptchao on 2017/11/3.
 */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userType: String, //管理员 、普通用户
    isUsed: {
        type: Boolean,
        default: true
    }
});

export default userSchema

