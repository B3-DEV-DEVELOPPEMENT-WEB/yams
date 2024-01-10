import {NavLink} from "react-router-dom";

const Nav = () => {
    const checkIsActive = ({isActive})=> {
        return {
            color: isActive ? 'white' : 'red',
            background: isActive ? 'red': 'black'
        }
    };
    return (
        <nav>
            <ul>
                <li><NavLink to="/" style={checkIsActive}>Home</NavLink></li>
            </ul>
        </nav>
    )
}
export default Nav