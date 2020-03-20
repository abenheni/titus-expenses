import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NavBar from '../NavBar';
import PageHeader from '../PageHeader';

import ExpenseList from '../Pages/ExpenseList';
import ExpenseStats from '../Pages/ExpenseStats';
import AddExpense from '../Pages/AddExpense';
import EditExpense from '../Pages/EditExpense';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <PageHeader />
                <div className='Router'>
                <NavBar />
                <div className='Page'>
                    <Switch>
                        <Route exact path='/' render={() => <ExpenseList />} />
                        <Route path='/expenselist' render={() => <ExpenseList />} />
                        <Route path='/expensestats' render={() => <ExpenseStats />} />
                        <Route path='/expense/add' render={() => <AddExpense />} />
                        <Route path='/expense/:expenseid' render={(matchProps) => <EditExpense {...matchProps} />} />
                    </Switch>
                </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router;