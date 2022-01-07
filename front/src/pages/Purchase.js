import React from 'react';
import { useHistory } from 'react-router-dom';
import { removeItemFromLocalStorage } from '../helpers/localStorageFunc';
import './Purchase.css'

const Purchase = () => {
    const history = useHistory();
    setTimeout(() => {
        removeItemFromLocalStorage("purchase");
        history.replace('/home')
    }, 1000);
    return (
    <>
        Thank you!    
    </>
    )
}

export default Purchase
