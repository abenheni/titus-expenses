import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, AppBar, Typography } from '@material-ui/core';

class PageHeader extends Component {

    getPageTitle = () => {
        switch (this.props.location.pathname){
            case "/":
                return "Home";
            case "/expenselist":
                return "Expenses List";
            case "/expensestats":
                return "Statistics";
            case "/expense/add":
                return "Add Expense"
            default:
                return "Edit Expense";
        }
    }

    render() {
        return(
            <AppBar color='secondary' position='relative' style={{display: 'flex', flexDirection: 'row', padding: '10px', height: '10vh'}}>
                <img src='/titus-logo.png'  width='100px' height='auto' style={{display: 'block', float: 'left', marginRight: '12px'}} />
                <p style={{fontSize: '20px', color: 'white', fontWeight: 'bold', display: 'block', float: 'left'}}>{this.getPageTitle()}</p>
            </AppBar>
        )
    }
}

export default withRouter(PageHeader);