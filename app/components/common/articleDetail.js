/**
 * Created by Administrator on 2018/2/14.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import dateFormat from 'dateformat';
import remark from 'remark';
import reactRenderer from 'remark-react';
import {Card, Tag, Icon} from 'antd'
import './articleDetail.sass'
import {tagColor} from '../../utils'
import history from '../../history'

const IconText = ({type, text}) =>
    <span>
        <Icon type={type} style={{marginRight: 8}}/>
        <span>{text}</span>
    </span>;

export default class ArticleDetail extends React.Component {
    render() {
        const {data} = this.props;
        return (
            <div className="article-detail">
                <Card
                    title={<span>{data.title}</span>}
                    extra={[
                        <Tag
                            color="red"
                            key="author">
                            {`作者: ${data.author}`}
                        </Tag>]}
                >
                    <div className="tag">
                        <span>{dateFormat(data.createTime, 'yyyy-mm-dd')}</span>
                        <span>
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
                            <span>{`${data.readCount} 阅读`}</span>
                        </span>
                    </div>
                    <div className="content">
                        <div className="markdown-body">
                            {remark().use(reactRenderer).processSync(data.content).contents}
                        </div>
                    </div>
                </Card>
            </div>

        )
    }
}
