/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import './homepage.sass'

@inject('ArticleStore') @observer
export default class Homepage extends React.Component {

    constructor(args) {
        super(args);
        this.articleStore = this.props.ArticleStore;

    }

    componentDidMount() {
        // console.log(this.props.history)
    }

    render() {
        return (
            <div className="homepage">
                homepage
            </div>
        )
    }
}