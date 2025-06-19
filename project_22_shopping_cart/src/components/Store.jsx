import { saveCart, loadCart } from "../DataHandler"
import { Component } from "react"
import Header from "./Header"
import {ItemView} from "./ItemView"
import "../styles/Store.css"


class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productData: null,
            cartData: null
        };

        this.generateProductList = this.generateProductList.bind(this);
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
            return <h3>Loading...</h3>
        }
        else {
            return (
                <div className='list'>
                {this.state.productData.map(json => {
                    return <ItemView 
                            key={json.id} 
                            itemProps={json} 
                            onIncrease={this.changeCount(true, json.id)} 
                            onDecrease={this.changeCount(false, json.id)} 
                            cartData={this.state.cartData}
                            >
                            </ItemView>
                })}
                </div>
                )
        }
    }

    changeCount = (inc, key) => () => { 
        const lookupKey = key-1
        const prodTitle = this.state.productData[lookupKey]['title'];
        const prodImage = this.state.productData[lookupKey]['image'];
        const prodDesc = this.state.productData[lookupKey]['description'];
        const prodPrice = this.state.productData[lookupKey]['price'];
        const prodID = this.state.productData[lookupKey]['id'];   
        this.setState(currentState => {
            let newCartData = {...currentState.cartData};
            if(inc) {
                if(prodID in newCartData) {
                    newCartData[prodID] = {...newCartData[prodID], count: newCartData[prodID]['count'] + 1}
                }
                else {
                    newCartData[prodID] = {'title': prodTitle, 'image': prodImage, 'description': prodDesc, 'price': prodPrice, 'count': 1};
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
            {this.generateProductList()}

        </>
    )
    }
}


export default Store