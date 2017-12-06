/**
 * Created by scriptchao on 2017/12/1.
 */

import {observable, action} from 'mobx'
import xhr from '../xhr'
import {Message,Spin} from '../../components/zyc'

class VoteStore {
    constructor() {
        this.voteUpdateUrl = '/vote/update';
        this.voteStatusUrl = '/vote/status'
    }

    @action postVoteUpdate(body) {
        Spin.show();

        return xhr({
            method: 'post',
            url: this.voteUpdateUrl,
            body: body
        }).then(response => {
            Spin.close();
            if (response.result) {
                return Promise.resolve(response)
            } else {
                Message.error(response.message);
            }
        })
    }

    @action postVoteStatus(body) {

        return xhr({
            method: 'post',
            url: this.voteStatusUrl,
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

export default new VoteStore
