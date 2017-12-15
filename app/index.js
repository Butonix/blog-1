/**
 * Created by scriptchao on 2017/10/26.
 */

import 'whatwg-fetch'
import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react'
import Stores from './stores/index'
import App from './routes/index'

window.stores = window.stores || Stores; // react-hot-loader 警告

ReactDom.render(
    <AppContainer warnings={false}>
        <Provider {...stores}>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept()
}




