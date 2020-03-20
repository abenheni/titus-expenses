import React, { Component } from 'react';
import { connect } from 'kea';
import firebase from '../../Firebase';

import keaForm from './keaForm';

const database = firebase.database();

class AddExpensePage extends Component {

  componentDidMount() {
    console.log('AAAAAARRRRRRRR:: ', this.props.match.params.expenseid)
    const expenseId = this.props.match.params.expenseid;
    const { setValues } = this.props.actions;
    database.ref('/Expenses/' + expenseId).once('value').then((snapshot) => {
      const response = snapshot.val();  
      console.log('I GIB THINKS:: ', response)
      setValues(response); 
    });

  }

    render() {
        const { isSubmitting, errors, values } = this.props;
        const { setValue, submit } = this.props.actions;

        const { Id, Claimer, IssuingDate, Description, Approved, Amount } = values;
        return(
            <div>
            <div className='form-field'>
              <label>Claimer</label>
              <input type='text' value={Claimer} onChange={e => setValue('Claimer', e.target.value)} />
              {errors.Claimer ? <div className='form-error'>{errors.Claimer}</div> : null}
            </div>
    
            <div className='form-field'>
              <label>IssuingDate</label>
              <input type='text' value={IssuingDate} onChange={e => setValue('IssuingDate', e.target.value)} />
            </div>
    
            <div className='form-field'>
              <label className='block'>Description</label>
              <textarea value={Description} onChange={e => setValue('Description', e.target.value)} />
            </div>

            <div className='form-field'>
              <label className='block'>Amount</label>
              <input type='number' value={Amount} onChange={e => setValue('Amount', parseInt(e.target.value))} />
              {errors.Amount ? <div className='form-error'>{errors.Amount}</div> : null}
            </div>
    
            <div className='form-field'>
              <label className='block'>Approved</label>
              <input type='text' value={Approved} onChange={e => setValue('Approved', e.target.value)} />
            </div>

            <button disabled={isSubmitting} onClick={submit}>
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </button>
          </div>
        )
    }
}

export default keaForm(AddExpensePage);