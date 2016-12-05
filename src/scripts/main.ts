import * as angular from 'angular';
import 'angular-ui-router';

import enableHTML5Mode from './core/config/EnableHTML5Mode';

import AppComponent from './components/app/app';
import Home from './components/home/home';

angular
    .module('app', ['ui.router', 'app.templates', Home])
    .config(enableHTML5Mode)
    .component('app', AppComponent);