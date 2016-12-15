import controller from './home.controller';
import './home.html';

let HomeComponent: ng.IComponentOptions = {
    controller,
    templateUrl: 'home.html'
};

export default HomeComponent;