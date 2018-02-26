/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Pagination, List, Row, Col} from 'antd';
import './categoriesTag.sass';
import history from '../../history'
import HomeCustom from '../common/homeCustom'


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
                <Row>
                    <Col
                        md={15}
                        xs={24}
                    >
                        {
                            this.total ?
                                <List
                                    className="tag-list"
                                    itemLayout="vertical"
                                    header={<h3>{`${this.props.match.params.tag} 分类`}</h3>}
                                    dataSource={this.list}
                                    renderItem={item =>
                                        <List.Item
                                            key={item.articleId}
                                            extra={<span>{dateFormat(item.createTime, 'yyyy-mm-dd')}</span>}
                                        >
                                            <List.Item.Meta
                                                className="tag-content"
                                                title={item.title}
                                                onClick={() => {
                                                    history.push(`/categories/detail?articleId=${item.articleId}`)
                                                }}
                                            />

                                        </List.Item>}
                                /> : null
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
                    </Col>
                    <Col
                        md={{span: 8, offset: 1}}
                        xs={0}
                    >
                        <HomeCustom/>
                    </Col>
                    <Col
                        md={0}
                        xs={24}
                        style={{marginTop: 20}}
                    >
                        <HomeCustom/>
                    </Col>
                </Row>
            </div>
        )
    }
}
