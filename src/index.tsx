import * as React from 'react';
import { render } from 'react-dom';
import Sapper from './sapper';

const rootElement = document.getElementById('root');
render(<Sapper />, rootElement);
