/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Pagination} from 'antd';
import './categoriesTag.sass';


@inject('ArticleStore') @observer
export default class CategoriesTag extends React.Component {
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
        body.isPublish = true;
        body.tags = this.props.match.params.tag;
        this.articleStore.postArticleList(body).then((response) => {
            if (response) {
                this.list = response.data.list;
                this.total = response.data.total;
            }
        });
    }


    handlePageChange(current) {
        this.page = current;
        this.getArticleList();
    }

    render() {
        return (

            <div className="categories-tag">
                {
                    this.total ?
                        <section className="zyc-collection-line">
                            <h2 className="zyc-collection-circle">
                                <span>{this.props.match.params.tag}</span>
                                <span className="tip">分类</span>
                            </h2>
                            <ul className="tag-list">
                                {
                                    this.list.map((item, index) =>
                                        <li className="zyc-collection-circle-small" key={item.articleId}>
                                            <span>{dateFormat(item.createTime, 'mm-dd')}</span>
                                            <Link
                                                to={`/categories/detail?articleId=${item.articleId}`}>{item.title}</Link>
                                        </li>)
                                }
                            </ul>
                        </section> : null
                }
                {
                    this.total === 0 ?
                        <div className="no-data">
                            该分类下暂无文章!
                        </div> : null
                }
                {
                    this.total ?
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
        )
    }
}
