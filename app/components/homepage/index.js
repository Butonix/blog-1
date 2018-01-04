/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import { Bundle } from '../zyc';

const Homepage = props => <Bundle {...props} load={() => import('./homepage')} />;

export {
    Homepage
};