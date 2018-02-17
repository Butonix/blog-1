/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Row, Col, List, Avatar, Tag, Icon} from 'antd'
import './homepage.sass';
import {getScrollHeight, getScrollXY, getWindowHeight} from '../public/window';
import ArticleList from '../common/articleList';
import HomeCustom from '../common/homeCustom'


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
        this.articleStore.initStore();
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
                this.content = this.content.concat(response.data.list);
            }
        });
    }

    scroll() {
        const data = getScrollXY();
        if (data.type === 'y') {

            if (getScrollHeight() === data.distance + getWindowHeight()) {

                this.page++;
                this.getArticleList();
            }
        }
    }

    render() {
        return (
            <div className="homepage">
                <Row>
                    <Col
                        md={15}
                        xs={24}
                    >
                        <ArticleList
                            content={this.content}
                        />
                    </Col>
                    <Col
                        md={{span: 8, offset: 1}}
                        xs={0}
                    >
                        <HomeCustom/>
                    </Col>
                    <Col
                        md={0}
                        xs={24}
                        style={{marginTop: 20}}
                    >
                        <HomeCustom/>
                    </Col>
                </Row>
            </div>
        );
    }
}
