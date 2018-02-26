/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button, Input, Select, message, Modal} from 'antd'
import './adminNewArticle.sass';
import splitLocation from '../public/location';
import history from '../../history';
import Markdown from '../markdown'


@inject('TagStore', 'ArticleStore') @observer
export default class AdminNewArticle extends React.Component {

    @observable title = '';
    @observable content = '';
    @observable tags = [];
    @observable viewShow;

    @observable tagList = [];

    constructor(args) {
        super(args);

        this.tagStore = this.props.TagStore;
        this.articleStore = this.props.ArticleStore;
    }

    componentWillMount() {
        const { location } = window;
        const { articleId } = splitLocation(location);

        this.articleId = articleId;
    }

    componentDidMount() {
        this.tagStore.getTagList()
            .then((response) => {
                if (response) {
                    this.tagList = response.data.list;
                }
            });

        if (this.articleId) {
            const body = {};
            body.articleId = this.articleId;
            this.articleStore.postArticleDetail(body)
                .then((response) => {
                    if (response) {
                        this.title = response.data.title;
                        this.content = response.data.content;
                        this.tags = response.data.tags;
                    }
                });
        }
    }


    render() {
        return (

            <div className="admin-newArticle">
                <h2>发布文章</h2>
                <section>
                    <label>标题</label>
                    <Input
                        className="ipt"
                        placeholder="请输入文章标题"
                        value={this.title}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <label>正文</label>
                    <Input.TextArea
                        placeholder="请输入正文内容"
                        className="area"
                        autosize
                        value={this.content}
                        onChange={this.handleTextAreaChange.bind(this)}
                    />
                    <label>分类</label>
                    <Select
                        className="select"
                        mode="multiple"
                        placeholder="请选择分类"
                        onChange={this.handleSelectTags.bind(this)}
                        value={toJS(this.tags)}
                    >
                        {
                            this.tagList.map(tag =>
                                <Select.Option
                                    key={tag.tagId}
                                    value={tag.name}
                                >{tag.name}
                                </Select.Option>)
                        }
                    </Select>
                    <div className="button">
                        <Button
                            onClick={this.handleArticle.bind(this)}
                            className="btn"
                            type="primary"
                        >{this.articleId ? '更新' : '保存'}</Button>
                        <Button
                            onClick={this.handlePreView.bind(this)}
                            className="btn"
                            type="primary"
                        >预览</Button>
                    </div>
                </section>
                <Modal
                    title="文章预览"
                    visible={this.viewShow}
                    width={800}
                    footer={null}
                    onCancel={this.handleViewClose.bind(this)}
                >
                    <div className="dialog-view">
                        <Markdown
                            content={this.content}
                        />
                    </div>
                </Modal>
            </div>
        );
    }

    handleInputChange(e) {
        this.title = e.target.value;
    }

    handleTextAreaChange(e) {
        this.content = e.target.value;

    }

    handleSelectTags(tags) {
        console.log(tags)
        this.tags = tags;

    }

    handleArticle() {
        if (!this.title) {
            message.error('请输入文章标题!');
            return;
        }

        if (!this.content) {
            message.error('请输入文章内容!');
            return;
        }

        if (!this.tags.length) {
            message.error('请选择分类!');
            return;
        }

        if (this.articleId) {
            this.updateArticle();
        } else {
            this.saveArticle();
        }
    }

    updateArticle() {
        const body = {};
        body.title = this.title;
        body.content = this.content;
        body.tags = toJS(this.tags);
        body.articleId = this.articleId;

        this.articleStore.postArticleUpdate(body)
            .then((response) => {
                if (response) {
                    history.push('/admin/managerArticle');

                }
            });
    }

    saveArticle() {
        const body = {};
        body.title = this.title;
        body.content = this.content;
        body.tags = toJS(this.tags);
        body.isPublish = false;

        this.articleStore.postArticleAdd(body)
            .then((response) => {
                if (response) {
                    history.push('/admin/managerArticle');
                }
            });
    }

    handlePreView() {

        this.viewShow = true;
    }

    handleViewClose() {

        this.viewShow = false;
    }
}
