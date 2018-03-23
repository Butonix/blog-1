/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd'
import {GlobalHeader, GlobalFooter} from '../components/common';
import {Homepage} from '../components/homepage';
import {Categories, CategoriesTag} from '../components/categories';
import {Detail} from '../components/detail';
import {About} from '../components/about'
import {Resume} from '../components/resume'
import './routeVisitor.sass'

const { Header, Content, Footer } = Layout;

@observer
export default class RouteVisitor extends React.Component {

    render() {
        const { url } = this.props.match;

        console.log('visitor', url);

        return (
            <Layout className="route-visitor">
                <Header className="route-header">
                    <GlobalHeader/>
                </Header>
                <Content className="route-content">
                    <Switch>
                        <Route exact path={url} component={Homepage}/>
                        <Route exact path="/categories" component={Categories}/>
                        <Route path="/categories/detail" component={Detail}/>
                        <Route path="/categories/:tag" component={CategoriesTag}/>
                        <Route path="/about" component={About}/>
                        <Route path="/resume" render={props =>
                            <Resume
                                userType={this.props.userType}
                                {...props}
                            />}
                        />
                        <Redirect to={url}/>
                    </Switch>
                </Content>
                <Footer className="route-footer">
                    <GlobalFooter/>
                </Footer>
            </Layout>
        );
    }
}
