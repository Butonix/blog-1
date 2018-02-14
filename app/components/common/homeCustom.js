/**
 * Created by Administrator on 2018/2/14.
 */

import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import './homeCustom.sass'
import history from '../../history'


export default class HomeCustom extends Component {

    render() {
        const {content} = this.props;

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
                                content.filter((item, index) => index < 5).map(item =>
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

