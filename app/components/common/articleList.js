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
                    size="large"
                    dataSource={content}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            className="article-list-item"
                            extra={<span>{dateFormat(item.createTime, 'yyyy-mm-dd')}</span>}
                            actions={[
                                <IconText key="user" type="user" text={item.author}/>,
                                <IconText key="tags-o" type="tags-o" text={
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
                                <IconText key="aa" type="user" text={item.readCount}/>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar size="small" src="/static/img/nav-user.jpg"/>}
                                title={item.title}
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    history.push(`/categories/detail?articleId=${item.articleId}`)
                                }}

                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

