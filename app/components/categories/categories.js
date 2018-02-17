/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {Row, Col} from 'antd'
import './categories.sass';
import HomeCustom from '../common/homeCustom'

@inject('TagStore') @observer
export default class Categories extends React.Component {

    @observable tagList = [];
    @observable tagTotal = 0;

    constructor(args) {
        super(args);
        this.tagStore = this.props.TagStore;
    }

    componentDidMount() {
        this.tagStore.getTagList().then((response) => {
            if (response) {
                this.tagList = response.data.list;
                this.tagTotal = response.data.total;
            }
        });
    }

    render() {
        return (
            <div className="categories">
                <Row>
                    <Col
                        md={15}
                        xs={24}
                    >
                        <h1>categories</h1>
                        <div className="categories-count">{`目前共计${this.tagTotal}个分类`}</div>
                        <ul className="categories-list">
                            {
                                this.tagList.map((tag, index) =>

                                    <li key={tag.tagId}>
                                        <Link
                                            to={`/categories/${tag.name}`}
                                            className="zyc-link-hover">{tag.name}</Link>
                                        <span>{`(${tag.count})`}</span>
                                    </li>)
                            }
                        </ul>
                    </Col>
                    <Col
                        md={{span: 8, offset: 1}}
                        xs={0}
                    >
                        <HomeCustom/>
                    </Col>
                    <Col
                        md={0}
                        xs={24}
                    >
                        <HomeCustom/>
                    </Col>
                </Row>
            </div>
        );
    }
}
