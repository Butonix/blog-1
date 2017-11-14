/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import '../styles/index.sass'
import RouteAdmin from './routeAdmin'
import RouteVisitor from './routeVisitor'
import {Canvas} from '../components/zyc'

@inject('UserStore') @observer
class App extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore
    }

    componentWillMount() {
        this.userStore.getUserInfo()
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="JAVASCRIPT">
                <Canvas />
                <BrowserRouter>
                    {
                        this.userStore.userInfo ?
                            <Switch>
                                <Route path="/admin" component={RouteAdmin}/>
                                <Route path="/" component={RouteVisitor}/>
                            </Switch> : null
                    }
                </BrowserRouter>
            </div>
        )
    }
}

export default App