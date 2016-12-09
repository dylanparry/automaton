import React from 'react';
import ReactDOM from 'react-dom';
import { webFrame } from 'electron';

import Router from './components/navigation/router';

// Disable zooming
webFrame.setZoomLevelLimits(1, 1);

ReactDOM.render(React.createElement(Router), document.getElementById('app'));
