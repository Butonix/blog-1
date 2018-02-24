/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Button, Input, Tag, message} from 'antd'
import './adminManagerTags.sass';
import {tagColor} from '../../utils'


@inject('TagStore') @observer
export default class AdminManagerTags extends React.Component {

    @observable inputShow;
    @observable inputValue = '';

    @observable tagList = [];

    constructor(args) {
        super(args);
        this.tagStore = this.props.TagStore;

    }

    componentDidMount() {
        this.getTagList();
    }

    getTagList() {
        this.tagStore.getTagList()
            .then((response) => {
                if (response) {
                    this.tagList = response.data.list;
                }
            })
    }

    render() {

        return (
            <div className="admin-managerTags">
                <h2>标签管理</h2>
                {
                    this.tagList.map((tag, index) =>
                        <Tag
                            closable
                            key={tag.tagId}
                            className="tag"
                            color={tagColor[Math.floor(Math.random() * tagColor.length)]}
                            onClose={this.handleCloseTag.bind(this, tag)}
                        >{tag.name}</Tag>)
                }
                <br/>
                {
                    this.inputShow ?
                        <Input
                            className="ipt"
                            style={{ width: 120 }}
                            placeholder="请输入新标签"
                            value={this.inputValue} // 给默认值 不然会有警告
                            onChange={this.handleInputChange.bind(this)}
                            onBlur={this.handleInputConfirm.bind(this)}
                        /> :
                        <Button
                            className="btn"
                            type="primary"
                            onClick={this.handleShowInput.bind(this)}
                        >
                            <span>+ New Tag</span>
                        </Button>
                }
            </div>
        );
    }

    handleCloseTag(tag) {
        const body = {};
        body.name = tag.name;
        this.tagStore.postTagDelete(body)
            .then((response) => {
                if (response) {
                    this.getTagList();
                }
            });
    }

    handleShowInput() {
        this.inputShow = true;
    }

    handleInputChange(e) {
        this.inputValue = e.target.value;

    }

    handleInputConfirm() {
        if (!this.inputValue) {
            message.error('标签名不能为空!');
            this.inputShow = false;
            return;
        }

        const body = {};
        body.name = this.inputValue;
        this.tagStore.postTagAdd(body)
            .then((response) => {
                if (response) {
                    this.inputShow = false;
                    this.inputValue = '';
                    this.getTagList();
                }
            });
    }
}
