import React, { Component } from "react";
import validator from 'validator'
import { Link, Navigate  } from 'react-router-dom';

export default class Login extends Component {
        constructor(){
            super()
            this.state = {
                emailid:'',
                password:'',
                emailid_err:'',
                password_err:''
            }
        }
        getdatas(event){
            this.setState({[event.target.name]:event.target.value,[event.target.name+'_err']:''})

        }

        Login(event){
            if(!(this.state.emailid) || !validator.isEmail(this.state.emailid)){
                this.setState({emailid_err:'Eneter the valide emailid'})
            }else if(!(this.state.password)){
                this.setState({password_err:'Enter the valide password'})
            }else{
                var userobj={
                    email:this.state.emailid,
                    password:this.state.password
               }
               const header=new Headers({'Content-Type':'application/json'});
               const requestOptions = {
                   method: 'POST',
                   headers: header,
                   body: JSON.stringify(userobj)
               };
               fetch('http://localhost:2022/api/login',requestOptions)
               .then(response => response.json())
               .then(response => {
                 
                //    UserProfile.setName(response)
                   if(response.status){
                    window.location.href='/Home'
                    console.log(response,"sucess")
                   }
                   
                   // console.log(response)
               
               })
            }
        }

    render() {
        return (
            <div className="row">
                <div className="col-6">
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="emailid" maxLength={30} className="form-control" onChange={this.getdatas.bind(this)} placeholder="Enter email" required />
                    <p className="text-danger" >{this.state.emailid_err}</p>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" name="password" className="form-control" maxLength={15} onChange={this.getdatas.bind(this)} placeholder="Enter password" />
                    <p className="text-danger" >{this.state.password_err}</p>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="button" onClick={this.Login.bind(this)} className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Don't have an account?<a href="/sign-up">sign up</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}