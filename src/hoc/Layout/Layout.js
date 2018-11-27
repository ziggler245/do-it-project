import React, {Component} from 'react'
import classes from './Layout.css'
import LeftMenu from '../../components/Navigation/LeftMenu/LeftMenu'
import MenuDisplay from '../../components/Navigation/MenuDisplay/MenuDisplay'

class Layout extends Component{

    state = {
        menu: false,
        style: classes.block
    };

    toogleMenuHandler = () => {
    this.setState({
        menu: !this.state.menu
    })
    };

render(){
    const cls = [classes.Layout];
    let styleBlock = [];
    if (this.state.menu){
        cls.push(classes.close);
        styleBlock.push(classes.block);
    }

    return(

    <div className={cls.join(' ')}>
        <MenuDisplay
            isOpen={this.state.menu}
        />

        <LeftMenu
            onToggle={this.toogleMenuHandler}
            isOpen={this.state.menu}
        />

        <main className={styleBlock}>
            {this.props.children}
        </main>
    </div>
     )
    }
   }

export default Layout