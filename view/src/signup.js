import React, { Component } from "react";
import validator from 'validator'

export default class SignUp extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            password:'',
            email:'',
            name_err:'',
            password_err:'',
            email_err:''
            
        }
    }

    getdatas(event){
        this.setState({[event.target.name]:event.target.value,[event.target.name+'_err']:''})

    }

    Login(event){
        if(!(this.state.email) || !validator.isEmail(this.state.email)){
            this.setState({email_err:'Eneter the valide emailid'})
        }else if(!(this.state.password) || !(validator.isStrongPassword(this.state.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }))){
            this.setState({password_err:'Enter the valide password'})
        }else{
            console.log(this.state.email)
        }
    }
    render() {
        return (
            <div className="row">
            <div className="col-6">
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" placeholder="First name" />
                </div>

                {/* <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" />
                    <p className="text-danger" >{this.state.email_err}</p>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                    <p className="text-danger" >{this.state.password_err}</p>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/">log in?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}