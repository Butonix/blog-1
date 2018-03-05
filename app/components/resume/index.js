/**
 * Created by scriptchao on 2018/3/5.
 */

import React from 'react'
import Bundle from '../../routes/bundle'

const Resume = props => <Bundle {...props} load={() => import('./resume')}/>

export {
    Resume
}
