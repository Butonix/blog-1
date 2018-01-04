/**
 * Created by scriptchao on 2017/10/31.
 */


import React from 'react'
import { Bundle } from '../zyc'

const Header = (props) => <Bundle {...props} load={() => import('./header')} />;
const Main = (props) => <Bundle {...props} load={() => import('./main')} />;
const Footer = (props) => <Bundle {...props} load={() => import('./footer')} />;
const AdminMenu = (props) => <Bundle {...props} load={() => import('./adminMenu')} />;
const AdminContent = (props) => <Bundle {...props} load={() => import('./adminContent')} />;

export {
    Header,
    Main,
    Footer,
    AdminMenu,
    AdminContent,
}
