/**
 * Created by scriptchao on 2018/1/22.
 */

import React from 'react';
import { Bundle } from '../zyc'

const Test = props => <Bundle {...props} load={() => import('./test')} />;

export {
    Test
}
