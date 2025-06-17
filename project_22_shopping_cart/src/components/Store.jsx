import { saveCart, loadCart } from "../DataHandler"
import { Component } from "react"
import Header from "./Header"
import ItemView from "./ItemView"
import "../styles/Store.css"


class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productData: null,
            cartData: null
        };

        this.generateProductList = this.generateProductList.bind(this)
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => this.setState(currentState => ({
                ...currentState,
                productData: json.slice(0, this.props.nProducts)
            })))
            .catch(err => console.log(err))
            .finally(() => this.setState(currentState => ({
                ...currentState,
                cartData: loadCart()
            })))
    }

    generateProductList() {
        if (!this.state.productData) {
            return <li>Loading...</li>
        }
        else {
            return (
                this.state.productData.map(json => {
                    return <ItemView key={json.id} itemProps={json}></ItemView>
                }))
        }
    }

    cartInfo() {
        if (!this.state.cartData) {
            return <p>No Cart Data</p>
        }
        else {
            return <p>Cart: {JSON.stringify(this.state.cartData)}</p>
        }
    }

    render() {
        return (
        <>
            <Header linkTitle='Cart' linkDest='/cart' onClick={() => {console.log('cart link clicked')}}></Header>
            {this.cartInfo()}
            <ul>
                {this.generateProductList()}
            </ul>

        </>
    )
    }
}


export default Store