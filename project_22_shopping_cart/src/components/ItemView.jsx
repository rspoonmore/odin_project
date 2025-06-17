import '../styles/ItemView.css'

export default function ItemView({itemProps, onChange}) {
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
                <div id="current-amount">0</div>
                <button>-</button>
                <button>+</button>
            </div>

        </div>
    )
}