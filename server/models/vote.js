/**
 * Created by scriptchao on 2017/12/1.
 */

import mongoose from 'mongoose'
import voteSchema from '../schemas/vote'

const Vote = mongoose.model('Vote', voteSchema);

export default Vote

