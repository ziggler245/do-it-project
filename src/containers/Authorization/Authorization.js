import React, {Component} from 'react'
import classes from './Authorization.css'
import axios from 'axios'

function validateEmail(email) {
    let info = {
        state: true,
        message: ''
    };
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    info.state = re.test(String(email).toLowerCase());
    info.message =  info.state ?  'OK!' : 'Email is not valid!';
    return info;
}

function validatePassword(password) {
    let info = {
        state: true,
        message: ''
    };

    if(password.length <= 5){}
    info.state = (password.length <= 5) ? false : true;
    info.message =  info.state ?  'OK!' : 'Password must be at least 6 characters!';
    return info;
}

class Authorization extends Component{

    submitHandler = event =>{
        event.preventDefault()
    };

   async signUp() {
        let emailValue = this.email.value;
        let passwordValue = this.password.value;
        let emailArray;
        let passwordArray;

       const authData = {
           email: emailValue,
           password: passwordValue,
           SecureToken: true
       };

       emailArray = validateEmail(emailValue);
       passwordArray = validatePassword(passwordValue);

        if((emailArray.state) && (passwordArray.state)){
            try{
                await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdbV-RTjFZhyPWLiYDykNKNxz8aY41evw', authData);
                alert('Registration completed successfully!');
            }catch (e) {
                alert('This email already exists!');
            }
        }else{
            if(!emailArray.state) alert(emailArray.message);
            if(!passwordArray.state) alert(passwordArray.message);
        }
    }

    async logIn() {

        let emailValue = this.email.value;
        let passwordValue = this.password.value;
        let emailArray;
        let passwordArray;

        const authData = {
            email: emailValue,
            password: passwordValue,
            SecureToken: true
        };

        emailArray = validateEmail(emailValue);
        passwordArray = validatePassword(passwordValue);

        if((emailArray.state) && (passwordArray.state)){
            try{
                  await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdbV-RTjFZhyPWLiYDykNKNxz8aY41evw', authData);
                  alert('You are logged in!');
            }catch (e) {
                 alert('Wrong Email or Password!');
            }
        }else{
            if(!emailArray.state) alert(emailArray.message);
            if(!passwordArray.state) alert(passwordArray.message);
        }
    }

    componentDidMount(){
            alert('You can register!\n' +
            'Registration/authorization are provided by Firebase service');
}

    render(){
        return(
            <div className={classes.Auth}>
                <h1>Authorization</h1>
                <form onSubmit={this.submitHandler} className={classes.Form}>
                    <input type="text"
                            ref={(input) => this.email = input} placeholder='E-mail' />
                    <input type="password"  ref={(input) => this.password = input} placeholder='Password' />
                    <button className={classes.LogIn} onClick={this.logIn.bind(this)}>
                        Log In
                    </button>

                    <button className={classes.SignUp}  onClick={this.signUp.bind(this)}>
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}

export default Authorization