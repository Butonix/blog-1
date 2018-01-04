/**
 * Created by scriptchao on 2017/11/28.
 */
import mongoose from 'mongoose';

const idSchema = new mongoose.Schema({
    _id: String,
    seq: {
        type: Number,
        default: 0
    }
});

export default idSchema;
