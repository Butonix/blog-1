/**
 * Created by scriptchao on 2017/11/17.
 */

import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message} from '../../components/zyc'

class TagStore {

    @observable tagList = [];
    @observable tagCount = 0;

    constructor() {
        this.tagAddUrl = '/tag/add';
        this.tagListUrl = '/tag/list';
        this.tagDeleteUrl = '/tag/delete';
    }

    @action clearStore() {
        this.tagList = [];
        this.tagCount = 0;
    }

    @action postTagDelete(body) {

        return xhr({
            method: 'post',
            url: this.tagDeleteUrl,
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

    @action postTagAdd(body) {

        return xhr({
            method: 'post',
            url: this.tagAddUrl,
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

    @action getTagList() {

        return xhr({
            method: 'get',
            url: this.tagListUrl,
        }).then(response => {
            if (response.result) {
                this.tagList = response.data.list;
                this.tagCount = response.data.total;
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

}

export default new TagStore