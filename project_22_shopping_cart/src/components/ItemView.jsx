import '../styles/ItemView.css'

function ItemView({itemProps, onIncrease, onDecrease, cartData}) {
    return (
        <div className='container'>
            <div className='info'>
                <img src={itemProps.image}></img>
                <div className='title'>
                    <div className='itemTitle'>{itemProps.title}</div>
                    <div>{itemProps.description}</div>
                </div>
            </div>
            <div>{(itemProps.price).toFixed(2)}</div>
            <div className='quantity'>
                <div id="current-amount">{itemProps.id in cartData ? cartData[itemProps.id]['count'] : 0}</div>
                <button onClick={onDecrease}>-</button>
                <button onClick={onIncrease}>+</button>
            </div>

        </div>
    )
}

function ItemCartView({itemData, onDelete = () => {console.log('delete pressed')}}) {
    return (
        <div className='container'>
            <div className='info'>
                <img src={itemData.image}></img>
                <div className='title'>
                    <div className='itemTitle'>{itemData.title}</div>
                    <div>{itemData.description}</div>
                </div>
            </div>
            <div>{(itemData.price * itemData.count).toFixed(2)}</div>
            <div className='quantity'>
                <div id="current-amount">{itemData.count}</div>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

function CheckoutView({totalItems, totalPrice, onCheckout = () => {console.log('checkout pressed')}}){
    return (
        <div id='checkout' className='container'>
            <div className='itemTitle'>Total Items: {totalItems}</div>
            <div className='itemTitle'>Total Amount: {totalPrice}</div>
            <button onClick={onCheckout}>Checkout</button>
        </div>
    )
}

export {ItemView, ItemCartView, CheckoutView}