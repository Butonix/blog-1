/**
 * Created by scriptchao on 2017/10/31.
 */

import React from 'react'
import {Bundle} from '../zyc'

const Detail = (props) => <Bundle {...props} load={() => import('./detail')}/>;

export {Detail}
