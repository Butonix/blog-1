/**
 * Created by scriptchao on 2017/10/31.
 */


import React from 'react';
import { Bundle } from '../zyc';

const GlobalHeader = props => <Bundle {...props} load={() => import('./header')} />;
const GlobalFooter = props => <Bundle {...props} load={() => import('./footer')} />;
const AdminMenu = props => <Bundle {...props} load={() => import('./adminMenu')} />;
const AdminContent = props => <Bundle {...props} load={() => import('./adminContent')} />;

export {
    GlobalHeader,
    GlobalFooter,
    AdminMenu,
    AdminContent,
};
