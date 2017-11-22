/**
 * Created by scriptchao on 2017/11/17.
 */

import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message} from '../../components/zyc'

class ArticleStore {
    @observable articleList = [];

    constructor() {
        this.articleAddUrl = '/article/add';
        this.articleListUrl = '/article/list';
        this.articleDeleteUrl = '/article/delete';
        this.articleEditUrl = '/article/edit';
        this.articleUpdateUrl = '/article/update'
    }

    @action postArticleUpdate(body) {

        return xhr({
            method: 'post',
            url: this.articleUpdateUrl,
            body: body
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postArticleAdd(body) {

        return xhr({
            method: 'post',
            url: this.articleAddUrl,
            body: body
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postArticleList(body) {

        return xhr({
            method: 'post',
            url: this.articleListUrl,
            body: body
        }).then(response => {
            if (response.result) {
                this.articleList = response.data.list;
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postArticleDelete(body) {

        return xhr({
            method: 'post',
            url: this.articleDeleteUrl,
            body: body
        }).then(response => {
            if (response.result) {
                Message.success(response.message);
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postArticleEdit(body) {

        return xhr({
            method: 'post',
            url: this.articleEditUrl,
            body: body
        }).then(response => {
            if (response.result) {
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }


}

export default new ArticleStore