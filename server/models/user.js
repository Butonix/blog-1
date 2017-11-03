/**
 * Created by scriptchao on 2017/11/3.
 */
import mongoose from 'mongoose'
import userSchema from '../schemas/user'

export default mongoose.model('User', userSchema)

