/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable,toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import './adminNewArticle.sass'
import {Button, Select, Input, Dialog, Message} from '../zyc'


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

    componentDidMount() {
        this.tagStore.getTagList()

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
                    >
                        {
                            tagList.map(tag =>
                                <Select.Item
                                    key={tag._id}
                                >{tag.name}
                                </Select.Item>
                            )
                        }
                    </Select>
                    <div className="button">
                        <Button onClick={this.handlePublish.bind(this)}
                                className="btn"
                                type="primary"
                        >
                            <span>发布</span>
                        </Button>
                        <Button onClick={this.handleSaveArticle.bind(this)}
                                className="btn"
                                type="primary"
                        >
                            <span>保存</span>
                        </Button>
                        <Button onClick={this.handlePreView.bind(this)}
                                className="btn"
                                type="primary"
                        >
                            <span>预览</span>
                        </Button>
                    </div>
                </section>
                <Dialog
                    title="文章预览"
                    show={this.viewShow}
                    width={800}
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

    handlePublish() {

    }

    handleSaveArticle() {
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


        let body = {};
        body.title = this.title;
        body.content = this.content;
        body.tags = toJS(this.tags);
        body.isPublish = 0;

        this.articleStore.postArticleAdd(body).then(response => {
            if (response) {
                this.title = '';
                this.content = '';
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


