/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Pagination } from 'antd';
import dateFormat from 'dateformat';
import './adminManagerArticle.sass';
import { Button } from '../zyc';
import history from '../../history';
import DialogDelete from '../common/dialogDelete'

@inject('ArticleStore') @observer
export default class AdminManagerArticle extends React.Component {
    @observable page = 1;
    @observable size = 5;

    @observable deleteShow;

    constructor(args) {
        super(args);
        this.articleStore = this.props.ArticleStore;
    }

    componentDidMount() {
        this.getArticleList();
    }

    getArticleList() {

        const body = {};
        body.page = this.page;
        body.size = this.size;
        body.author = true;
        this.articleStore.postArticleList(body);
    }

    handlePageChange(current) {
        this.page = current;
        this.getArticleList();

    }

    handleDelete(articleId) {
        this.articleId = articleId;
        this.deleteShow = true;

    }

    handleDeleteSure = () => {

        const body = {};
        body.articleId = this.articleId;
        this.articleStore.postArticleDelete(body)
            .then((response) => {
                if (response) {
                    this.deleteShow = false;
                    this.getArticleList();
                }
            });
    };


    handleClose = () => {
        this.deleteShow = false
    };

    handlePublish(articleId, isPublish) {
        const body = {};
        body.articleId = articleId;
        body.isPublish = isPublish;
        this.articleStore.postArticleUpdate(body)
            .then((response) => {
                if (response) {
                    this.getArticleList();
                }
            });
    }

    render() {
        const { articleList, articleCount } = this.articleStore;
        return (
            <div className="admin-managerArticle">
                <h2>文章管理</h2>
                <section>
                    {
                        articleList.map((item, index) =>
                            <ArticleCell
                                data={item}
                                key={item.articleId}
                                onDelete={this.handleDelete.bind(this)}
                                onPublish={this.handlePublish.bind(this)}
                            />)
                    }
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={articleCount}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
                <DialogDelete
                    show={this.deleteShow}
                    onOk={this.handleDeleteSure}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

class ArticleCell extends React.Component {

    render() {
        const { data } = this.props;

        return (
            <div className="article-cell">
                <div className="aboutArticle">
                    <p className="title">{data.title}</p>
                    <p className="info">
                        <span className="zyc-area-line">
                            <i className="iconfont icon-riqi">{null}</i>
                            <span className="tip">创作时间</span>
                            <span>{dateFormat(data.createTime, 'yyyy-mm-dd HH:MM:ss')}</span>
                        </span>
                        <span className="zyc-area-line">
                            <i className="iconfont icon-zuozhe">{null}</i>
                            <span className="tip">作者</span>
                            <span>{data.author}</span>
                        </span>
                        <span className="zyc-area-line">
                            <i className="iconfont icon-yuedu">{null}</i>
                            <span className="tip">阅读数</span>
                            <span>{data.readCount}</span>
                        </span>
                        <span>
                            <i className="iconfont icon-dianzanshu">{null}</i>
                            <span className="tip">点赞数</span>
                            <span>{data.voteCount}</span>
                        </span>
                    </p>
                </div>
                <div className="state">
                    {
                        data.isPublish ?
                            <span className="zyc-text-green">已发布</span> :
                            <span>草稿</span>
                    }
                </div>
                <div className="operation">
                    <Button
                        className="btn"
                        onClick={() => {
                            history.push(`/admin/newArticle?articleId=${data.articleId}`);
                        }}>编辑</Button>
                    <Button
                        className="btn"
                        onClick={() => {
                            this.props.onDelete(data.articleId);
                        }}>删除</Button>
                    {
                        data.isPublish ?
                            <Button
                                className="btn"
                                onClick={() => {
                                    this.props.onPublish(data.articleId, false);
                                }}>撤回</Button> :
                            <Button
                                className="btn"
                                onClick={() => {
                                    this.props.onPublish(data.articleId, true);
                                }}>发布</Button>
                    }
                </div>
            </div>

        );
    }
}
