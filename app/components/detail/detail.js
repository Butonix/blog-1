/**
 * Created by scriptchao on 2017/10/30.
 */

import React, {Fragment} from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {Modal, Icon, Button} from 'antd'
import splitLocation from '../public/location';
import './detail.sass';
import ArticleDetail from '../common/articleDetail'
import Login from '../login'
import Register from '../register'

@inject('UserStore', 'ArticleStore', 'VoteStore') @observer
export default class Detail extends React.Component {
    @observable prevTitle = {};
    @observable nextTitle = {};
    @observable tipShow;
    @observable isVote;
    @observable voteCount = 0;

    @observable articleData = {};

    @observable isRender;

    @observable loginShow;
    @observable registerShow;

    constructor(args) {
        super(args);

        this.articleStore = this.props.ArticleStore;
        this.userStore = this.props.UserStore;
        this.voteStore = this.props.VoteStore;
    }

    componentWillMount() {
        const { location } = window;
        const { articleId } = splitLocation(location);
        this.articleId = articleId;
    }

    componentDidMount() {
        this.getArticleDetail();
        this.getTitlePrev();
        this.getTitleNext();
        this.getVote();
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
            this.voteStore.postVoteStatus(body)
                .then((response) => {
                    if (response) {
                        this.isVote = response.data.isVote;
                    }
                });
        }
    }

    getArticleDetail() {
        const body = {};
        body.articleId = this.articleId;
        this.articleStore.postArticleUpdateReadCount(body)
            .then((response) => {
                if (response) {
                    this.articleStore.postArticleDetail(body)
                        .then((response1) => {
                            if (response1) {
                                this.articleData = response1.data;
                                this.voteCount = response1.data.voteCount;
                                this.isRender = true;
                            }
                        });
                }
            });
    }


    getTitlePrev() {
        const body = {};
        body.articleId = this.articleId;
        body.prev = true;
        this.articleStore.postArticleDetailTitle(body)
            .then((response) => {
                if (response) {
                    this.prevTitle = response.data;
                }
            });
    }

    getTitleNext() {
        const body = {};
        body.articleId = this.articleId;
        body.next = true;
        this.articleStore.postArticleDetailTitle(body)
            .then((response) => {
                if (response) {
                    this.nextTitle = response.data;
                }
            });
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

            this.voteStore.postVoteUpdate(body);

        } else {
            this.tipShow = true;

        }
    }

    handleClose() {
        this.tipShow = false;
        this.loginShow = false;
        this.registerShow = false;

    }

    handleLogin() {
        this.tipShow = false;
        this.loginShow = true;
    }

    handleRegister() {
        this.tipShow = false;
        this.registerShow = true;
    }

    render() {

        return (
            this.isRender ?
                <div className="detail">
                    <ArticleDetail
                        data={this.articleData}
                    />
                    <div className="detail-title">
                        {
                            this.nextTitle.articleId ?
                                <Link
                                    className="title"
                                    to={`/categories/detail?articleId=${this.nextTitle.articleId}`}>
                                    <span style={{marginRight: 8}}>«</span>
                                    <span className="zyc-text-ellipsis">{`${this.nextTitle.title}`}</span>
                                </Link> :
                                <span>浏览到最前面啦!</span>
                        }
                        {
                            this.prevTitle.articleId ?
                                <Link
                                    className="title"
                                    to={`/categories/detail?articleId=${this.prevTitle.articleId}`}
                                >
                                    <span className="zyc-text-ellipsis">{`${this.prevTitle.title}`}</span>
                                    <span style={{marginLeft: 8}}>»</span>
                                </Link> :
                                <span>浏览到最末尾啦!</span>
                        }
                    </div>
                    <div className="detail-vote">
                        <div className={this.isVote ? 'vote' : null} onClick={this.handleVote.bind(this)}>
                            <Icon type="dianzan" style={{ marginRight: 10 }}/>
                            <span>{this.voteCount}</span>
                        </div>
                    </div>
                    <Modal
                        visible={this.tipShow}
                        header={null}
                        footer={null}
                        closable={null}
                        onCancel={this.handleClose.bind(this)}
                    >
                        <div className="dialog-tip">
                            <h2>请登录</h2>
                            <div className="content">
                                <Button
                                    className="btn"
                                    onClick={this.handleLogin.bind(this)}
                                >
                                    账号登录
                                </Button>
                                <p onClick={this.handleRegister.bind(this)}>
                                    <span className="zyc-link-hover">没有账号? 前往注册 »</span>
                                </p>
                            </div>
                        </div>
                    </Modal>
                    <Login
                        visible={this.loginShow}
                        onCancel={this.handleClose.bind(this)}
                    />
                    <Register
                        visible={this.registerShow}
                        onCancel={this.handleClose.bind(this)}
                    />
                </div> : null
        );
    }
}
