import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

interface YelpData {
    page: string,
    isLoading: boolean,
    hasMore: boolean,
    results: Object,
    lat: string,
    lon: string
}

@Injectable()
export class YelpActions {
    headers: Headers;
    constructor(private ngRedux: NgRedux<any>,
        private http: Http,
        private platform: Platform) {
        this.headers = new Headers({
            'Authorization': 'Token a08cac631e983e42613ba5fa713e46bb1e4345ff'
        });
    }

    static GET_INITIAL_DATA: String = 'GET_INITIAL_DATA';
    static LOAD_DATA: String = 'LOAD_DATA';
    static UPDATE_LOCATION: String = 'UPDATE_LOCATION';
    static GET_NEXT_PAGE: String = 'GET_NEXT_PAGE';

    getInitialData():void {
        this.updateLocation()
            .then(() => {
                this.load();
            });
    }
    next():void {
        let yelpData:YelpData = this.ngRedux.getState().yelpData;
        
    }
    updateLocation():Promise<any> {
        return Geolocation.getCurrentPosition().then((resp) => {
            this.ngRedux.dispatch({
                type: YelpActions.UPDATE_LOCATION,
                payload: resp
            })
        });
    }
    load():void {
        let yelpData: YelpData = this.ngRedux.getState().yelpData;
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', yelpData.page);
        params.set('lat', yelpData.lat);
        params.set('lon', yelpData.lon);
        let options: RequestOptions = new RequestOptions({
            headers: this.headers,
            search: params
        });
        this.http.get('https://codecraftpro.com/api/samples/v1/coffee/', options)
            .map(res => res.json())
            .subscribe((data) => {
                this.ngRedux.dispatch({
                    type: YelpActions.GET_INITIAL_DATA,
                    payload: data
                });
            })
    }

}