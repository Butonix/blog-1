/**
 * Created by scriptchao on 2017/10/30.
 */

import React, {Fragment} from 'react';
import {observable, toJS} from 'mobx';
import {inject, observer} from 'mobx-react';
import {Pagination, Table, Divider, Popconfirm, Modal, Input, Radio} from 'antd';
import './adminManagerUser.sass';

const {Column} = Table;

@inject('UserStore') @observer
export default class AdminManagerUser extends React.Component {
    @observable page = 1;
    @observable size = 5;

    @observable authorityShow;

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

    handleDeleteSure = (userId) => {

        const body = {};
        body.userId = userId;
        this.userStore.postUserDelete(body)
            .then((response) => {
                if (response) {
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

    handleChangeType(e) {
        this.userType = e.target.value;
    }

    handleClose = () => {
        this.authorityShow = false;
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
                        scroll={{x: 450}}
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
                                    <Popconfirm
                                        title="是否确认删除?"
                                        okText="确认"
                                        cancelText="取消"
                                        onConfirm={this.handleDeleteSure.bind(this, row.userId)}
                                    >
                                        <a>删除</a>
                                    </Popconfirm>
                                </Fragment>
                            }
                        />
                        <Column
                            title="权限"
                            dataIndex="authority"
                            render={(value, row) => (
                                row.userType !== 1 ?
                                    <a onClick={this.handleModify.bind(this, row.userType, row.userId)}>修改</a> : null
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
                <Modal
                    title="权限修改"
                    visible={this.authorityShow}
                    width={300}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.handleModifySure}
                    onCancel={this.handleClose}
                >
                    <div className="dialog-authority">
                        <Radio.Group
                            value={this.userType}
                            onChange={this.handleChangeType.bind(this)}

                        >
                            <Radio value={2}>用户</Radio>
                            <Radio value={3}>游客</Radio>
                        </Radio.Group>
                    </div>
                </Modal>
            </div>
        );
    }
}
