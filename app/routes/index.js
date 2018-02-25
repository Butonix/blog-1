/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {Route, Switch} from 'react-router-dom';
import RouteVisitor from './routeVisitor';
import RouteAdmin from './routeAdmin';
import {BackTop, Canvas} from '../components/zyc';

@inject('UserStore') @observer
class App extends React.Component {

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    componentWillMount() {

        this.userStore.getUserInfo();
    }


    static componentWillReceiveProps() {

        window.scrollTo(0, 0);
    }

    render() {
        const {userInfo} = this.userStore;

        return (
            <div className="JAVASCRIPT">
                <BackTop visibleHeight={500}/>
                {
                    ['/categories/detail', '/admin/newArticle'].includes(window.location.pathname) ?
                        null : <Canvas />
                }
                {
                    userInfo ?
                        <Switch>
                            {
                                userInfo.userType === 1 || userInfo.userType === 2 ?
                                    <Route path="/admin" render={props => <RouteAdmin
                                        userType={userInfo.userType} {...props} />}/> : null
                            }
                            <Route path="/" component={RouteVisitor}/>
                        </Switch> : null
                }
            </div>
        );
    }
}

export default App;
