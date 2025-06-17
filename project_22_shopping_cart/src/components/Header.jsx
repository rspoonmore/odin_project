import { Link } from 'react-router-dom'
import '../styles/Header.css';

export default function Header({linkTitle = 'Cart', linkDest = '/cart', onClick = () => {}}) {
    return (
        <div className='header'>
            <span></span>
            <span><strong>SpoonMart</strong></span>
            <Link to={linkDest} onClick={onClick}>{linkTitle}</Link>
        </div>
    )
}