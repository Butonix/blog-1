/**
 * Created by scriptchao on 2017/11/28.
 */
import mongoose from 'mongoose';
import idSchema from '../schemas/id';

const Id = mongoose.model('Id', idSchema);
Id.create({ _id: 'articleId', seq: 1 });
Id.create({ _id: 'userId', seq: 1 });
Id.create({ _id: 'tagId', seq: 1 });

export default Id;