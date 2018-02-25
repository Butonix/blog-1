/**
 * Created by scriptchao on 2017/11/17.
 */

import {observable, action} from 'mobx';
import {message} from 'antd'
import xhr from '../xhr';

class ArticleStore {
    @observable latestList = [];

    constructor() {
        this.articleAddUrl = '/article/add';
        this.articleListUrl = '/article/list';
        this.articleDeleteUrl = '/article/delete';
        this.articleDetailUrl = '/article/detail';
        this.articleUpdateUrl = '/article/update';
        this.articleUpdateReadCountUrl = '/article/update/readCount';
        this.articleDetailTitleUrl = '/article/detail/title';
    }

    initStore() {
        this.latestArticle()
    }

    latestArticle() {
        const body = {};
        body.page = 1;
        body.size = 5;
        body.isPublish = true;
        this.postArticleList(body).then((response) => {
            if (response) {
                this.latestList = response.data.list;
            }
        })
    }


    @action postArticleDetailTitle(body) {

        return xhr({
            method: 'post',
            url: this.articleDetailTitleUrl,
            body,
        }).then((response) => {
            if (response.result) {
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postArticleUpdateReadCount(body) {

        return xhr({
            method: 'post',
            url: this.articleUpdateReadCountUrl,
            body,
        }).then((response) => {
            if (response.result) {
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postArticleUpdate(body) {

        return xhr({
            method: 'post',
            url: this.articleUpdateUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postArticleAdd(body) {

        return xhr({
            method: 'post',
            url: this.articleAddUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postArticleList(body) {

        return xhr({
            method: 'post',
            url: this.articleListUrl,
            body,
        }).then((response) => {

            if (response.result) {
                return Promise.resolve(response);
            }

            message.error(response.message);

            return false;

        });
    }

    @action postArticleDelete(body) {

        return xhr({
            method: 'post',
            url: this.articleDeleteUrl,
            body,
        }).then((response) => {
            if (response.result) {
                message.success(response.message);
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;

        });
    }

    @action postArticleDetail(body) {

        return xhr({
            method: 'post',
            url: this.articleDetailUrl,
            body,
        }).then((response) => {
            if (response.result) {
                return Promise.resolve(response);
            }
            message.error(response.message);
            return false;


        });
    }
}

export default new ArticleStore();
