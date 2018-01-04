/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Header, Main, Footer } from '../components/common'
import { Homepage } from '../components/homepage'
import { Categories, CategoriesTag } from '../components/categories'
import { Detail } from '../components/detail'

@observer
export default class RouteVisitor extends React.Component {

    componentDidMount() {

    }

    render() {
        const { url } = this.props.match;

        console.log('visitor', url);

        return (
            <div className="route-visitor">
                <Route path={url} component={Header} />
                <Main>
                    <Switch>
                        <Route exact path={url} component={Homepage} />
                        <Route exact path="/categories" component={Categories} />
                        <Route path="/categories/:tag" component={CategoriesTag} />
                        <Route path="/detail" component={Detail} />
                        <Redirect to={url} />
                    </Switch>
                </Main>
                <Route path={url} component={Footer} />
            </div>
        )
    }


}