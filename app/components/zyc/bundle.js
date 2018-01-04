/**
 * Created by scriptchao on 2018/1/2.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Bundle extends React.Component {
    @observable component;

    async componentWillMount() {
        const { default: component } = await this.props.load();
        this.component = component;
    }

    render() {
        const { ...props } = this.props;
        const Component = this.component;

        return Component ? <Component {...props} /> : null;
    }
}

export default Bundle;

