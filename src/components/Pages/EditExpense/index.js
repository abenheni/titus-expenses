import React, { Component } from 'react';
import { connect } from 'kea';
import firebase from '../../Firebase';
import {
  Container,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Button
} from '@material-ui/core';

import keaForm from './keaForm';

const database = firebase.database();

class AddExpensePage extends Component {

  componentDidMount() {
 
    const expenseId = this.props.match.params.expenseid;
    const { setValues, setValue } = this.props.actions;
    database.ref('/Expenses/' + expenseId).once('value').then((snapshot) => {
      const response = snapshot.val();  
      setValues(response); 
      setValue('Id', expenseId);
    });

  }

    render() {
        const { isSubmitting, errors, values, submitted } = this.props;
        const { setValue, submit } = this.props.actions;

        const { Id, Claimer, IssuingDate, Description, Approved, Amount } = values;

        if (submitted === true) {
          return(
            <Redirect to='/' />
          )
        }

        return(
            <Container>
            <FormControl>
              <FormLabel>Claimer</FormLabel>
              <Input type='text' value={Claimer} onChange={e => setValue('Claimer', e.target.value)} />
              {errors.Claimer ? <div className='form-error'>{errors.Claimer}</div> : null}
            </FormControl>
    
            <FormControl>
              <FormLabel>IssuingDate</FormLabel>
              <Input type='date' value={IssuingDate} onChange={e => setValue('IssuingDate', e.target.value.toString())} />
            </FormControl>
    
            <FormControl>
              <FormLabel className='block'>Description</FormLabel>
              <Input value={Description} onChange={e => setValue('Description', e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel className='block'>Amount</FormLabel>
              <Input type='number' value={Amount} onChange={e => setValue('Amount', parseInt(e.target.value))} />
              {errors.Amount ? <div className='form-error'>{errors.Amount}</div> : null}
              <FormHelperText>Amount in Euros</FormHelperText>
            </FormControl>
    
            <FormControl>
              <FormLabel className='block'>Approve?</FormLabel>
              <Button style={{backgroundColor: 'green'}} onClick={() => {setValue('Approved', !Approved)}}>{ Approved ? 'YES' : 'NO'}</Button>
            </FormControl>

            <Button disabled={isSubmitting} onClick={submit}>
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </Button>
          </Container>
        )
    }
}

export default keaForm(AddExpensePage);