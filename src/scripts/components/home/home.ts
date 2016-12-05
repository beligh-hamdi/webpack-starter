import * as angular from 'angular';

import HomeRoute from './home.route';
import HomeComponent from './home.component';

let home = angular
    .module('home', [])
    .component('home', HomeComponent)
    .config(HomeRoute)
    .name;
    
export default home;
