/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Header, Main, Footer} from '../components/common'
import {Homepage} from '../components/homepage'
import {Categories, CategoriesTag} from '../components/categories'
import {Detail} from '../components/detail'
import {Canvas} from '../components/zyc'

@observer
export default class RouteVisitor extends React.Component {

    constructor(args) {
        super(args)

    }

    componentWillReceiveProps() {
        window.scrollTo(0, 0)
    }

    componentDidMount() {

    }

    render() {
        const {url} = this.props.match;

        console.log('visitor', url);

        return (
            <div className="route-visitor">
                {this.props.location.pathname == '/detail' ? null : <Canvas />}
                <Route path={url} component={Header}/>
                <Main>
                    <Switch>
                        <Route exact path={url} component={Homepage}/>
                        <Route exact path="/categories" component={Categories}/>
                        <Route path={`/categories/:tag`} component={CategoriesTag}/>
                        <Route path={`/detail`} component={Detail}/>
                        <Redirect to={url}/>
                    </Switch>
                </Main>
                <Route path={url} component={Footer}/>
            </div>
        )
    }


}