/**
 * Created by scriptchao on 2017/11/17.
 */

import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
        name: String, //标签名
        tagId: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        createTime: {
            type: Date,
            default: Date.now
        },
        updateTime: {
            type: Date,
            default: Date.now
        }
    }, {
        // timestamps: true
        timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
    }
);

export default tagSchema