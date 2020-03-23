import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import styles from './styles.module.css';

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
        const { isSubmitting, errors, values, submitted, initialized } = this.props;
        const { setValue, submit } = this.props.actions;

        const { Id, Claimer, IssuingDate, Description, Approved, Amount } = values;

        if (submitted === true) {
          return(
            <Redirect to='/' />
          )
        }

        return(
            <Container className={styles.FormContainer}>
            <FormControl className={styles.FormControl}>
              <FormLabel className={styles.FormLabel}>Claimer</FormLabel>
              <Input className={styles.FormInput} type='text' value={Claimer} onChange={e => setValue('Claimer', e.target.value)} />
              {errors.Claimer ? <div className='form-error'>{errors.Claimer}</div> : null}
            </FormControl>
    
            <FormControl className={styles.FormControl}>
              <FormLabel className={styles.FormLabel}>IssuingDate</FormLabel>
              <Input className={styles.FormInput} type='date' value={IssuingDate} onChange={e => setValue('IssuingDate', e.target.value.toString())} />
            </FormControl>
    
            <FormControl className={styles.FormControl}>
              <FormLabel className={styles.FormLabel}>Description</FormLabel>
              <Input className={styles.FormInput} value={Description} onChange={e => setValue('Description', e.target.value)} />
            </FormControl>

            <FormControl className={styles.FormControl}>
              <FormLabel className={styles.FormLabel}>Amount</FormLabel>
              <Input className={styles.FormInput} type='number' value={Amount} onChange={e => setValue('Amount', parseInt(e.target.value))} />
              {errors.Amount ? <div className='form-error'>{errors.Amount}</div> : null}
              <FormHelperText>Amount in Euros</FormHelperText>
            </FormControl>
    
            <FormControl className={styles.FormControl}>
              <FormLabel className={styles.FormLabel}>{Approved ? 'Expense is Not Approved Yet' : 'Expense is Approved'}</FormLabel>
              <Button className={styles.SubmitButton} onClick={() => {setValue('Approved', !Approved)}}>{ Approved ? 'Approve Expense' : 'Disapprove Expense'}</Button>
            </FormControl>

            <Button className={styles.SubmitButton} disabled={isSubmitting} onClick={submit}>
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </Button>
          </Container>
        )
    }
}

export default keaForm(AddExpensePage);