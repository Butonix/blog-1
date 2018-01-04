/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { ArticleCell } from '../common/articleList'
import splitLocation from '../public/location'
import './detail.sass'
import { Dialog } from '../zyc'

@inject('UserStore', 'ArticleStore', 'VoteStore') @observer
export default class Detail extends React.Component {
    @observable prevTitle = {};
    @observable nextTitle = {};
    @observable tipShow;
    @observable isVote;
    @observable voteCount = 0;

    @observable isRender;

    constructor(args) {
        super(args);

        this.articleStore = this.props.ArticleStore;
        this.userStore = this.props.UserStore;
        this.voteStore = this.props.VoteStore;
    }

    componentWillMount() {
        const { location } = window;
        const { articleId } = splitLocation(location);
        this.articleId = articleId
    }

    componentDidMount() {
        this.getArticleDetail();
        this.getTitlePrev();
        this.getTitleNext();
        this.getVote()
    }

    componentWillReceiveProps() {
        this.isRender = false;
        const { location } = window;
        const { articleId } = splitLocation(location);
        this.articleId = articleId;
        this.getArticleDetail();
        this.getTitlePrev();
        this.getTitleNext();
        this.getVote(); // 样式状态
    }


    getVote() {
        if (this.userStore.userInfo.userId) {
            const body = {};
            body.articleId = this.articleId;
            body.userId = this.userStore.userInfo.userId;
            this.voteStore.postVoteStatus(body).then(response => {
                if (response) {
                    this.isVote = response.data.isVote;
                }
            })
        }
    }

    getArticleDetail() {
        const body = {};
        body.articleId = this.articleId;
        this.articleStore.postArticleUpdateReadCount(body).then(response => {
            if (response) {
                this.articleStore.postArticleDetail(body).then(response1 => {
                    if (response1) {
                        this.voteCount = response1.data.voteCount;
                        this.isRender = true
                    }
                })
            }
        });
    }


    getTitlePrev() {
        const body = {};
        body.articleId = this.articleId;
        body.prev = true;
        this.articleStore.postArticleDetailTitle(body).then(response => {
            if (response) {
                this.prevTitle = response.data
            }
        })
    }

    getTitleNext() {
        const body = {};
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

            if (this.isVote) { // 本地模拟点赞 防止获取重复数据
                this.voteCount--;
                this.isVote = !this.isVote;
            } else {
                this.voteCount++;
                this.isVote = !this.isVote;
            }

            const body = {};
            body.userId = this.userStore.userInfo.userId;
            body.articleId = this.articleId;
            body.isVote = this.isVote;

            this.voteStore.postVoteUpdate(body)

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
        const { articleDetail } = this.articleStore;

        return (
            this.isRender ?
                <div className="detail">
                    <div className="detail-header">
                        <ArticleCell
                            detail
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
                                <Link to={`/detail?articleId=${this.nextTitle.articleId}`}>{`« ${this.nextTitle.title}`}</Link> : <span>浏览到最前面啦!</span>
                        }
                        {
                            this.prevTitle.articleId ?
                                <Link to={`/detail?articleId=${this.prevTitle.articleId}`}>{`${this.prevTitle.title} »`}</Link> : <span>浏览到最末尾啦!</span>
                        }
                    </div>
                    <div className="detail-vote">
                        <div className={this.isVote ? 'vote' : null} onClick={this.handleVote.bind(this)}>
                            <i className="iconfont icon-dianzan">{null}</i>
                            <span>{this.voteCount}</span>
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
                                <p className="login" onClick={this.handleLogin.bind(this, 1)}>
                                    <span>账号登录</span>
                                </p>
                                <p onClick={this.handleLogin.bind(this, 0)}>
                                    <span className="zyc-link-hover">没有账号? 前往注册 »</span>
                                </p>
                            </div>
                        </div>
                    </Dialog>
                </div> : null
        )
    }
}
