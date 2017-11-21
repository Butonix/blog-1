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
                        <span>{`发表时间 : ${dateFormat(data.createTime, 'yyyy-mm-dd HH:MM:ss')}`}</span>
                    </p>
                </div>
                <div className="state">
                    <span>{data.isPublish ? '已发布' : '草稿'}</span>
                </div>
                <div className="operation">
                    <Button onClick={this.handleEdit.bind(this)} className="btn">编辑</Button>
                    <Button className="btn">删除</Button>
                    <Button className="btn">查看</Button>
                </div>
            </div>

        )
    }

    handleEdit() {

    }

}
