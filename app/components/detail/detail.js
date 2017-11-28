/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {ArticleCell} from '../common/articleList'
import {splitLocation} from '../public/location'
import './detail.sass'

@inject('ArticleStore') @observer
export default class Detail extends React.Component {
    @observable prevTitle = {};
    @observable nextTitle = {};

    constructor(args) {
        super(args);

        this.articleStore = this.props.ArticleStore;
    }

    componentWillMount() {
        let {articleId} = splitLocation(location);
        this.articleId = articleId
    }

    componentDidMount() {
        this.getArticleDetail();
        this.getTitlePrev();
        this.getTitleNext();
    }

    componentWillReceiveProps() {
        let {articleId} = splitLocation(location);
        this.articleId = articleId;
        this.getArticleDetail();
        this.getTitlePrev();
        this.getTitleNext();
    }

    getArticleDetail() {
        let body = {};
        body.articleId = this.articleId;
        this.articleStore.postArticleUpdateReadCount(body).then(response => {
            if (response) {
                this.articleStore.postArticleDetail(body)
            }
        });
    }


    getTitlePrev() {
        let body = {};
        body.articleId = this.articleId;
        body.prev = true;
        this.articleStore.postArticleDetailTitle(body).then(response => {
            if (response) {
                this.prevTitle = response.data
            }
        })
    }

    getTitleNext() {
        let body = {};
        body.articleId = this.articleId;
        body.next = true;
        this.articleStore.postArticleDetailTitle(body).then(response => {
            if (response) {
                this.nextTitle = response.data
            }
        })
    }

    render() {
        let {articleDetail} = this.articleStore;

        return (
            <div className="detail">
                <div className="detail-header">
                    <ArticleCell
                        detail={true}
                        data={articleDetail}
                    />
                </div>
                <div className="detail-content">
                    <div className="markdown-body">
                        {remark().use(reactRenderer).processSync(articleDetail.content).contents}
                    </div>
                </div>
                <div className="detail-title">
                    {
                        this.nextTitle.articleId ?
                            <Link
                                to={`/detail?articleId=${this.nextTitle.articleId}`}>{`« ${this.nextTitle.title}`}</Link>
                            : <span>浏览到最前面啦!</span>
                    }
                    {
                        this.prevTitle.articleId ?
                            <Link
                                to={`/detail?articleId=${this.prevTitle.articleId}`}>{`${this.prevTitle.title} »`}</Link>
                            : <span>浏览到最末尾啦!</span>
                    }
                </div>
            </div>
        )
    }
}
