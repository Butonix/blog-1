/**
 * Created by scriptchao on 2017/10/26.
 */

import 'whatwg-fetch'
import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react'
import Store from './stores'
import App from './routes'

ReactDom.render(
    <AppContainer>
        <Provider {...Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept()
}



