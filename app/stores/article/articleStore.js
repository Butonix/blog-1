/**
 * Created by scriptchao on 2017/11/17.
 */

import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message} from '../../components/zyc'

class ArticleStore {

    constructor() {
        this.articleAddUrl = '/article/add'
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

}

export default new ArticleStore