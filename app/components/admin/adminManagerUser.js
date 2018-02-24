/**
 * Created by scriptchao on 2017/10/30.
 */

import React, {Fragment} from 'react';
import {observable, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Pagination, Table, Divider} from 'antd';
import './adminManagerUser.sass';
import {Dialog, Input, Button} from '../zyc';
import DialogDelete from '../common/dialogDelete'

const { Column } = Table;

@inject('UserStore') @observer
export default class AdminManagerUser extends React.Component {
    @observable page = 1;
    @observable size = 5;

    @observable authorityShow;
    @observable deleteShow;

    @observable userType;
    @observable userId;

    @observable userList = [];
    @observable userTotal = 0;

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
        this.userStore.postUserList(body)
            .then((response) => {
                if (response) {
                    this.userList = response.data.list;
                    this.userTotal = response.data.total;

                }
            })
    }

    handlePageChange(current) {
        this.page = current;
        this.getUserList();
    }

    handleUse(userId, isUsed) {
        const body = {};
        body.userId = userId;
        body.isUsed = isUsed;
        this.userStore.postUserUpdate(body)
            .then((response) => {
                if (response) {
                    this.getUserList();
                }
            });
    }

    handleDelete(userId) {
        this.userId = userId;
        this.deleteShow = true;

    }

    handleDeleteSure = () => {

        const body = {};
        body.userId = this.userId;
        this.userStore.postUserDelete(body)
            .then((response) => {
                if (response) {
                    this.deleteShow = false;
                    this.getUserList();
                }
            });
    };

    handleModify(userType, userId) {
        this.userType = userType;
        this.userId = userId;
        this.authorityShow = true;
    }

    handleModifySure = () => {
        const body = {};
        body.userId = this.userId;
        body.userType = this.userType;
        this.userStore.postUserUpdate(body)
            .then((response) => {
                if (response) {
                    this.authorityShow = false;
                    this.getUserList();
                }
            });
    };

    handleChangeType(userType) {
        this.userType = userType;
    }

    handleClose = () => {
        this.authorityShow = false;
        this.deleteShow = false;
    };


    render() {

        return (
            <div className="admin-managerUser">
                <h2>用户管理</h2>
                <section>
                    <Table
                        dataSource={toJS(this.userList)}
                        rowKey="userId"
                        pagination={false}
                        scroll={{ x: 450 }}
                        rowClassName="row"
                    >
                        <Column
                            title="姓名"
                            dataIndex="username"
                        />
                        <Column
                            title="userId"
                            dataIndex="userId"
                        />
                        <Column
                            title="身份"
                            dataIndex="userType"
                            render={(value, row) => {
                                const arr = ['未知', '管理员', '用户', '游客'];
                                return arr[value];
                            }}
                        />
                        <Column
                            title="操作"
                            dataIndex="operation"
                            render={(value, row) =>
                                <Fragment>
                                    {
                                        row.isUsed ?
                                            <a
                                                className="zyc-text-green"
                                                onClick={this.handleUse.bind(this, row.userId, false)}>启用中</a> :
                                            <a
                                                className="zyc-text-red"
                                                onClick={this.handleUse.bind(this, row.userId, true)}>禁用中</a>
                                    }
                                    <Divider type="vertical"/>
                                    <a onClick={this.handleDelete.bind(this, row.userId)}>删除</a>
                                </Fragment>
                            }
                        />
                        <Column
                            title="权限"
                            dataIndex="authority"
                            render={(value, row) => (
                                row.userType !== 1 ?
                                    <span
                                        className="zyc-text-hover"
                                        onClick={this.handleModify.bind(this, row.userType, row.userId)}>修改</span> : null
                            )}
                        />
                    </Table>
                </section>
                <div className="zyc-pager">
                    <Pagination
                        current={this.page}
                        pageSize={this.size}
                        total={this.userTotal}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
                <Dialog
                    title="权限修改"
                    show={this.authorityShow}
                    width={300}
                    onOk={this.handleModifySure}
                    onClose={this.handleClose}
                >
                    <div className="dialog-authority">
                        <input
                            type="radio"
                            name="type"
                            checked={this.userType === 2}
                            onChange={this.handleChangeType.bind(this, 2)}/>
                        <label className="user">用户</label>
                        <input
                            type="radio"
                            name="type"
                            checked={this.userType === 3}
                            onChange={this.handleChangeType.bind(this, 3)}/>
                        <label>游客</label>
                    </div>
                </Dialog>
                <DialogDelete
                    show={this.deleteShow}
                    onOk={this.handleDeleteSure}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}
