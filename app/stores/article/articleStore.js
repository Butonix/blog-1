/**
 * Created by scriptchao on 2017/11/17.
 */

import { observable, action } from 'mobx';
import xhr from '../xhr';
import { Message } from '../../components/zyc';

class ArticleStore {
    @observable articleList = [];
    @observable articleCount = 0;
    @observable articleDetail = {};

    constructor() {
        this.articleAddUrl = '/article/add';
        this.articleListUrl = '/article/list';
        this.articleDeleteUrl = '/article/delete';
        this.articleDetailUrl = '/article/detail';
        this.articleUpdateUrl = '/article/update';
        this.articleUpdateReadCountUrl = '/article/update/readCount';
        this.articleDetailTitleUrl = '/article/detail/title';
    }

    @action clearStore() {
        this.articleList = [];
        this.articleCount = 0;
        this.articleDetail = {};
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
            Message.error(response.message);
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
            Message.error(response.message);
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
                Message.success(response.message);
                return Promise.resolve(response);
            }
            Message.error(response.message);
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
                Message.success(response.message);
                return Promise.resolve(response);
            }
            Message.error(response.message);
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
                this.articleList = response.data.list;
                this.articleCount = response.data.total;
                return Promise.resolve(response);
            }
            Message.error(response.message);
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
                Message.success(response.message);
                return Promise.resolve(response);
            }
            Message.error(response.message);
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
                this.articleDetail = response.data;
                return Promise.resolve(response);
            }
            Message.error(response.message);
            return false;


        });
    }
}

export default new ArticleStore();