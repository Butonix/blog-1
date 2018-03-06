/**
 * Created by scriptchao on 2018/3/5.
 */

import React, {Fragment} from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Card, Row, Col, Icon, Tooltip, Timeline, Divider, Progress, Anchor} from 'antd'
import './resume.sass'

const ResumeHead = ({ title, href }) =>
    <div className="resume-head" id={href}>
        <i className="resume-head-line"/>
        <span className="resume-head-title">{title}</span>
        <i className="resume-head-line"/>
    </div>;

const SkillItem = ({ title, percent }) =>
    <Fragment>
        <div className="skill-item">
            <span className="skill-item-percent">{`${percent}%`}</span>
            <span className="skill-item-title">{title}</span>
        </div>
        <Progress percent={percent} showInfo={false} status="active"/>
    </Fragment>;

@inject('UserStore') @observer
export default class Resume extends React.Component {

    render() {
        const { userType } = this.props;
        return (
            <div className="resume">
                <Row>
                    <Col
                        md={{ span: 2, offset: 1 }}
                        xs={0}
                    >
                        <div className="resume-anchor">
                            <Anchor
                                offsetTop={70}
                                className="resume-anchor-item"
                            >
                                <Anchor.Link href="#resume-base-info" title="个人信息"/>
                                <Anchor.Link href="#resume-introduce" title="个人介绍"/>
                                <Anchor.Link href="#resume-work-experience" title="工作经历"/>
                                {
                                    userType === 1 ?
                                        <Anchor.Link href="#resume-project-experience" title="项目经验"/> : null
                                }
                                <Anchor.Link href="#resume-self-description" title="自我描述"/>
                                <Anchor.Link href="#resume-skill-assess" title="技能评价"/>
                            </Anchor>
                        </div>
                    </Col>
                    <Col
                        md={{ span: 20, offset: 1 }}
                        xs={24}

                    >
                        <div className="resume-page">
                            <div className="base-info">
                                <ResumeHead
                                    title="个人信息"
                                    href="resume-base-info"
                                />
                                <img src="/static/img/nav-user.jpg" alt="avatar"/>
                                <p className="name">scriptchao</p>
                                <p>前端打杂人员,探索快捷成长之路</p>
                                <p>
                                    <Icon type="suoshuzhiwei" style={{ marginRight: 8 }}/>
                                    <span>前端开发</span>
                                </p>
                                <div className="paragraph">
                                    <Icon type="ren" style={{ marginRight: 8 }}/>
                                    <span className="">男</span>
                                    <Divider type="vertical"/>
                                    <Tooltip
                                        title="1994年03月出生"
                                    >
                                        <span>24岁</span>
                                    </Tooltip>
                                    <Divider type="vertical"/>
                                    <Tooltip
                                        title="浙江理工大学"
                                    >
                                        <span>本科</span>
                                    </Tooltip>
                                    <Divider type="vertical"/>
                                    <span>2年工作经验</span>
                                    <Divider type="vertical"/>
                                    <span>杭州</span>
                                </div>
                                <Row>
                                    <Col
                                        md={24}
                                        xs={0}
                                    >
                                        <p>
                                            <Icon type="dianhua" style={{ marginRight: 8 }}/>
                                            <span>15757123303</span>
                                            <Icon type="youxiang" style={{ marginRight: 8, marginLeft: 20 }}/>
                                            <span>1154806236@qq.com</span>
                                        </p>
                                    </Col>
                                    <Col
                                        md={0}
                                        xs={24}
                                    >
                                        <p>
                                            <Icon type="dianhua" style={{ marginRight: 8 }}/>
                                            <span>15757123303</span>
                                        </p>
                                        <p>
                                            <Icon type="youxiang" style={{ marginRight: 8 }}/>
                                            <span>1154806236@qq.com</span>
                                        </p>
                                    </Col>
                                </Row>
                                <p>
                                    <Tooltip
                                        title="github"
                                    >
                                        <a href="https://github.com/scriptchao" target="_blank">
                                            <Icon type="github" style={{ fontSize: 16 }}/>
                                        </a>
                                    </Tooltip>
                                    <Tooltip
                                        title="个人主页"
                                    >
                                        <a href="http://www.scriptchao.com" target="_blank" style={{ marginLeft: 15 }}>
                                            <Icon type="zhuye" style={{ fontSize: 16 }}/>
                                        </a>
                                    </Tooltip>
                                </p>
                            </div>
                            <div className="introduce">
                                <ResumeHead
                                    title="个人介绍"
                                    href="resume-introduce"
                                />
                                <ul className="introduce-list">
                                    <li>熟练掌握html、css相关技术。</li>
                                    <li>熟悉javascript编程，熟练掌握es6新特性，了解es7部分新特性。</li>
                                    <li>掌握react、react-router、mobx等react全家桶技术。</li>
                                    <li>掌握webpack包管理工具，能在不同的业务场景下配置相应的配置。</li>
                                    <li>了解express、mongodb、nodejs等相关后台技术。</li>
                                </ul>
                            </div>
                            <div className="work-experience">
                                <ResumeHead
                                    title="工作经历"
                                    href="resume-work-experience"
                                />
                                <div className="work-experience-content">
                                    <Timeline>
                                        <Timeline.Item>
                                            <Row>
                                                <Col
                                                    md={12}
                                                    xs={24}
                                                >
                                                    <p className="time">2016.10 —— 至今</p>
                                                    <p className="company">浙江薪福多网络科技有限公司</p>
                                                    <p className="job">前端工程师</p>
                                                </Col>
                                                <Col
                                                    md={12}
                                                    xs={24}
                                                >
                                                    <p>负责公司前端框架的选型以及界面的开发。工作期间的主要职责是开发和维护公司薪酬发放系统、官网、后台管理系统以及相关运营活动的界面。</p>
                                                </Col>
                                            </Row>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            <Row>
                                                <Col
                                                    md={12}
                                                    xs={24}
                                                >
                                                    <p className="time">2016.06 —— 2016.10</p>
                                                    <p className="company">杭州摆摆网络科技有限公司</p>
                                                    <p className="job">前端开发</p>
                                                </Col>
                                                <Col
                                                    md={12}
                                                    xs={24}
                                                >
                                                    <p>作为前端实习生完成公司前端业务的开发以及自我学习。</p>
                                                </Col>
                                            </Row>
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                            </div>
                            {
                                userType === 1 ?
                                    <div className="project-experience">
                                        <ResumeHead
                                            title="项目经验"
                                            href="resume-project-experience"
                                        />
                                        <div className="project-experience-content">
                                            <Timeline>
                                                <Timeline.Item>
                                                    <Row>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p className="time">2017.09 —— 至今</p>
                                                            <p className="item">个人博客</p>
                                                            <p className="job">全栈开发</p>
                                                        </Col>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p>技术栈：react + mobx + ant-design + webpack + express + mogodb + nodejs + axios</p>
                                                            <p>项目描述 :</p>
                                                            <ul className="project-list">
                                                                <li>一直想搞一个属于自己的博客，一方面用来记录技术上的所见所闻，另一方面能提高自身的编码水平。</li>
                                                                <li>项目采用前后端分离实现，后台采用mongoose + express提供数据，前端负责路由跳转，权限控制，数据渲染等。</li>
                                                                <li>项目采用antd提供的栅格化布局，使其能兼容运行在pc端和移动端，文章采用markdown语法，易于用户阅读。</li>
                                                                <li>react-router路由主要分成两大模块，一块为前台界面展示，另一块为后台的用户管理、标签管理和文章管理。</li>
                                                            </ul>
                                                            <p>项目总结 ：</p>
                                                            <ul className="project-list">
                                                                <li>通过从技术的选型、页面的设计到项目的开发以及上线这一套流程的实现，我对开发一个项目有了更加深刻的认识，这能为我以后开发大型项目以及多人协作提供不少帮助。</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Timeline.Item>
                                                <Timeline.Item>
                                                    <Row>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p className="time">2016.10 —— 至今</p>
                                                            <p className="item">薪福多薪酬发放系统</p>
                                                            <p className="job">前端开发</p>
                                                        </Col>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p>技术栈：html + css + javascript + react + mobx + webpack + fetch + nodejs + express</p>
                                                            <p>项目描述 : </p>
                                                            <ul className="project-list">
                                                                <li>基于react、react-router搭建的薪酬发放系统spa项目，主要分为薪支付、薪支条、人税通三大模块。</li>
                                                            </ul>
                                                            <p>项目责任 : </p>
                                                            <ul className="project-list">
                                                                <li>项目的架构搭建、维护、升级。</li>
                                                                <li>公共组件的开发、维护。</li>
                                                                <li>菜单栏以及薪支付、人税通模块的开发。</li>
                                                            </ul>
                                                            <p>项目总结 ：</p>
                                                            <ul className="project-list">
                                                                <li> 掌握了react的组件结构和各种 API 以及组件的生命周期。了解了前端工程化开发的必要性。熟悉了使用git进行多人协作开发。</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Timeline.Item>
                                                <Timeline.Item>
                                                    <Row>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p className="time">2018.02 —— 2018.02</p>
                                                            <p className="item">薪福多邀请分享h5页面</p>
                                                            <p className="job">前端开发</p>
                                                        </Col>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p>技术栈：ant-design-mobile + react + axios + webpack</p>
                                                            <p>项目描述 : </p>
                                                            <ul className="project-list">
                                                                <li>主要功能为引导用户分享，实现快速注册。</li>
                                                            </ul>
                                                            <p>项目总结 ：</p>
                                                            <ul className="project-list">
                                                                <li>该项目的主要难点在于微信js-sdk的使用、微信公众号相关功能的绑定以及分享功能在android、ios系统的兼容性上。</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Timeline.Item>
                                                <Timeline.Item>
                                                    <Row>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p className="time">2017.05 —— 2017.06</p>
                                                            <p className="item">薪福多官网</p>
                                                            <p className="job">前端开发</p>
                                                        </Col>
                                                        <Col
                                                            md={12}
                                                            xs={24}
                                                        >
                                                            <p>技术栈：html + css + javascript + react + webpack</p>
                                                            <p>项目描述 : </p>
                                                            <ul className="project-list">
                                                                <li>为了适配PC端和移动端，此项目分成了两个不同的项目进行开发，根据用户不同的设备跳转到相应的页面进行展示，移动端采用了阿里高清布局方案。</li>
                                                            </ul>
                                                            <p>项目责任 ：</p>
                                                            <ul className="project-list">
                                                                <li>整体布局以及阿里高清方案的引入。</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Timeline.Item>
                                            </Timeline>
                                        </div>
                                    </div> : null
                            }
                            <div className="self-description">
                                <ResumeHead
                                    title="自我描述"
                                    href="resume-self-description"
                                />
                                <ul className="self-description-list">
                                    <li>16年毕业，近2年前端开发经验，有企业级系统前后台等各类业务的前端开发经验。数据处理能力强，喜欢探索前端新技术，并能将其运用到实际开发项目中。</li>
                                    <li>做事踏实认真，能吃苦耐劳，有独立分析解决问题的能力，具备良好的学习、沟通和团队协作能力。</li>
                                    <li>热爱代码，喜欢技术，能在开发中寻找到创作的乐趣，乐此不疲。</li>
                                </ul>
                            </div>
                            <div className="skill-assess">
                                <ResumeHead
                                    title="技能评价"
                                    href="resume-skill-assess"
                                />
                                <Row className="skill-assess-content">
                                    <Col
                                        md={{ span: 11 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="javascript"
                                            percent={70}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11, offset: 2 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="react"
                                            percent={60}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="html"
                                            percent={80}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11, offset: 2 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="css"
                                            percent={80}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="nodejs"
                                            percent={50}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11, offset: 2 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="mongodb"
                                            percent={50}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="webpack"
                                            percent={60}
                                        />
                                    </Col>
                                    <Col
                                        md={{ span: 11, offset: 2 }}
                                        xs={24}
                                    >
                                        <SkillItem
                                            title="fetch"
                                            percent={70}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

