/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import './homepage.sass';
import ArticleList from '../common/articleList';
import { getScrollHeight, getScrollTop, getWindowHeight } from '../public/window';

@inject('ArticleStore') @observer
export default class Homepage extends React.Component {
    @observable page = 1;
    @observable size = 10;
    @observable content = [];

    constructor(args) {
        super(args);
        this.articleStore = this.props.ArticleStore;

        this.scroll = this.scroll.bind(this);
    }

    componentWillMount() {
        window.addEventListener('scroll', this.scroll);
    }

    componentDidMount() {
        this.getArticleList();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
    }

    getArticleList() {
        const body = {};
        body.isPublish = true;
        body.page = this.page;
        body.size = this.size;

        this.articleStore.postArticleList(body).then((response) => {
            if (response) {
                this.content = this.content.concat(this.articleStore.articleList);
            }
        });
    }

    scroll() {

        if (getScrollHeight() == getScrollTop() + getWindowHeight()) {
            this.page++;
            this.getArticleList();
        }
    }

    render() {
        return (
            <div className="homepage">
                <ArticleList
                    data={this.content}
                />
            </div>
        );
    }
}