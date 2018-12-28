import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

    const ingredientsummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (
        <li>
            <span style={ {textTransform: 'capitalize'} }>{igKey}</span>:  {props.ingredients[igKey]}
        </li>);
    });
return (
    <Aux>
        <h3>Your order</h3>
        <p>A delicious burgue with the following ingredients:</p>
        <ul>
        {ingredientsummary}
        </ul>
        <p>Continue to CheckOut</p>
    </Aux>
);
};

export default orderSummary;