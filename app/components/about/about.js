/**
 * Created by scriptchao on 2018/2/26.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {Card, Row, Col, Icon} from 'antd'
import HomeCustom from '../common/homeCustom'
import './about.sass'


@observer
export default class About extends React.Component {

    render() {
        return (
            <div className="about">
                <Row>
                    <Col
                        md={15}
                        xs={24}
                    >
                        <Card
                            title="关于我"
                            className="about-me"
                        >
                            <p>你好! 我是博客的博主! 该博客主要用于记录我在技术方面的一些所见所闻。</p>
                            <p>本人于2016年入坑前端这个行业，一直想搞一个属于自己的博客,奈何技术水平有限，经过一年多的学习成长，随着接触的东西和学到的东西越来越多，
                                想对编码能力进行自我检测，于是有了这个博客。</p>
                            <p>前端路漫漫，希望自己在这条道路上越走越远~~</p>
                        </Card>
                        <Card
                            title="联系我"
                            className="about-concat"
                        >
                            <p><Icon type="dianhua" style={{ marginRight: 8 }}/> <span>15757123303</span></p>
                            <p><Icon type="youxiang" style={{ marginRight: 8 }}/> <span>1154806236@qq.com</span></p>
                            <p>
                                <Icon type="github" style={{ marginRight: 12 }}/>
                                <a
                                    href="https://github.com/scriptchao" target="_blank"
                                    className="zyc-text-blue">scriptchao
                                </a>
                            </p>
                        </Card>
                    </Col>
                    <Col
                        md={{ span: 8, offset: 1 }}
                        xs={0}
                    >
                        <HomeCustom/>
                    </Col>
                    <Col
                        md={0}
                        xs={24}
                        style={{ marginTop: 20 }}
                    >
                        <HomeCustom/>
                    </Col>
                </Row>
            </div>
        );
    }
}

