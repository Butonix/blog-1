/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observer } from 'mobx-react';
import './main.scss';

@observer
export default class Main extends React.Component {

    render() {
        return (
            <main className="com-main">
                <div className="com-main-inner">
                    {this.props.children}
                </div>
            </main>
        );
    }
}
