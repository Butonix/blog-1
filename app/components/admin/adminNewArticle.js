/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import './adminNewArticle.sass'
import {Button, Select, Input, Dialog, Message} from '../zyc'
import {splitLocation} from '../public/location'


@inject('TagStore', 'ArticleStore') @observer
export default class AdminNewArticle extends React.Component {

    @observable title = '';
    @observable content = '';
    @observable tags = [];
    @observable viewShow;

    constructor(args) {
        super(args);

        this.tagStore = this.props.TagStore;
        this.articleStore = this.props.ArticleStore;
    }

    componentWillMount() {
        let {articleId} = splitLocation(location);

        this.articleId = articleId
    }

    componentDidMount() {
        this.tagStore.getTagList();

        if (this.articleId) {
            let body = {};
            body.articleId = this.articleId;
            this.articleStore.postArticleDetail(body).then(response => {
                if (response) {
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.tags = response.data.tags;
                }
            })
        }
    }


    render() {
        let {tagList} = this.tagStore;
        return (

            <div className="admin-newArticle">
                <h2>发布文章</h2>
                <section>
                    <span>标题</span>
                    <Input
                        className="ipt"
                        placeholder="请输入文章标题"
                        value={this.title}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <span>正文</span>
                    <textarea
                        placeholder="请输入正文内容"
                        value={this.content}
                        onChange={this.handleTextAreaChange.bind(this)}
                    >{null}</textarea>
                    <span>分类</span>
                    <Select
                        className="select"
                        onSelectTags={this.handleSelectTags.bind(this)}
                        value={this.tags}
                    >
                        {
                            tagList.map(tag =>
                                <Select.Item
                                    key={tag.tagId}
                                >{tag.name}
                                </Select.Item>
                            )
                        }
                    </Select>
                    <div className="button">
                        <Button onClick={this.handleArticle.bind(this)}
                                className="btn"
                                type="primary"
                        >{this.articleId ? '更新' : '保存'}</Button>
                        <Button onClick={this.handlePreView.bind(this)}
                                className="btn"
                                type="primary"
                        >预览</Button>
                    </div>
                </section>
                <Dialog
                    title="文章预览"
                    show={this.viewShow}
                    width={800}
                    footer={false}
                    onClose={this.handleViewClose.bind(this)}
                >
                    <div className="dialog-view">
                        <div className="markdown-body">
                            {remark().use(reactRenderer).processSync(this.content).contents}
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }

    handleInputChange(e) {
        this.title = e.target.value;
    }

    handleTextAreaChange(e) {
        this.content = e.target.value

    }

    handleSelectTags(tags) {
        this.tags = tags;

    }

    handleArticle() {
        if (!this.title) {
            Message.error('请输入文章标题!');
            return
        }

        if (!this.content) {
            Message.error('请输入文章内容!');
            return
        }

        if (!this.tags.length) {
            Message.error('请选择分类!');
            return
        }

        if (this.articleId) {
            this.updateArticle()
        } else {
            this.saveArticle()
        }
    }

    updateArticle() {
        let body = {};
        body.title = this.title;
        body.content = this.content;
        body.tags = toJS(this.tags);
        body.articleId = this.articleId;

        this.articleStore.postArticleUpdate(body).then(response => {
            if (response) {
                this.props.history.push('/admin/managerArticle')

            }
        })
    }

    saveArticle() {
        let body = {};
        body.title = this.title;
        body.content = this.content;
        body.tags = toJS(this.tags);
        body.isPublish = false;

        this.articleStore.postArticleAdd(body).then(response => {
            if (response) {
                this.props.history.push('/admin/managerArticle')
            }
        })
    }

    handlePreView() {

        this.viewShow = true
    }

    handleViewClose() {

        this.viewShow = false
    }
}


