/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import './adminManagerTags.sass'
import { Button, Input, Tag, Message } from '../zyc'


@inject('TagStore') @observer
export default class AdminManagerTags extends React.Component {

    @observable inputShow;
    @observable inputValue = '';

    constructor(args) {
        super(args);
        this.tagStore = this.props.TagStore;

    }

    componentDidMount() {
        this.tagStore.getTagList()
    }

    render() {
        const { tagList } = this.tagStore;
        return (
            <div className="admin-managerTags">
                <h2>标签管理</h2>
                {
                    tagList.map((tag, index) =>
                        <Tag
                            key={tag.tagId}
                            className="tag"
                            onClose={this.handleCloseTag.bind(this, tag)}
                        >{tag.name}</Tag>
                    )
                }
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
                            type="dashed"
                            onClick={this.handleShowInput.bind(this)}
                        >
                            <span>+ New Tag</span>
                        </Button>
                }
            </div>
        )
    }

    handleCloseTag(tag) {
        const body = {};
        body.name = tag.name;
        this.tagStore.postTagDelete(body).then(response => {
            if (response) {
                this.tagStore.getTagList()
            }
        })
    }

    handleShowInput() {
        this.inputShow = true
    }

    handleInputChange(e) {
        this.inputValue = e.target.value;

    }

    handleInputConfirm() {
        if (!this.inputValue) {
            Message.error('标签名不能为空!');
            this.inputShow = false;
            return
        }

        const body = {};
        body.name = this.inputValue;
        this.tagStore.postTagAdd(body).then(response => {
            if (response) {
                this.inputShow = false;
                this.inputValue = '';
                this.tagStore.getTagList()
            }
        })
    }
}
