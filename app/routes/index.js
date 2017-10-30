/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import '../styles/index.sass'
import Admin from './admin'
import Visitor from './visitor'


export default class App extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="JAVASCRIPT">
                <Switch>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/" component={Visitor}/>
                </Switch>
            </div>
        )
    }


}