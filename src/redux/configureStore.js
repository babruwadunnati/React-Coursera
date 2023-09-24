import {createStore,combineReducers,applyMiddleware} from 'redux';
import {  Dishes } from './dishes';
import {  Leaders } from './leaders';
import {  Comments } from './comments';
import {  Promotions } from './promotions';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

import thunk from 'redux-thunk';
import logger from 'redux-logger';



export const ConfigureStore=()=>{
    const store= createStore(
        combineReducers({
            dishes: Dishes,
            leaders: Leaders,
            comments: Comments,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)

    );
    return store;
}
