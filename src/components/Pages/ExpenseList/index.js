import React, { Component } from 'react';
import {v4 as uuid4} from 'uuid';
import { Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
 } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';
import { JSON_STORE } from '../../../config/default';
import { kea, connect } from 'kea';
import { expenseLogic } from './keaListLogic';
import { Link } from 'react-router-dom';


class ExpenseListPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            expenses: [],
            isLoading: true
        }
    }

    renderRow = (row) => {
        const rowId = row[0]
        const { Id, Claimer, IssuingDate, Description, Amount, Approved } = row[1];

        return (
            <TableRow key={rowId}>
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
                <TableCell>
                <Link to={`/expense/${rowId}`}>
                    <EditIcon color='action' />
                </Link>
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const { isLoading, error, Expenses } = this.props;

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
                            <TableCell>Edit Expense</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Expenses && Expenses.length > 0 ? (Expenses.map((row) => {
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