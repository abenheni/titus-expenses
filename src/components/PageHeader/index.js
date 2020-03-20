import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';

class PageHeader extends Component {

    getPageTitle = () => {
        switch (this.props.location.pathname){
            case "/":
                return "Home";
            case "/expenselist":
                return "Expenses List";
            case "/expensestats":
                return "Statistics";
            default:
                return "Edit Expense";
        }
    }

    render() {
        return(
            <Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'salmon'}} >
                <img src='/bot.png' width='52px' height='52px'/>
                <p style={{fontSize: '20px', color: 'white', fontWeight: 'bold'}}>{this.getPageTitle()}</p>
            </Container>
        )
    }
}

export default withRouter(PageHeader);