import { saveCart, loadCart } from "../DataHandler"
import { Component } from "react"
import Header from "./Header"
import "../styles/Cart.css"

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartData: null
        };
    }

    componentDidMount() {
        this.setState(currentState => ({
            ...currentState,
            cartData: loadCart()
        }))
    }

    render() {
        return (
        <>
            <Header linkTitle='Store' linkDest='/store' onClick={() => {console.log('store link clicked')}}></Header>
            <h1>Welcome to your Cart</h1>
            <p>{JSON.stringify(this.state.cartData)}</p>
        </>)
    }
}
