import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NavBar extends Component {
    render() {
        return(
            <ul>
            <li key='list'>
                <Link to='/expenselist'>Expenses List</Link>
            </li>
            <li key='stats'>
                <Link to='/expensestats'>Expenses Statistics</Link>
            </li>
            <li key='Add'>
                <Link to='/expense/add'>Add Expense</Link>
            </li>
        </ul>
        )
    }
}
