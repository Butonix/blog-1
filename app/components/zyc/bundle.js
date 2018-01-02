/**
 * Created by scriptchao on 2018/1/2.
 */

import React from 'react';
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class Bundle extends React.Component {
    @observable component;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.load().then(Component => this.component = Component.default);
    }

    render() {
        const {...props} = this.props;
        const Component = this.component;

        return Component ? <Component {...props} /> : null;
    }
}

export default Bundle;

