/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import Table from 'rc-table'
import Pagination from 'rc-pagination'
import './adminManagerUser.sass'
import {Dialog, Input, Button} from '../zyc'

@inject('UserStore') @observer
export default class AdminManagerUser extends React.Component {
    @observable page = 1;
    @observable size = 5;
    @observable authorityShow;

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        let body = {};
        body.page = this.page;
        body.size = this.size;
        this.userStore.postUserList(body)
    }

    handlePageChange(current) {
        this.page = current;
        this.getUserList()
    }

    handleUse(userId, isUsed) {
        let body = {};
        body.userId = userId;
        body.isUsed = isUsed;
        this.userStore.postUserUpdate(body).then(response => {
            if (response) {
                this.getUserList()
            }
        })
    }

    handleDelete(userId) {
        let body = {};
        body.userId = userId;
        this.userStore.postUserDelete(body).then(response => {
            if (response) {
                this.getUserList()
            }
        })
    }

    handleModify() {
        this.authorityShow = true

    }

    handleClose() {
        this.authorityShow = false
    }

    handleOk() {
        this.authorityShow = false
    }

    render() {
        let {userList, userCount} = this.userStore;

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            width: '15%'
        }, {
            title: 'userId',
            dataIndex: 'userId',
            width: '20%'
        }, {
            title: '密码(加密后)',
            dataIndex: 'password',
            width: '20%'
        }, {
            title: '身份',
            dataIndex: 'userType',
            width: '15%'
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (value, row) =>
                <div>
                    {
                        row.isUsed ?
                            <span className="zyc-text-green zyc-text-hover zyc-text-space"
                                  onClick={this.handleUse.bind(this, row.userId, false)}>启用中</span> :
                            <span className="zyc-text-red zyc-text-hover zyc-text-space"
                                  onClick={this.handleUse.bind(this, row.userId, true)}>禁用中</span>
                    }
                    <span className="zyc-text-hover zyc-text-space"
                          onClick={this.handleDelete.bind(this, row.userId)}>删除</span>
                </div>
        }, {
            title: '权限',
            dataIndex: 'authority',
            width: '10%',
            render: (value, row) => row.userType !== 'admin' ?
                <span className="zyc-text-hover" onClick={this.handleModify.bind(this)}>修改</span> : null
        }];

        return (
            <div className="admin-managerUser">
                <h2>用户管理</h2>
                <section>
                    <Table
                        columns={columns}
                        data={toJS(userList)}
                        rowKey="userId"
                    />
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={userCount}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
                <Dialog
                    title="权限修改"
                    show={this.authorityShow}
                    width={300}
                    onOk={this.handleOk.bind(this)}
                    onClose={this.handleClose.bind(this)}
                >
                    <div className="dialog-authority">
                        <input type="radio" name="type"/>
                        <label className="user">用户</label>
                        <input type="radio" name="type"/>
                        <label>游客</label>
                    </div>
                </Dialog>
            </div>
        )
    }
}
