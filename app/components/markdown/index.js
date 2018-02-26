/**
 * Created by scriptchao on 2018/2/26.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css/github-markdown.css'
import './index.sass'

export default class Markdown extends React.Component {

    componentWillMount() {

        marked.setOptions({
            highlight: code => highlight.highlightAuto(code).value,
        })
    }

    render() {
        const { content } = this.props;
        return (
            <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
            >
            </div>
        )
    }
}

