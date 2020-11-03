import React, { Component } from 'react'


export default class FormDemo1 extends Component {
    state = {userName:'',city:''}

    onChangeHandler = (event) => {
        //this.setState({userName:event.target.value})
        let name= event.target.name;
        let value= event.target.value;

        this.setState({[name]:value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault(); //storage
        alert(this.state.userName);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>User Name</h3>
                    <input name="userName" onChange={this.onChangeHandler} type="text"></input>
                    <h3>userName is {this.state.userName}</h3>
                    <input type="submit" value="Save"></input>

                    <h3>City</h3>
                    <input name="city" onChange={this.onChangeHandler} type="text"></input>
                    <h3>City is {this.state.city}</h3>
                    <input type="submit" value="Save"></input>
                </form>
                
            </div>
        )
    }
}
