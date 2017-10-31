/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {
    Admin,
    AdminManagerArticle,
    AdminManagerTags,
    AdminManagerUser,
    AdminNewArticle
} from '../components/admin'
import {AdminMenu,AdminContent} from '../components/common'
import './routeAdmin.sass'


export default class RouteAdmin extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        return (
            <div className="route-admin" data-flex="dir:left box:first">
                <AdminMenu />
                <AdminContent>
                    <Switch>
                        <Route exact path={url} component={Admin}/>
                        <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                        <Route path={`${url}/managerTags`} component={AdminManagerTags}/>
                        <Route path={`${url}/managerUser`} component={AdminManagerUser}/>
                        <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                        <Redirect to={url}/>
                    </Switch>
                </AdminContent>
            </div>
        )
    }


}