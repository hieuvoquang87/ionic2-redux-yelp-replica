import { Injectable, Inject } from '@angular/core';
import {NgRedux} from 'ng2-redux';
const reduxLogger: any = require('redux-logger');


import {rootReducer} from '../reducers/root-reducer';

@Injectable()
export class Store {
    constructor(private ngRedux: NgRedux<any>) {
        this.ngRedux.configureStore(rootReducer,
            {}, // Inital State
            [
                reduxLogger()
            ]);
    }
} 