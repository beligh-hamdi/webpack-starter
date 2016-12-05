export default function (
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        component: 'home'
    });
}