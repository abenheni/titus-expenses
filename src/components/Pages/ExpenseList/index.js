import React, { Component } from 'react';
import {v4 as uuid4} from 'uuid';
import { Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Card,
    Button
 } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from'@material-ui/icons/DeleteForever';
import { expenseLogic } from './keaListLogic';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class ExpenseListPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            expenses: [],
            isLoading: true
        }
    }

    deleteItem = (rowId) => {
        this.props.actions.deleteItem(rowId);
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
                    {Approved ? (<p style={{color: 'green'}}>YES</p>) : (<p style={{color: 'red'}}>NO</p>)}
                </TableCell>
                <TableCell>
                <Link to={`/expense/${rowId}`}>
                    <EditIcon color='action' />
                </Link>
                </TableCell>
                <TableCell>
                    <Button onClick={() => this.deleteItem(rowId)}>
                        <DeleteIcon style={{ color: 'red' }} />
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    render() {
        const { isLoading, error, Expenses } = this.props;

        return(
            <Container>
                {   isLoading ? (
                    <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <CircularProgress color='secondary' />
                        <p>Loading..</p>
                    </Card>
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
                            <TableCell>Delete Expense</TableCell>
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