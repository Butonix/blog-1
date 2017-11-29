/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import Pagination from 'rc-pagination'
import dateFormat from 'dateformat'
import './categoriesTag.sass'


@inject('ArticleStore') @observer
export default class CategoriesTag extends React.Component {
    @observable page = 1;
    @observable size = 5;

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
        body.isPublish = true;
        body.tags = this.props.match.params.tag;
        this.articleStore.postArticleList(body)
    }


    handlePageChange(current) {
        this.page = current;
        this.getArticleList()

    }

    render() {
        let {articleList, articleCount} = this.articleStore;
        return (
            <div className="categories-tag">
                <section className="zyc-collection-line">
                    <h2 className="zyc-collection-circle">
                        <span>{this.props.match.params.tag}</span>
                        <span className="tip">分类</span>
                    </h2>
                    <ul className="tag-list">
                        {
                            articleList.map((item, index) =>
                                <li className="zyc-collection-circle-small" key={item.articleId}>
                                    <span>{dateFormat(item.createTime, 'mm-dd')}</span>
                                    <Link to={`/detail?articleId=${item.articleId}`}>{item.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={articleCount}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
