/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'


@inject('TagStore') @observer
export default class Categories extends React.Component {
    constructor(args) {
        super(args);
        this.tagStore = this.props.TagStore;
    }

    componentDidMount() {
        this.tagStore.getTagList()
    }

    render() {
        let {tagList, tagCount} = this.tagStore;
        return (
            <div className="categories">
                <h1>categories</h1>
                <div className="categories-count">{`目前共计${tagCount}个分类`}</div>
                <ul className="categorise-list">
                    {
                        tagList.map((tag, index) =>
                            <li key={tag.tagId}>
                                <Link to="#">{tag.name}</Link>
                                <span>{`(${tag.count})`}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
