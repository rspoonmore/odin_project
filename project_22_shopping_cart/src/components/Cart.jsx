import { saveCart, loadCart } from "../DataHandler"
import { Component } from "react"
import { ItemCartView, CheckoutView } from "./ItemView"
import Header from "./Header"
import "../styles/Cart.css"

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartData: null
        };

        this.generateCartList = this.generateCartList.bind(this);
        this.generateTotal = this.generateTotal.bind(this);
        this.checkout = this.checkout.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        this.setState(currentState => ({
            ...currentState,
            cartData: loadCart()
        }))
    }

    checkout() {
        saveCart({})
        this.setState({'cartData': null})
        alert('You have finished checking out!')
    }

    deleteItem = (key) => () => {
        this.setState(currentState => {
            if (key in currentState.cartData) {
                delete currentState.cartData[key]
                saveCart(currentState.cartData)
            }
            return currentState
        })
    }

    generateCartList() {
        if (!this.state.cartData) {
            return <h3>Your cart is currently empty</h3>
        }
        else {
            return (
                <div>
                    {Object.entries(this.state.cartData).map(([key, json]) => {
                        return <ItemCartView key={key} itemData={json} onDelete={this.deleteItem(key)}></ItemCartView>
                    })}
                </div>
            )
                
        }
    }

    generateTotal() {
        if (!this.state.cartData) {
            return <></>
        }
        let totalItems = 0;
        let totalPrice = 0;
        Object.entries(this.state.cartData).map(([key, json]) => {
            totalItems += json.count;
            totalPrice += json.count * json.price;
        })

        totalPrice = totalPrice.toFixed(2);
        return (
            <CheckoutView totalItems={totalItems} totalPrice={totalPrice} onCheckout={this.checkout}></CheckoutView>
        )
    }

    render() {
        return (
        <>
            <Header linkTitle='Store' linkDest='/store' onClick={() => {console.log('store link clicked')}}></Header>
            <h1>Welcome to your Cart</h1>
            <div className="list">
                {this.generateCartList()}
                {this.generateTotal()}
            </div>
        </>)
    }
}
