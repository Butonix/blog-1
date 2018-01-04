/**
 * Created by scriptchao on 2017/11/13.
 */

import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
    {
        title: String, // 文章标题
        content: String, // 文章内容
        readCount: {
            type: Number,
            default: 0 // 阅读次数
        },
        voteCount: {
            type: Number,
            default: 0
        },
        author: String, // 作者
        tags: Array, // 类型
        isPublish: Boolean, // 是否发布
        articleId: { // 文章id
            type: Number,
            default: 0,
            index: true
        },
        createTime: {
            type: Date,
            default: Date.now // 创建时间
        },
        updateTime: {
            type: Date,
            default: Date.now // 更新时间
        }
    },
    {
        timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    }
);

export default articleSchema;
