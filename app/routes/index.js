/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import '../styles/index.sass'
import RouteAdmin from './routeAdmin'
import RouteVisitor from './routeVisitor'
import {Canvas, BackTop} from '../components/zyc'

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
        let {userInfo} = this.userStore;

        return (
            <div className="JAVASCRIPT">
                <Canvas />
                <BackTop
                    visibleHeight={500}
                />
                <BrowserRouter>
                    {
                        userInfo ?
                            <Switch>
                                {
                                    userInfo.userType == 1 || userInfo.userType == 2 ?
                                        <Route path="/admin" component={RouteAdmin}/> : null
                                }
                                <Route path="/" component={RouteVisitor}/>
                            </Switch> : null
                    }
                </BrowserRouter>
            </div>
        )
    }
}

export default App