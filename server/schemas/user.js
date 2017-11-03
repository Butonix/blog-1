/**
 * Created by scriptchao on 2017/11/3.
 */
import mongoose from 'mongoose'

export default new mongoose.Schema({
    username: String,
    password: String,
    type: String //管理员 、普通用户
})

