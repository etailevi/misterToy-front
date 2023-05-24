import { Link, NavLink } from 'react-router-dom'
import ToyLogo from '../assets/img/toy-logo.svg'

export default function AppHeader() {
    return (
        <header className="app-header">
            <Link className="logo" to="/">
                <img src={ToyLogo} alt="" />
            </Link>
            <nav className='main-nav'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}