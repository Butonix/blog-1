/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Pagination} from 'antd';
import './adminManagerArticle.sass';
import history from '../../history';
import ArticleManagerList from '../common/articleManagerList'

@inject('ArticleStore') @observer
export default class AdminManagerArticle extends React.Component {
    @observable page = 1;
    @observable size = 5;
    @observable list = [];
    @observable total;

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
        this.articleStore.postArticleList(body)
            .then((response) => {
                if (response) {
                    this.list = response.data.list;
                    this.total = response.data.total;
                }
            })
    }

    handlePageChange(current) {
        this.page = current;
        this.getArticleList();

    }

    handleDeleteSure = (articleId) => {

        const body = {};
        body.articleId = articleId;
        this.articleStore.postArticleDelete(body)
            .then((response) => {
                if (response) {
                    this.getArticleList();
                }
            });

    };


    handlePublish = (articleId, isPublish) => {
        const body = {};
        body.articleId = articleId;
        body.isPublish = isPublish;
        this.articleStore.postArticleUpdate(body)
            .then((response) => {
                if (response) {
                    this.getArticleList();
                }
            });
    };

    handleEdit = (articleId) => {
        history.push(`/admin/newArticle?articleId=${articleId}`);
    };

    render() {
        return (
            <div className="admin-managerArticle">
                <h2>文章管理</h2>
                <section>
                    <ArticleManagerList
                        content={this.list}
                        onEdit={this.handleEdit}
                        onDelete={this.handleDeleteSure}
                        onPublish={this.handlePublish}
                    />
                </section>
                {
                    this.list.length ?
                        <div className="zyc-pager">
                            <Pagination
                                current={this.page}
                                pageSize={this.size}
                                total={this.total}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div> : null
                }
            </div>
        );
    }
}
