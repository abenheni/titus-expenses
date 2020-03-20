import React, { Component } from 'react';
import {v4 as uuid4} from 'uuid';
import { Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, 
    TableFooter,
    Checkbox,
    Button,
 } from '@material-ui/core';
import axios from 'axios';
import { JSON_STORE } from '../../../config/default';
import { kea, connect } from 'kea';
import { expenseLogic } from './keaListLogic';


class ExpenseListPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            expenses: [],
            isLoading: true
        }
    }

    renderRow = (row) => {
        const rowId = Object.keys(row)[0]
        const { Id, Claimer, IssuingDate, Description, Amount, Approved } = row[rowId];
        console.log('fkkkkk')

        return (
            <TableRow key={Id}>
                <TableCell>
                    {Claimer}
                </TableCell>
                <TableCell>
                    {IssuingDate}
                </TableCell>
                <TableCell>
                    {Description}
                </TableCell>
                <TableCell>
                    {Amount}
                </TableCell>
                <TableCell>
                    {Approved}
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const { isLoading, error, Expenses } = this.props;

        console.log('SO WHAT WE HAV IS ACTUALLY:: ', Expenses.length > 0);

        return(
            <Container>
                {   isLoading ? (
                    <div>
                        Loading..
                    </div>
                ) : (
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Claimer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Approved</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Expenses.length > 0 ? (Expenses.map((row) => {
                            return this.renderRow(row)
                        })) : (
                        <TableRow>
                            {error ? `Error: ${error}` : 'No data found'}
                        </TableRow>)}
                    </TableBody>
                </Table>
                )}
            </Container>
        )
    }
}

export default expenseLogic(ExpenseListPage);