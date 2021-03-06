import PropTypes from 'prop-types';
import 'firebase/database';
import { kea } from 'kea';
import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../Firebase';


const propTypes = {
    Expenses: PropTypes.array
}

const database = firebase.database();

export const expenseLogic =  kea({
    actions: () => ({
        setExpenses: ( Expenses ) => ({ Expenses }),
        setFetchError: (message) => ({ message }),
        deleteItem: (itemId) => ({ itemId })
    }),

    reducers: ({ actions }) => ({
        Expenses: [[], {
            [actions.setExpenses]: (_, payload) => { return (payload ? Object.entries(payload.Expenses) : [])} 
        }],
        isLoading: [true, {
            [actions.setExpenses]: () => false,
            [actions.setFetchError]: () => false
        }],
        error: [null, {
            [actions.setExpenses]: () => null,
            [actions.setFetchError]: (_, payload) => payload.message
        }]
    }),

    listeners: ({ actions, values, store }) => ({
        [actions.deleteItem]: async ({ itemId }) => {
            await database.ref('/Expenses/' + itemId).set(null)
            database.ref('/Expenses').once('value').then((snapshot) => {
                actions.setExpenses(snapshot.val());
            })
        }
    }),

    events: ({ actions, values }) => ({
        afterMount: () => {
            database.ref('/Expenses').once('value').then((snapshot) => {
                actions.setExpenses(snapshot.val());
            })
        }
    })
})