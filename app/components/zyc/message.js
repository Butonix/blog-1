/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import ReactDom from 'react-dom'
import './message.sass'

@observer
class Message extends React.Component {

    @observable content = [];

    render() {
        return (
            <div className="zyc-message" data-flex="dir:top cross:center">
                {
                    this.content.map((item, index) =>
                        <Item
                            key={item.id}
                            message={item.message}
                            icon={item.icon}
                            type={item.type}
                            onUpdate={this.handleUpdate.bind(this, index)}
                        />
                    )
                }
            </div>
        )
    }

    handleUpdate(index) {
        this.content.splice(index, 1)
    }

    success(message) {
        this.content.push({
            message: message,
            icon: 'zhengque',
            type: 'success',
            id: Math.floor(Math.random() * 10000)
        })
    }

    error(message) {
        this.content.push({
            message: message,
            icon: 'cuowu',
            type: 'error',
            id: Math.floor(Math.random() * 10000)
        })
    }

}

class Item extends React.Component {

    componentDidMount() {
        let timer = setTimeout(() => {
            this.props.onUpdate();
            clearTimeout(timer)
        }, 4000)
    }

    render() {
        let {message, icon, type} = this.props;

        return (
            <div className={`message-item ${type}`}>
                <i className={`iconfont icon-${icon}`}>{null}</i>
                <span>{message}</span>
            </div>
        )
    }
}


function render() {
    return ReactDom.render(<Message />, document.getElementById('message'))
}

function success(message) {
    const MESSAGE = render();

    MESSAGE.success(message)
}

function error(message) {
    const MESSAGE = render();

    MESSAGE.error(message)

}

export default {success, error}

