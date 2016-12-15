import {expect} from 'chai';
import Home from  './home';

describe('Home', () => {

    let $componentController: ng.IComponentControllerService;
    let $rootScope: ng.IRootScopeService;
    let $location: ng.ILocationService;
    let $state: ng.ui.IStateService;

    beforeEach(window['module'](Home));

    beforeEach(inject(($injector) => {
        $componentController = $injector.get('$componentController');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $state = $injector.get('$state');
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
