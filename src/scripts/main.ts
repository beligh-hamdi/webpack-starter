import * as angular from 'angular';

import '../assets/sass/main.scss';
import './core/config/configs';
import './components/components';

angular.module('app', [
    'app.configs',
    'app.components',
    'app.templates'
]);
