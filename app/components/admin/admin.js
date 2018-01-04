/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


@observer
export default class Admin extends React.Component {

    render() {
        return (
            <div className="admin">
                <h1>Welcome to my blog</h1>
            </div>
        );
    }
}
