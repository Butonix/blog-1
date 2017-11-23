/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import Pagination from 'rc-pagination'
import dateFormat from 'dateformat'
import './adminManagerArticle.sass'
import {Button} from '../zyc'

@inject('ArticleStore') @observer
export default class AdminManagerArticle extends React.Component {
    @observable page = 1;
    @observable size = 5;
    @observable total = 0;

    constructor(args) {
        super(args);
        this.articleStore = this.props.ArticleStore
    }

    componentDidMount() {
        this.getArticleList()
    }

    getArticleList() {

        let body = {};
        body.page = this.page;
        body.size = this.size;
        this.articleStore.postArticleList(body).then(response => {
            if (response) {
                this.total = response.data.total
            }
        });
    }

    handlePageChange(current) {
        this.page = current;
        this.getArticleList();

    }

    handleDelete(id) {
        let body = {};
        body.id = id;
        this.articleStore.postArticleDelete(body).then(response => {
            if (response) {
                this.getArticleList()
            }
        })
    }

    handlePublish(id, isPublish) {
        let body = {};
        body.id = id;
        body.isPublish = isPublish;
        this.articleStore.postArticleUpdate(body).then(response => {
            if (response) {
                this.getArticleList()
            }
        })
    }

    render() {
        let {articleList} = this.articleStore;
        return (
            <div className="admin-managerArticle">
                <h2>文章管理</h2>
                <section>
                    {
                        articleList.map((item, index) =>
                            <ArticleCell
                                data={item}
                                key={item._id}
                                onDelete={this.handleDelete.bind(this)}
                                onPublish={this.handlePublish.bind(this)}
                                history={this.props.history}
                            />
                        )
                    }
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={this.total}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

class ArticleCell extends React.Component {

    render() {
        let {data} = this.props;

        return (
            <div className="article-cell">
                <div className="aboutArticle">
                    <p className="title">{data.title}</p>
                    <p className="info">
                        <span>{`作者 : ${data.author}`}</span>
                        <span>{`阅读数 : ${data.readCount}`}</span>
                        <span>{`更新时间 : ${dateFormat(data.updateTime, 'yyyy-mm-dd HH:MM:ss')}`}</span>
                    </p>
                </div>
                <div className="state">
                    <span>{data.isPublish ? '已发布' : '草稿'}</span>
                </div>
                <div className="operation">
                    <Button className="btn" onClick={() => {
                        this.props.history.push(`/admin/newArticle?articleId=${data._id}`)
                    }}>编辑</Button>
                    <Button className="btn" onClick={() => {
                        this.props.onDelete(data._id)
                    }}>删除</Button>
                    {
                        data.isPublish ?
                            <Button className="btn" onClick={() => {
                                this.props.onPublish(data._id, false)
                            }}>撤回</Button> :
                            <Button className="btn" onClick={() => {
                                this.props.onPublish(data._id, true)
                            }}>发布</Button>
                    }
                </div>
            </div>

        )
    }
}
