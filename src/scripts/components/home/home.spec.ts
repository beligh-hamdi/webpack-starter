import {expect} from 'chai';
import Home from  './home';
import * as angular from 'angular';

describe('Home', () => {

    let $componentController: ng.IComponentControllerService;
    let $rootScope: ng.IRootScopeService;
    let $location: ng.ILocationService;
    let $compile: ng.ICompileService;
    let $state: ng.ui.IStateService;

    beforeEach(angular.mock.module(Home));

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
        $compile = $injector.get('$compile');
        $componentController = $injector.get<ng.IComponentControllerService>('$componentController');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $state = $injector.get<ng.ui.IStateService>('$state');
    }));

    it('should be exist.', () => {
        expect(Home).to.be.exist;
    });

    describe('Module', () => {

        it('should have home as default component.', () => {
            $location.url('/');
            $rootScope.$digest();
            expect($state.current.name).to.eq('home');
        });

    });

    describe('Controller', () => {

        let controller: ng.IComponentController;

        beforeEach(() => {
            controller = $componentController('home', {
                scope: $rootScope.$new()
            });
        });

        it('should has a name property.', () => {
            expect(controller).to.have.property('name', 'home');
        });
    });

    describe('View', () => {
        let scope: ng.IScope;
        let template: ng.IAugmentedJQuery;

        beforeEach(() => {
            scope = $rootScope.$new();
            template = $compile('<home></home>')(scope);
            scope.$apply();
        });

        it('should have a title.', () => {
            expect(template.find('h1').html()).to.equals('home');
        });

    });

});
