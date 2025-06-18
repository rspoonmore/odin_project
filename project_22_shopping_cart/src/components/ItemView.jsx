import '../styles/ItemView.css'

export default function ItemView({itemProps, onIncrease, onDecrease, cartData}) {
    return (
        <div className='container'>
            <div className='info'>
                <img src={itemProps.image}></img>
                <div className='title'>
                    <div className='itemTitle'>{itemProps.title}</div>
                    <div>{itemProps.description}</div>
                </div>
            </div>
            <div>{itemProps.price}</div>
            <div className='quantity'>
                <div id="current-amount">{itemProps.id in cartData ? cartData[itemProps.id]['count'] : 0}</div>
                <button onClick={onDecrease}>-</button>
                <button onClick={onIncrease}>+</button>
            </div>

        </div>
    )
}