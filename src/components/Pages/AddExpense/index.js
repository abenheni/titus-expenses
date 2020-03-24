import React, { Component } from 'react';
import { connect } from 'kea';
import {
  Container,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Button
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import keaForm from './keaForm';
import styles from './styles.module.css';

class AddExpensePage extends Component {

    render() {
        const { isSubmitting, errors, values, submitted } = this.props;
        const { setValue, submit, submitSuccess } = this.props.actions;

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
              <Input className={styles.FormInput} type='date' value={IssuingDate} onChange={e => {setValue('IssuingDate', e.target.value.toString())}} />
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
    
            <Button disabled={isSubmitting} onClick={submit} className={styles.SubmitButton}>
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </Button>
          </Container>
        )
    }
}

export default keaForm(AddExpensePage);