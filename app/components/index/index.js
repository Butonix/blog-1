/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import './index.sass'

@observer
export default class Homepage extends React.Component {

    @observable click;

    componentDidMount() {
        // console.log(this.props.history)
    }

    handleRegister() {
        this.click = false

    }

    handleLogin() {
        this.click = true

    }

    render() {
        return (
            <div className="homepage">
                {
                    this.click ?

                            <div>
                                <label>用户名:</label>
                                <input type="text"/><br/>
                                <label>密码:</label>
                                <input type="text"/>
                            </div>


                        :

                            <div>
                                <label>用户名:</label>
                                <input type="text"/><br/>
                                <label>密码:</label>
                                <input type="text"/><br/>
                                <label>确认密码:</label>
                                <input type="text"/>
                            </div>



                }
            </div>
        )
    }
}