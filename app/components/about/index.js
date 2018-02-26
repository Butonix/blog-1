/**
 * Created by scriptchao on 2018/2/26.
 */
import React from 'react'
import { Bundle } from '../zyc';

const About = props => <Bundle {...props} load={() => import('./about')} />

export {
    About
}

