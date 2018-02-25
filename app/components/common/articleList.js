/**
 * Created by scriptchao on 2017/11/27.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Row, Col, List, Avatar, Tag, Icon} from 'antd'
import './articleList.sass';
import history from '../../history'
import {tagColor} from '../../utils'

const IconText = ({type, text}) =>
    <span>
        <Icon type={type} style={{marginRight: 8}}/>
        <span>{text}</span>
    </span>;

export default class ArticleList extends React.Component {
    render() {
        const {content} = this.props;
        return (
            <div className="article-list">
                <List
                    itemLayout="vertical"
                    dataSource={content}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            className="article-list-item"
                            extra={<p className="article-list-extra">{dateFormat(item.createTime, 'yyyy-mm-dd')}</p>}
                            actions={[
                                <IconText key="yuedu" type="yuedu" text={item.readCount}/>,
                                <IconText key="biaoqian" type="biaoqian" text={
                                    item.tags.map(tag =>
                                        <Tag
                                            key={item.id + Math.random()}
                                            color={tagColor[Math.floor(Math.random() * tagColor.length)]}
                                            onClick={() => {
                                                history.push(`/categories/${tag}`)
                                            }}
                                        >
                                            {tag}
                                        </Tag>)
                                }/>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size="small" src="/static/img/nav-user.jpg"/>}
                                title={item.author}
                            />
                            <div
                                className="article-list-content"
                                onClick={() => {
                                    history.push(`/categories/detail?articleId=${item.articleId}`)
                                }}>
                                <span className="zyc-link-hover">{item.title}</span>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

