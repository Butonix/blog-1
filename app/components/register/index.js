/**
 * Created by scriptchao on 2018/2/24.
 */

import React from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import md5 from 'blueimp-md5';
import {Button, Input, Icon, message, Modal} from 'antd';
import {Username, Password} from '../public/regular';
import './index.sass'


@inject('UserStore') @observer
export default class Register extends React.Component {

    @observable username = '';
    @observable password = '';
    @observable passwordRe = '';

    constructor(props) {
        super(props);
        this.userStore = this.props.UserStore;
    }


    handleRegister() {

        if (!Username.test(this.username)) {
            message.error('请输入5-16位不含中文的字符!');
        } else if (!Password.test(this.password)) {
            message.error('请输入以字母开头的5-16位不含中文的字符!');
        } else if (this.password !== this.passwordRe) {

            message.error('两次输入密码不一致!');
        } else {
            const body = {};
            body.username = this.username;
            body.password = md5(this.password);

            this.userStore.postRegister(body)
                .then((response) => {
                    if (response) {
                        this.userStore.postLogin(body)
                            .then((response1) => {
                                if (response1) {
                                    this.props.onCancel();
                                    localStorage.setItem('expired', +new Date());
                                    this.userStore.getUserInfo();
                                }
                            });
                    }
                });
        }
    }

    render() {
        const { ...props } = this.props;
        return (
            <Modal
                title="注册"
                footer={null}
                width={400}
                {...props}
            >
                <div className="dialog-register">
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="username"
                        className="ipt"
                        value={this.username}
                        onChange={(e) => {
                            this.username = e.target.value
                        }}
                    />
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        type="password"
                        placeholder="password"
                        className="ipt"
                        value={this.password}
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                    />
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="repeat password"
                        type="password"
                        className="ipt"
                        value={this.passwordRe}
                        onChange={(e) => {
                            this.passwordRe = e.target.value
                        }}
                    />
                    <Button
                        type="primary"
                        style={{ width: '100%', borderRadius: '20px' }}
                        onClick={this.handleRegister.bind(this)}
                    >
                        注册
                    </Button>
                </div>
            </Modal>
        );
    }
}
