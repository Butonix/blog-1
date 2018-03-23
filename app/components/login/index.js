/**
 * Created by scriptchao on 2018/2/24.
 */

/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import md5 from 'blueimp-md5';
import {Button, Input, Icon, message, Modal} from 'antd';
import './index.sass'


@inject('UserStore') @observer
export default class Login extends React.Component {

    @observable username = '';
    @observable password = '';

    constructor(props) {
        super(props);
        this.userStore = this.props.UserStore;
    }


    handleLogin() {

        if (!this.username) {
            message.error('用户名不能为空!');
        } else if (!this.password) {
            message.error('密码不能为空!');
        } else {
            const body = {};
            body.username = this.username;
            body.password = md5(this.password);

            this.userStore.postLogin(body)
                .then((response) => {
                    if (response) {
                        this.props.onCancel();
                        localStorage.setItem('expired', +new Date());
                        this.userStore.getUserInfo();
                    }
                });
        }
    }

    render() {
        const {...props} = this.props;
        return (
            <Modal
                title="登录"
                footer={null}
                width={400}
                {...props}
            >
                <div className="dialog-login">
                    <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="username"
                        className="ipt"
                        value={this.username}
                        onChange={(e) => {
                            this.username = e.target.value
                        }}
                    />
                    <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="password"
                        type="password"
                        className="ipt"
                        value={this.password}
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                    />
                    <Button
                        type="primary"
                        style={{width: '100%', borderRadius: '20px'}}
                        onClick={this.handleLogin.bind(this)}
                    >
                        登录
                    </Button>
                </div>
            </Modal>
        );
    }
}
