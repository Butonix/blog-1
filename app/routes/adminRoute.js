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


export default class AdminRoute extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        return (
            <div className="ADMIN">
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