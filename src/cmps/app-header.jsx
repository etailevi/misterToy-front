import { Link, NavLink } from 'react-router-dom'
import ToyLogo from '../assets/img/toy-logo.png'

export default function AppHeader() {
    return (
        <header className="app-header">
            <Link className="logo" to="/">
                <img src={ToyLogo} alt="" />
                <h1>Toys4u</h1>
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