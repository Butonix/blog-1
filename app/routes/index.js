/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import '../styles/index.sass'
import RouteAdmin from './routeAdmin'
import RouteVisitor from './routeVisitor'
import { BackTop, Canvas } from '../components/zyc'

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

    componentWillReceiveProps() {

        window.scrollTo(0, 0)
    }

    render() {
        const { userInfo } = this.userStore;

        return (
            <div className="JAVASCRIPT">
                <BackTop visibleHeight={500} />
                {this.props.location.pathname == '/detail' || this.props.location.pathname == '/admin/newArticle' ? null : <Canvas />}
                {
                    userInfo ?
                        <Switch>
                            {
                                userInfo.userType == 1 || userInfo.userType == 2 ?
                                    <Route path="/admin" render={(props) => <RouteAdmin userType={userInfo.userType} {...props} />} /> : null
                            }
                            <Route path="/" component={RouteVisitor} />
                        </Switch> : null
                }
            </div>
        )
    }
}

export default App