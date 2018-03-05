/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import Bundle from '../../routes/bundle'

const Admin = props => <Bundle {...props} load={() => import('./admin')} />;
const AdminManagerArticle = props => <Bundle {...props} load={() => import('./adminManagerArticle')} />;
const AdminManagerTags = props => <Bundle {...props} load={() => import('./adminManagerTags')} />;
const AdminManagerUser = props => <Bundle {...props} load={() => import('./adminManagerUser')} />;
const AdminNewArticle = props => <Bundle {...props} load={() => import('./adminNewArticle')} />;

export {
    Admin,
    AdminManagerArticle,
    AdminManagerTags,
    AdminManagerUser,
    AdminNewArticle
};
