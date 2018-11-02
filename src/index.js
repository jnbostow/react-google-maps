import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Check for browser support of service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            // Successful registration
            console.log('Hooray. Registration successful, scope is:', registration.scope);
        }).catch(function(err) {
        // Failed registration, service worker won’t be installed
        console.log('Whoops. Service worker registration failed, error:', err);
    });
}