import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';



class OrderSummary  extends Component {
    componentWillUpdate(){
        console.log('[OderSummary] WillUpdate');
    }

    render(){

        const ingredientsummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li key={igKey}> 
                <span style={ {textTransform: 'capitalize'} }>{igKey}</span>:  {this.props.ingredients[igKey]}
            </li>);
        });

        //Returning JSX COde
        return (
            <Aux>
        <h3>Your order</h3>
        <p>A delicious burgue with the following ingredients:</p>
        <ul>
        {ingredientsummary}
        </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to CheckOut?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
    </Aux>
        );
    }
} 

export default OrderSummary;