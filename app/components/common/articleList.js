/**
 * Created by scriptchao on 2017/11/27.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Row, Col, List, Avatar, Tag, Icon, Divider} from 'antd'
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
                {
                    content.map(item =>
                        <ArticleCell
                            key={item.articleId}
                            data={item}
                        />)
                }
            </div>
        );
    }
}

class ArticleCell extends React.Component {

    handleSkip = (articleId) => {
        history.push(`/categories/detail?articleId=${articleId}`)
    };

    render() {
        const {data} = this.props;

        return (
            <div className="article-list-item">
                <div className="author" onClick={this.handleSkip.bind(this, data.articleId)}>
                    <span>
                        <Avatar size="small" src="/static/img/nav-user.jpg" style={{marginRight: 6}}/>
                        <span>{data.author}</span>
                    </span>
                    <span>{dateFormat(data.createTime, 'yyyy-mm-dd')}</span>
                </div>
                <div className="title" onClick={this.handleSkip.bind(this, data.articleId)}>
                    <span className="zyc-link-hover">{data.title}</span>
                </div>
                <div className="tip">
                    <IconText
                        type="dianzanshu"
                        text={data.voteCount}
                    />
                    <Divider type="vertical"/>
                    <IconText
                        type="yuedu"
                        text={data.readCount}
                    />
                    <Divider type="vertical"/>
                    <IconText key="biaoqian" type="biaoqian" text={
                        data.tags.map(tag =>
                            <Tag
                                key={data.id + Math.random()}
                                color={tagColor[Math.floor(Math.random() * tagColor.length)]}
                                onClick={() => {
                                    history.push(`/categories/${tag}`)
                                }}
                            >
                                {tag}
                            </Tag>)
                    }/>
                </div>
            </div>

        );
    }
}

