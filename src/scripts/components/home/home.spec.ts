import {expect} from 'chai';
import Home from  './home';
import * as angular from 'angular';

describe('Home', () => {

    let $componentController: ng.IComponentControllerService;
    let $rootScope: ng.IRootScopeService;
    let $location: ng.ILocationService;
    let $state: ng.ui.IStateService;

    beforeEach(angular.mock.module(Home));

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
        $componentController = $injector.get<ng.IComponentControllerService>('$componentController');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $state = $injector.get<ng.ui.IStateService>('$state');
    }));
    
    it('should be exist.', () => {
        expect(Home).to.be.exist;
    });

    describe('Controller', () => {

        let controller: ng.IComponentController;

        beforeEach(() => {
            controller = $componentController('home', {
                scope: $rootScope.$new()
            });
        });

        it('should has a name property', () => { 
            expect(controller).to.have.property('name', 'home');
        });
    });
});
