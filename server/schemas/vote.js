/**
 * Created by scriptchao on 2017/12/1.
 */
import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
    {
        userId: Number,
        articleId: Number,
        isVote: Boolean,
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

export default voteSchema;
