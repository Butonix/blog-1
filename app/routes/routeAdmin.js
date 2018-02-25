/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd'
import {
    Admin,
    AdminManagerArticle,
    AdminManagerTags,
    AdminManagerUser,
    AdminNewArticle,
} from '../components/admin';
import {AdminMenu} from '../components/common';
import DrawerMenu from '../components/common/drawerMenu'
import './routeAdmin.sass';

const {Sider, Content} = Layout;

@observer
export default class RouteAdmin extends React.Component {

    render() {
        const {url} = this.props.match;

        console.log('admin', url);

        return (
            <Layout className="route-admin">
                {
                    this.props.isMobile ?
                        <DrawerMenu
                            width={200}
                        >
                            <AdminMenu/>
                        </DrawerMenu> :
                        <Sider className="route-admin-sider">
                            <AdminMenu/>
                        </Sider>
                }
                <Content className="route-admin-content">
                    <Switch>
                        <Route exact path={url} component={Admin}/>
                        {
                            this.props.userType === 1 ?
                                <Route path={`${url}/managerUser`} component={AdminManagerUser}/> : null
                        }
                        <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                        {
                            this.props.userType === 1 ?
                                <Route path={`${url}/managerTags`} component={AdminManagerTags}/> : null
                        }
                        <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                        <Redirect to={url}/>
                    </Switch>
                </Content>
            </Layout>
        );
    }


}