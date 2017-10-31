/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Header, Main, Footer} from '../components/common'
import {Homepage} from '../components/homepage'
import {Categories, CategoriesTag} from '../components/categories'
import {Detail} from '../components/detail'


export default class RouteVisitor extends React.Component {

    constructor(args) {
        super(args)

    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        return (
            <div className="route-visitor">
                <Header />
                <Main>
                    <Switch>
                        <Route exact path={url} component={Homepage}/>
                        <Route exact path="/categories" component={Categories}/>
                        <Route path={`/categories/:tag`} component={CategoriesTag}/>
                        <Route path={`/detail/:id`} component={Detail}/>
                        <Redirect to={url}/>
                    </Switch>
                </Main>
                <Footer />
            </div>
        )
    }


}