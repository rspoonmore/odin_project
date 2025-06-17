import { saveCart, loadCart } from "../DataHandler"
import Header from "./Header"
import "../styles/Cart.css"

export default function Cart() {
    return (
        <>
            <Header linkTitle='Store' linkDest='/store' onClick={() => {console.log('store link clicked')}}></Header>
            <h1>Welcome to your Cart</h1>
        </>
    )
}