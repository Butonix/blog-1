/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import './categories.sass'

@inject('TagStore') @observer
export default class Categories extends React.Component {

    @observable isRender;

    constructor(args) {
        super(args);
        this.tagStore = this.props.TagStore;
    }

    componentDidMount() {
        this.tagStore.getTagList().then(response => {
            if (response) {
                this.isRender = true
            }
        })
    }

    render() {
        let {tagList, tagCount} = this.tagStore;
        return (
            this.isRender ?
                <div className="categories">
                    <h1>categories</h1>
                    <div className="categories-count">{`目前共计${tagCount}个分类`}</div>
                    <ul className="categories-list">
                        {
                            tagList.map((tag, index) =>

                                <li key={tag.tagId}>
                                    <Link to={`/categories/${tag.name}`} className="zyc-link-hover">{tag.name}</Link>
                                    <span>{`(${tag.count})`}</span>
                                </li>
                            )
                        }
                    </ul>
                </div> : null
        )
    }
}
