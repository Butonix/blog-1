/**
 * Created by scriptchao on 2017/11/17.
 */

import { observable, action } from 'mobx';
import xhr from '../xhr';
import { Message } from '../../components/zyc';

class TagStore {

    constructor() {
        this.tagAddUrl = '/tag/add';
        this.tagListUrl = '/tag/list';
        this.tagDeleteUrl = '/tag/delete';
    }

    @action postTagDelete(body) {

        return xhr({
            method: 'post',
            url: this.tagDeleteUrl,
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

    @action postTagAdd(body) {

        return xhr({
            method: 'post',
            url: this.tagAddUrl,
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

    @action getTagList() {

        return xhr({
            method: 'get',
            url: this.tagListUrl,
        }).then((response) => {
            if (response.result) {
                return Promise.resolve(response);
            }
            Message.error(response.message);
            return false;


        });
    }

}

export default new TagStore();