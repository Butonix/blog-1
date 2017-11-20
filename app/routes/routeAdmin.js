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
import {AdminMenu,AdminContent} from '../components/common'
import './routeAdmin.sass'

@observer
export default class RouteAdmin extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        console.log('admin',url);

        return (
            <div className="route-admin" data-flex="dir:left box:first">
                <Route path={url} component={AdminMenu} />
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