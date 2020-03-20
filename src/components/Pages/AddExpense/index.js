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
            <Container>
            <FormControl>
              <FormLabel>Claimer</FormLabel>
              <Input type='text' value={Claimer} onChange={e => setValue('Claimer', e.target.value)} />
              {errors.Claimer ? <div className='form-error'>{errors.Claimer}</div> : null}
            </FormControl>
    
            <FormControl>
              <FormLabel>IssuingDate</FormLabel>
              <Input type='date' value={IssuingDate} onChange={e => {setValue('IssuingDate', e.target.value.toString()); console.log('DATE IM SETTING ISS:: ', e.target.value.toString())}} />
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
    
            <Button disabled={isSubmitting} onClick={submit}>
              {isSubmitting ? 'Submitting...' : 'Submit!'}
            </Button>
          </Container>
        )
    }
}

export default keaForm(AddExpensePage);