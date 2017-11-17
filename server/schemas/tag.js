/**
 * Created by scriptchao on 2017/11/17.
 */

import mongoose from 'mongoose'

export default new mongoose.Schema({
        name: String, //标签名
        createTime: {
            type: Number,
            default: Date.now
        },
        updateTime: {
            type: Number,
            default: Date.now
        }
    }, {
        // timestamps: true
        timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
    }
)