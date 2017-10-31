/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import '../styles/index.sass'
import RouteAdmin from './routeAdmin'
import RouteVisitor from './routeVisitor'
import {Canvas} from '../components/common'


export default class App extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="JAVASCRIPT">
                <Canvas />
                <Switch>
                    <Route path="/admin" component={RouteAdmin}/>
                    <Route path="/" component={RouteVisitor}/>
                </Switch>
            </div>
        )
    }


}