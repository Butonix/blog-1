/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import '../styles/index.sass'
import routes from './routes'


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
                    {
                        routes.map((route) =>
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                            />
                        )
                    }
                    <Redirect to="/"/>
                </Switch>
            </div>
        )
    }


}