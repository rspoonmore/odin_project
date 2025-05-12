import '../styles/Card.css'

export default function Card({name = 'pikachu', id = '', imgUrl = '', selectFunc = undefined}) {
    function toCaps(string) {
        return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase()
    }

    return (
        <div className='card' onClick={selectFunc}>
            <img src={imgUrl} alt=''></img>
            <span>{id === '' ? '' : `${id}: ${toCaps(name)}`}</span>
        </div>
    )
}