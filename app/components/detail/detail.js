/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {ArticleCell} from '../common/articleList'
import {splitLocation} from '../public/location'
import './detail.sass'

@inject('ArticleStore') @observer
export default class Detail extends React.Component {
    constructor(args) {
        super(args);

        this.articleStore = this.props.ArticleStore;
    }

    componentWillMount() {
        let {articleId} = splitLocation(location);
        this.articleId = articleId
    }

    componentDidMount() {
        let body = {};
        body.articleId = this.articleId;
        this.articleStore.postArticleUpdateReadCount(body).then(response => {
            if (response) {
                this.articleStore.postArticleDetail(body)
            }
        })

    }

    render() {
        let {articleDetail} = this.articleStore;

        return (
            <div className="detail">
                <div className="detail-title">
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
            </div>
        )
    }
}
