export default function ($locationProvider: ng.ILocationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
}