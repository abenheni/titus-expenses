export const reducers = ({ actions }) => ({
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
  })