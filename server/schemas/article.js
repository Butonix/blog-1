/**
 * Created by scriptchao on 2017/11/13.
 */

import mongoose from 'mongoose'

export default new mongoose.Schema({
    title: String,//文章标题
    content: String,//文章内容
    readCount: Number,//阅读次数
    time: String,//发布时间
    author: String,//作者
    tags: Array,//类型
    isPublish: Boolean,//是否发布
})
