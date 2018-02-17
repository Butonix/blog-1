/**
 * Created by Administrator on 2018/2/14.
 */

import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import './homeCustom.sass'
import history from '../../history'

@inject('ArticleStore') @observer
export default class HomeCustom extends Component {

    constructor(props) {
        super(props);
        this.articleStore = this.props.ArticleStore
    }


    render() {

        const {latestList} = this.articleStore;

        return (
            <div className="home-custom">
                <div className="custom-info">
                    <img src="/static/img/nav-user.jpg" alt="avatar"/>
                    <p className="username">
                        scriptchao
                    </p>
                    <p>
                        前端打杂人员，探索快捷成长之路。
                    </p>
                </div>
                <div className="custom-article">
                    <Card title="最新文章" bodyStyle={{padding: 0}} bordered={false}>
                        <ul className="list">
                            {
                                latestList.filter((item, index) => index < 5).map(item =>
                                    <li key={item.title} onClick={() => {
                                        history.push(`/categories/detail?articleId=${item.articleId}`)
                                    }}>{item.title}</li>)
                            }
                        </ul>
                    </Card>
                </div>
            </div>
        )
    }
}

