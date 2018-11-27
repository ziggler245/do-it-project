import React, {Component} from 'react'
import classes from './MenuDisplay.scss'
import {NavLink} from 'react-router-dom'

const links = [
    {to: '/', label: 'Authorization', exact:true,},
    {to: '/main_page', label: 'Main page', exact:false},
    {to: '/about_author', label: 'About author', exact:false}
];

class MenuDisplay extends Component {

    state = {
        show: ''
    };

    handleClick = () => {
       if (this.props.isOpen){
           this.setState({
               show : classes.close
           })
       }
    };

    showMenu(){
        return links.map((link, index) => {
            return (
                <li key={index} className={this.state.show} onClick={(e) => this.handleClick(e)}>
                    <NavLink
                     to={link.to}
                     exact={link.exact}
                     className={classes.styleH1}
                     target="_blank"
                     >
                        <h1> {link.label}</h1>
                    </NavLink>
                </li>
            )
            }
        )
    }

render() {
        const cls = [classes.MenuDisplay];
        if (!this.props.isOpen){
            cls.push(classes.close)
        }

    return(
        <nav className={cls.join(' ')}>
            <ul>
                {this.showMenu()}
            </ul>
        </nav>
        )
    }
}

export default MenuDisplay