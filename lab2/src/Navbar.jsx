
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/compose-salad">Compose Salad</Link>
                </li>
                <li>
                    <Link to="/view-order">View Order</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
