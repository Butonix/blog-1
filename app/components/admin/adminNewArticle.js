/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './adminNewArticle.sass'
import {Button, Select} from '../zyc'


@observer
export default class AdminNewArticle extends React.Component {

    render() {
        let tags = [1, 2, 3, 4];
        return (
            <div className="admin-newArticle">
                <h2>发布文章</h2>
                <section>
                    <span>标题</span>
                    <input type="text" placeholder="请输入文章标题"/>
                    <span>正文</span>
                    <textarea placeholder="请输入正文内容">{null}</textarea>
                    <span>分类</span>
                    <Select
                        className="select"
                        onSelectTags={this.handleSelectTags.bind(this)}
                    >
                        {
                            tags.map(tag =>
                                <Select.Item
                                    key={tag}
                                >{tag}
                                </Select.Item>
                            )
                        }
                    </Select>
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
                </section>
            </div>
        )
    }

    handleSelectTags(tags) {
        console.log(tags.length)

    }

    handlePublish() {

    }

    handleSaveArticle() {

    }

    handlePreView() {

    }

}
