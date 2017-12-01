/**
 * Created by scriptchao on 2017/11/27.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import './articleList.sass'

class ArticleList extends React.Component {
    render() {
        let {data} = this.props;
        return (
            <div className="homepage-article">
                {
                    data.map((item, index) =>
                        <ArticleCell
                            data={item}
                            key={item.articleId}
                        />
                    )
                }
            </div>
        )
    }
}

class ArticleCell extends React.Component {
    render() {
        let {data, detail} = this.props;
        return (
            <div className={detail ? 'homepage-article-list detail' : 'homepage-article-list'}>
                <h1>
                    <Link to={`/detail?articleId=${data.articleId}`} className="zyc-link-hover">{data.title}</Link>
                </h1>
                <div className="meta">
                    <span className="zyc-area-line">
                        <i className="iconfont icon-riqi">{null}</i>
                        <span className="tip">发表于</span>
                        <span>{dateFormat(data.createTime, 'yyyy-mm-dd HH:MM:ss')}</span>
                    </span>
                    <span className="zyc-area-line">
                        <i className="iconfont icon-zuozhe">{null}</i>
                        <span className="tip">作者</span>
                        <span>{data.author}</span>
                    </span>
                    <span className="zyc-area-line categories">
                        <i className="iconfont icon-wenjianjia">{null}</i>
                        <span className="tip">分类于</span>
                        {
                            data.tags && data.tags.map((tag, index) =>
                                <Link to={`/categories/${tag}`} key={tag}>{tag}</Link>
                            )
                        }
                    </span>
                    <span>
                        <i className="iconfont icon-yuedu">{null}</i>
                        <span className="tip">阅读次数</span>
                        <span>{data.readCount}</span>
                    </span>
                </div>
                {
                    !detail ?
                        <div className="link">
                            <Link to={`/detail?articleId=${data.articleId}`} className="zyc-link-hover">阅读全文 »</Link>
                        </div> : null
                }
            </div>
        )
    }
}

export {ArticleCell}
export default ArticleList