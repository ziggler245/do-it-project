import React, {Component} from 'react'
import classes from './aboutAuthor.css'
import Me from '../../img/SerhiiKhaliavinCV.png'

class aboutAuthor extends Component {

    render (){
        return(
           <div className={classes.aboutAuthor}>
               <h1 align="center">About author</h1>
                    <img src={Me} width="900px" height="1200px"/>
           </div>
        )
    }
}

export default aboutAuthor