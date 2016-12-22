import * as angular from 'angular';
import enableHTML5Mode from './EnableHTML5Mode';

angular.module('app.configs', [])
    .config(enableHTML5Mode);