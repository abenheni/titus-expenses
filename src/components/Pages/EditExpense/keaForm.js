import PropTypes from 'prop-types';
import { kea } from 'kea';
import { put, delay } from 'redux-saga/effects';
import axios from 'axios';
import firebase from '../../Firebase';
import { v4 as uuidv4 } from 'uuid';

const defaults = {
    "Id": '',
    "Claimer": "John Doe",
    "IssuingDate": new Date(2020, 1, 1).toISOString(),
    "Description": '',
    "Amount": 0,
    "Approved": "NO"
}

const propTypes = {
    Id: PropTypes.string,
    Claimer: PropTypes.string,
    IssuingDate: PropTypes.string,
    Description: PropTypes.string,
    Amount: PropTypes.number,
    Approved: PropTypes.string
}

const database = firebase.database();

const missingText = 'This Field is required';

export default kea({
  actions: () => ({
    setValue: (key, value) => ({ key, value }),
    setValues: (values) => ({ values }),

    submit: true,
    submitSuccess: true,
    submitFailure: true
  }),

  reducers: ({ actions }) => ({
    values: [defaults, PropTypes.shape(propTypes), {
      [actions.setValue]: (state, payload) => {
        return Object.assign({}, state, { [payload.key]: payload.value })
      },
      [actions.setValues]: (state, payload) => {
        return Object.assign({}, state, payload.values)
      },
      [actions.submitSuccess]: () => defaults
    }],

    isSubmitting: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitFailure]: () => false
    }],

    showErrors: [false, PropTypes.bool, {
      [actions.submit]: () => true,
      [actions.submitSuccess]: () => false
    }]
  }),

  takeLatest: ({ actions, workers }) => ({
    [actions.submit]: function * () {
      const { submitSuccess, submitFailure } = this.actions;

      const hasErrors = yield this.get('hasErrors');

      if (hasErrors) {
        yield put(submitFailure());
        return
      }

      const values = yield this.get('values');
      console.log('Submitting values:', values);

      database.ref('/Expenses/' + values.Id).set({
        Amount: values.Amount,
        Description: values.Description,
        Claimer: values.Claimer,
        IssuingDate: values.IssuingDate,
        Approved: "No"
      })
      
      if (true) {
        window.alert('success');
        yield put(submitSuccess());
      } else {
        window.alert('Error');
        yield put(submitFailure());
      }
    }
  }),

  selectors: ({ selectors }) => ({
    allErrors: [
      () => [selectors.values],
      (values) => ({
        Claimer: !values.Claimer ? missingText : null,
        Amount: !values.Amount ? missingText : null
      }),
      PropTypes.object
    ],

    hasErrors: [
      () => [selectors.errors],
      (errors) => Object.values(errors).filter(k => k).length > 0,
      PropTypes.bool
    ],

    errors: [
      () => [selectors.allErrors, selectors.showErrors],
      (errors, showErrors) => showErrors ? errors : {},
      PropTypes.object
    ]
  }),

  events: ({ actions, values }) => ({
    afterMount: () => {

    }
})
})