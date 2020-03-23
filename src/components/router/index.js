import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavBar from '../NavBar';
import PageHeader from '../PageHeader';

import ExpenseList from '../Pages/ExpenseList';
import ExpenseStats from '../Pages/ExpenseStats';
import AddExpense from '../Pages/AddExpense';
import EditExpense from '../Pages/EditExpense';
import { Container } from '@material-ui/core';

class Router extends Component {
    render() {
        return (
            <div style={{ height: '100vh' }}>
            <BrowserRouter>
            <PageHeader />
                <NavBar />
                <Container style={{ width: '75%', float: 'left', display: 'block', marginTop: '5vh' }}>
                    <Switch>
                        <Route exact path='/' render={() => <ExpenseList />} />
                        <Route path='/expenselist' render={() => <ExpenseList />} />
                        <Route path='/expensestats' render={() => <ExpenseStats />} />
                        <Route path='/expense/add' render={() => <AddExpense />} />
                        <Route path='/expense/:expenseid' render={(matchProps) => <EditExpense {...matchProps} />} />
                    </Switch>
                </Container>
            </BrowserRouter>
            </div>
        )
    }
}

export default Router;