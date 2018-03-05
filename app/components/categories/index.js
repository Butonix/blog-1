/**
 * Created by scriptchao on 2017/10/31.
 */
import React from 'react';
import Bundle from '../../routes/bundle'


const Categories = props => <Bundle {...props} load={() => import('./categories')} />;
const CategoriesTag = props => <Bundle {...props} load={() => import('./categoriesTag')} />;

export { Categories, CategoriesTag };
