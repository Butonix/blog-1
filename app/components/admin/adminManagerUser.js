/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import Table from 'rc-table'
import Pagination from 'rc-pagination'
import './adminManagerUser.sass'
import {Button} from '../zyc'

@inject('UserStore') @observer
export default class AdminManagerUser extends React.Component {
    @observable page = 1;
    @observable size = 5;
    @observable total = 0;

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
        this.userStore.postUserList(body).then(response => {
            if (response) {
                this.total = response.data.total
            }
        })
    }

    handlePageChange(current) {
        this.page = current;
        this.getUserList()
    }

    handleUse(id, isUsed) {
        let body = {};
        body.id = id;
        body.isUsed = isUsed;
        this.userStore.postUserUpdate(body).then(response => {
            if (response) {
                this.getUserList()
            }
        })
    }

    handleDelete(id) {
        let body = {};
        body.id = id;
        this.userStore.postUserDelete(body).then(response => {
            if (response) {
                this.getUserList()
            }
        })
    }

    render() {
        let {userList} = this.userStore;

        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            width: '15%'
        }, {
            title: 'ID',
            dataIndex: '_id',
            width: '25%'
        }, {
            title: '密码(加密后)',
            dataIndex: 'password',
            width: '25%'
        }, {
            title: '身份',
            dataIndex: 'userType',
            width: '15%'
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (value, row) =>
                <div className="managerUser-operation">
                    {
                        row.isUsed ?
                            <a className="zyc-text-green" onClick={this.handleUse.bind(this, row._id, false)}>启用中</a> :
                            <a className="zyc-text-red" onClick={this.handleUse.bind(this, row._id, true)}>禁用中</a>
                    }
                    <a onClick={this.handleDelete.bind(this, row._id)}>删除</a>
                </div>
        }];

        return (
            <div className="admin-managerUser">
                <h2>用户管理</h2>
                <section>
                    <Table
                        columns={columns}
                        data={toJS(userList)}
                        rowKey="_id"
                    />
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={this.total}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
