import * as angular from 'angular';
import AppComponent from './app.component';

let app = angular
    .module('app.root', [])
    .component('app', AppComponent)
    .name;

export default app;