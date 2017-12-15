/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {
    Admin,
    AdminManagerArticle,
    AdminManagerTags,
    AdminManagerUser,
    AdminNewArticle
} from '../components/admin'
import {AdminMenu, AdminContent} from '../components/common'
import './routeAdmin.sass'
import {Canvas} from '../components/zyc'

@inject('UserStore') @observer
export default class RouteAdmin extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;

    }

    componentWillReceiveProps() {
        window.scrollTo(0, 0)
    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;
        const {userInfo} = this.userStore;

        console.log('admin', url);

        return (
            <div className="route-admin">
                {this.props.location.pathname == '/admin/newArticle' ? null : <Canvas />}
                <Route path={url} component={AdminMenu}/>
                <AdminContent>
                    <Switch>
                        <Route exact path={url} component={Admin}/>
                        {
                            userInfo.userType == 1 ?
                                <Route path={`${url}/managerUser`} component={AdminManagerUser}/> : null
                        }
                        <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                        {
                            userInfo.userType == 1 ?
                                <Route path={`${url}/managerTags`} component={AdminManagerTags}/> : null
                        }
                        <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                        <Redirect to={url}/>
                    </Switch>
                </AdminContent>
            </div>
        )
    }


}