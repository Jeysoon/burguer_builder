import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component{
   state = {
       ingredients: {
           salad: 0,
           bacon: 0,
           cheese: 0,
           meat: 0
       },
       totalPrice: 4,
       purchasable: false,
       purchasing: false,
       loading: false
   }

   updatePurchaseState (ingredients) {
       const sum = Object.keys(ingredients)
       .map(igKey => {
           return ingredients[igKey];
       })
       .reduce((sum, el) => {
           return sum + el;
       },0);
       this.setState({purchasable: sum >0});
   }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

   addIngredientHandler = (type) => {
       const oldCount = this.state.ingredients[type];
       const updatedCount = oldCount + 1 ;
       const updatedIngredients = {
           // Changing state in an immutable way so using ES6
           ...this.state.ingredients
       };
       updatedIngredients[type] = updatedCount;
       const priceAddition = INGREDIENT_PRICE[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
       this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
       this.updatePurchaseState(updatedIngredients);
      
   }

   removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
        return ;
    }
    const updatedCount = oldCount - 1 ;
    const updatedIngredients = {
        // Changing state in an immutable way so using ES6
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
   }
   purchaseHandler = ()=> {
       this.setState({purchasing: true});
   }
   purchaseCancelHandler = () => {
       this.setState({purchasing: false});
   }
   purchaseContinueHandler = () => {
    //    alert('You continue!');
       let order = {
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name: 'Jeyson Meza',
               address: {
                   street: 'Articulo 115',
                   zipCode: '80194',
                   country: 'Mexico'
               },
               email: 'jeysoon@gmail.com'
           },
           deliveryMethod: 'pro'
       }
    axios.post('/orders.json',order)
    .then(response => console.log(response))
    .catch(error => console.log(error));

    // axios.post('/orders.json', order)
        // .then(response => console.log(response))
        // .catch(error => console.log(error));
   }
   
    render(){
        const disabledInfo = {
            //Copied in a immutable way.
            ...this.state.ingredients
        }
        for ( let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =   <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        //Hold references to purchaseContinuedHandler
        price={this.state.totalPrice}
        purchaseContinued={this.purchaseContinueHandler}
        />;
        if(this.state.loading){
         orderSummary =   <Spinner />

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;