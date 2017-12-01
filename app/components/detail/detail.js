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
import {Dialog} from '../zyc'
import Login from '../common/login'

@inject('UserStore', 'ArticleStore') @observer
export default class Detail extends React.Component {
    @observable prevTitle = {};
    @observable nextTitle = {};
    @observable tipShow;

    constructor(args) {
        super(args);

        this.articleStore = this.props.ArticleStore;
        this.userStore = this.props.UserStore;
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

    handleVote() {
        if (this.userStore.userInfo.userId) {

        } else {
            this.tipShow = true

        }
    }

    handleClose() {
        this.tipShow = false;

    }

    handleLogin(type) {
        this.tipShow = false;
        this.userStore.loginType = type;
        this.userStore.loginShow = true

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
                <div className="detail-vote">
                    <div className="vote" onClick={this.handleVote.bind(this)}>
                        <i className="iconfont icon-dianzan">{null}</i>
                        <span>100</span>
                    </div>
                </div>
                <Dialog
                    show={this.tipShow}
                    header={false}
                    footer={false}
                    onClose={this.handleClose.bind(this)}
                >
                    <div className="dialog-tip">
                        <h2>请登录</h2>
                        <div className="content">
                            <p className="login">
                                <span onClick={this.handleLogin.bind(this, 1)}>账号登录</span>
                            </p>
                            <p>
                                <span className="zyc-link-hover"
                                      onClick={this.handleLogin.bind(this, 0)}>没有账号? 前往注册 »</span>
                            </p>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}
