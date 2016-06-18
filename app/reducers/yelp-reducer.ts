import {YelpActions} from '../actions/yelp-actions';

let initialState = {
        'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 0,
		'lon': 0
    }

export const yelpData = (state:any = initialState, {type, payload}) => {
    switch (type) {
        case YelpActions.GET_INITIAL_DATA :
            return Object.assign({}, state, {results: payload});
        case YelpActions.LOAD_DATA :
            return Object.assign({}, state, {results: payload});
        case YelpActions.UPDATE_LOCATION :
            return Object.assign({}, state, {
                lat: payload.coords.latitude,
                lon: payload.coords.longitude
            });
        default: 
            return state;
    }
}