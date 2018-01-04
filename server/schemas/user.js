/**
 * Created by scriptchao on 2017/11/3.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        userType: {
            type: Number, // 1: 管理员 、2 : 普通用户 、3: 游客
            default: 0
        },
        userId: {
            type: Number,
            default: 0
        },
        isUsed: {
            type: Boolean,
            default: true
        },
        createTime: {
            type: Date,
            default: Date.now
        },
        updateTime: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    }
);

export default userSchema;

