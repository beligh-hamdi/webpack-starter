import * as angular from 'angular';
import 'angular-ui-router';

import HomeRoute from './home.route';
import HomeComponent from './home.component';

let home = angular
    .module('home', ['ui.router'])
    .component('home', HomeComponent)
    .config(HomeRoute)
    .name;

export default home;
