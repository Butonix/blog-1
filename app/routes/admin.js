/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {
    Index,
    ManagerArticle,
    ManagerTags,
    ManagerUser,
    NewArticle
} from '../components/admin/route'


export default class Admin extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        return (
            <div>
                <Switch>
                    <Route exact path={url} component={Index}/>
                    <Route path={`${url}/managerArticle`} component={ManagerArticle}/>
                    <Route path={`${url}/managerTags`} component={ManagerTags}/>
                    <Route path={`${url}/managerUser`} component={ManagerUser}/>
                    <Route path={`${url}/newArticle`} component={NewArticle}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }


}