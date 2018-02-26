/**
 * Created by scriptchao on 2017/11/27.
 */

import React, {Fragment} from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Row, Col, List, Avatar, Tag, Icon, Button, Divider, Popconfirm} from 'antd'
import './articleManagerList.sass';
import history from '../../history'
import {tagColor} from '../../utils'

const IconText = ({ type, text }) =>
    <span>
        <Icon type={type} style={{ marginRight: 8 }}/>
        <span>{text}</span>
    </span>;

export default class ArticleManagerList extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <div className="article-manager-list">
                {
                    content.map(item =>
                        <ArticleCell
                            key={item.articleId}
                            data={item}
                            onEdit={this.props.onEdit}
                            onDelete={this.props.onDelete}
                            onPublish={this.props.onPublish}
                        />)
                }
            </div>
        );
    }
}

class ArticleCell extends React.Component {

    render() {
        const { data } = this.props;

        return (
            <div className="article-manager-list-item">
                <Row>
                    <Col
                        md={16}
                        xs={0}
                    >
                        <div className="author">
                            <Avatar size="small" src="/static/img/nav-user.jpg" style={{ marginRight: 6 }}/>
                            <span>{data.author}</span>
                        </div>
                        <div className="title">{data.title}</div>
                        <div className="info">
                            <IconText
                                type="riqi"
                                text={dateFormat(data.createTime, 'yyyy-mm-dd')}
                            />
                            <Divider type="vertical"/>
                            <IconText
                                type="yuedu" text={data.readCount}
                            />
                            <Divider type="vertical"/>
                            <IconText
                                type="dianzanshu" text={data.voteCount}
                            />
                        </div>
                    </Col>
                    <Col
                        md={0}
                        xs={12}
                    >
                        <div className="author">
                            <Avatar size="small" src="/static/img/nav-user.jpg" style={{ marginRight: 6 }}/>
                            <span>{data.author}</span>
                        </div>
                    </Col>
                    <Col
                        md={3}
                        xs={12}
                    >
                        <div className="state">
                            {
                                data.isPublish ?
                                    <span className="zyc-text-green">已发布</span> :
                                    <span>草稿</span>
                            }
                        </div>
                    </Col>
                    <Col
                        md={0}
                        xs={24}
                    >
                        <p className="title">{data.title}</p>
                    </Col>
                    <Col
                        md={0}
                        xs={12}
                    >
                        <div className="info">
                            <IconText
                                type="yuedu"
                                text={data.readCount}
                            />
                            <Divider type="vertical"/>
                            <IconText
                                type="dianzanshu"
                                text={data.voteCount}
                            />
                        </div>
                    </Col>
                    <Col
                        md={{ span: 4, offset: 1 }}
                        xs={12}
                    >
                        <div className="operation">
                            <a onClick={() => {
                                this.props.onEdit(data.articleId)
                            }}>编辑</a>
                            <Divider type="vertical"/>
                            <Popconfirm
                                title="是否确认删除?"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.props.onDelete.bind(this, data.articleId)}
                            >
                                <a>删除</a>
                            </Popconfirm>
                            <Divider type="vertical"/>
                            {
                                data.isPublish ?
                                    <a onClick={() => {
                                        this.props.onPublish(data.articleId, false);
                                    }}>撤回</a> :
                                    <a onClick={() => {
                                        this.props.onPublish(data.articleId, true);
                                    }}>发布</a>
                            }
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

