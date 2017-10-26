/**
 * Created by scriptchao on 2017/10/26.
 */

import 'whatwg-fetch'
import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'mobx-react'
import createHistory from 'history/createBrowserHistory'
import Store from './stores'
import App from './routes'


const history = createHistory();


ReactDom.render(
    <AppContainer>
        <Provider {...Store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept()
}

