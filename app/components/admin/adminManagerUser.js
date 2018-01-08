/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Table from 'rc-table';
import Pagination from 'rc-pagination';
import './adminManagerUser.scss';
import { Dialog, Input, Button } from '../zyc';

@inject('UserStore') @observer
export default class AdminManagerUser extends React.Component {
    @observable page = 1;
    @observable size = 5;
    @observable authorityShow;
    @observable userType;
    @observable userId;

    constructor(args) {
        super(args);
        this.userStore = this.props.UserStore;
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        const body = {};
        body.page = this.page;
        body.size = this.size;
        this.userStore.postUserList(body);
    }

    handlePageChange(current) {
        this.page = current;
        this.getUserList();
    }

    handleUse(userId, isUsed) {
        const body = {};
        body.userId = userId;
        body.isUsed = isUsed;
        this.userStore.postUserUpdate(body).then((response) => {
            if (response) {
                this.getUserList();
            }
        });
    }

    handleDelete(userId) {
        const body = {};
        body.userId = userId;
        this.userStore.postUserDelete(body).then((response) => {
            if (response) {
                this.getUserList();
            }
        });
    }

    handleModify(userType, userId) {
        this.userType = userType;
        this.userId = userId;
        this.authorityShow = true;

    }

    handleChangeType(userType) {
        this.userType = userType;
    }

    handleClose() {
        this.authorityShow = false;
    }

    handleOk() {
        const body = {};
        body.userId = this.userId;
        body.userType = this.userType;
        this.userStore.postUserUpdate(body).then((response) => {
            if (response) {
                this.authorityShow = false;
                this.getUserList();
            }
        });
    }

    render() {
        const { userList, userCount } = this.userStore;

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
            width: '15%',
            render: (value, row) => {
                const arr = ['未知', '管理员', '用户', '游客'];
                return arr[value];
            }
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
            render: (value, row) => (
                row.userType !== 1 ?
                    <span className="zyc-text-hover" onClick={this.handleModify.bind(this, row.userType, row.userId)}>修改</span> : null
            )
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
                        <input
                            type="radio"
                            name="type"
                            checked={this.userType == 2}
                            onChange={this.handleChangeType.bind(this, 2)} />
                        <label className="user">用户</label>
                        <input
                            type="radio"
                            name="type"
                            checked={this.userType == 3}
                            onChange={this.handleChangeType.bind(this, 3)} />
                        <label>游客</label>
                    </div>
                </Dialog>
            </div>
        );
    }
}
