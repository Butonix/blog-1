/**
 * Created by scriptchao on 2017/10/26.
 */

import 'whatwg-fetch'
import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react'
import Stores from './stores'
import App from './routes'

window.stores = window.stores || Stores;

ReactDom.render(
    <Provider {...stores}>
        <AppContainer warnings={false}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContainer>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept()
}




