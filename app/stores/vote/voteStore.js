/**
 * Created by scriptchao on 2017/12/1.
 */

import {action} from 'mobx';
import {message} from 'antd'
import xhr from '../xhr';
import {Spin} from '../../components/zyc';

class VoteStore {
    constructor() {
        this.voteUpdateUrl = '/vote/update';
        this.voteStatusUrl = '/vote/status';
    }

    @action postVoteUpdate(body) {
        Spin.show();

        return xhr({
            method: 'post',
            url: this.voteUpdateUrl,
            body,
        })
            .then((response) => {
                Spin.close();

                if (response.result) {
                    return Promise.resolve(response);
                }

                message.error(response.message);
                return false;

            });
    }

    @action postVoteStatus(body) {

        return xhr({
            method: 'post',
            url: this.voteStatusUrl,
            body,
        })
            .then((response) => {
                if (response.result) {
                    return Promise.resolve(response);
                }
                message.error(response.message);
                return false;

            });
    }
}

export default new VoteStore();
