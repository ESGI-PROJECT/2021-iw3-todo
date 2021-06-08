import page from 'page';

import './task-app.js';

page('/', () => import('./views/task-list.js'));

page();