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

        this.generateProductList = this.generateProductList.bind(this);
        this.cartInfo = this.cartInfo.bind(this);
        this.changeCount = this.changeCount.bind(this);
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
                    return <ItemView 
                            key={json.id} 
                            itemProps={json} 
                            onIncrease={this.changeCount(true, json.id)} 
                            onDecrease={this.changeCount(false, json.id)} 
                            cartData={this.state.cartData}
                            >
                            </ItemView>
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

    changeCount = (inc, key) => () => { 
        const prodTitle = this.state.productData[key-1]['title'];
        const prodID = this.state.productData[key-1]['id'];    
         
        this.setState(currentState => {
            let newCartData = {...currentState.cartData};
            if(inc) {
                if(prodID in newCartData) {
                    newCartData[prodID] = {...newCartData[prodID], count: newCartData[prodID]['count'] + 1}
                }
                else {
                    newCartData[prodID] = {'title': prodTitle, 'count': 1};
                }
            }
            else if (!inc) {
                if(prodID in newCartData & newCartData[prodID]['count'] > 1) {
                    newCartData[prodID] = {...newCartData[prodID], count: newCartData[prodID]['count'] - 1};
                }
                else if (prodID in newCartData & newCartData[prodID]['count'] <= 1) {
                    delete newCartData[prodID]
                }
            }
            saveCart(newCartData);
            return {...currentState, cartData: newCartData};
        })
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