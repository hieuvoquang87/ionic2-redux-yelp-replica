import {Component} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {NavController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';

import {YelpActions} from '../../actions/yelp-actions';

interface IAppState {
    yelpData: Object
}

@Component({
    templateUrl: 'build/pages/yelp-page/yelp-page.html',
    providers: [YelpActions],
    pipes: [DecimalPipe]
})
export class YelpPage {
    @select(state => {
        return state.yelpData.results.businesses
    }) businesses;
    data:Object;
    constructor(
        private navController: NavController, 
        private ngRedux:NgRedux<IAppState>,
        private yelpActions:YelpActions) {
            //this.yelpActions.getInitialData();
            this.yelpActions.getInitialData();
    }
}
