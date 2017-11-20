/**
 * Created by scriptchao on 2017/11/13.
 */

import mongoose from 'mongoose'

export default new mongoose.Schema({
    title: String,//文章标题
    content: String,//文章内容
    readCount: Number,//阅读次数
    author: String,//作者
    tags: Array,//类型
    isPublish: Boolean,//是否发布
    createTime: {
        type: Number,
        default: Date.now // 创建时间
    },
    updateTime: {
        type: Number,
        default: Date.now // 更新时间
    }
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})
