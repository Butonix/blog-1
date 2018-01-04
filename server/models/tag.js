/**
 * Created by scriptchao on 2017/11/17.
 */
import mongoose from 'mongoose';
import tagSchemas from '../schemas/tag';

export default mongoose.model('Tag', tagSchemas);
