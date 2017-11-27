/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {ArticleCell} from '../common/articleList'
import {splitLocation} from '../public/location'

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
        body.id = this.articleId;
        this.articleStore.postArticleDetail(body)
    }

    render() {
        let {articleDetail} = this.articleStore;

        return (
            <div className="detail">
                <ArticleCell
                    detail={true}
                    data={articleDetail}
                />
            </div>
        )
    }
}
