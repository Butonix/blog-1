/**
 * Created by scriptchao on 2017/11/13.
 */

import mongoose from 'mongoose'
import articleSchema from '../schemas/article'

export default mongoose.model('Article', articleSchema)
