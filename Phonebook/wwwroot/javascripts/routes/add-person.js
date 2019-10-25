import React, { Component} from 'react';
import $ from "jquery";

const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
};

class AddPersonPage extends Component  {
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
        this.formValid = this.formValid.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: ''
        }
    }
    
    

    addPerson = () => {
        const person = {
            id: generateId(),
            ...this.state
        };
        $.ajax({
            url: "/api/add-person",
            type: "POST",            
            data: JSON.stringify(person),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log(response);
                
            }
        });
  
    };

    validate() {
        console.log(this.formValid())
        if (!this.formValid()){
        document.getElementById('error-form').innerHTML = "Form isn't filled correctly";
        } else {
            this.addPerson()
            window.location.href = '/'
            //alert('person has been added')
        }
    }

    checkPhoneNumber(number){
        console.log(number);
        if(!number.match(/^\d{10}$/)){
            document.getElementById('error-phone').innerHTML = "Please put in a proper phone number, 10 digits"; 
            return false;
        } else {
            return true;
        }
    }

    checkEmail(email){
        console.log(email);
        if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            document.getElementById('error-email').innerHTML = "Please put in a proper email";
            return false;
        } else {
            return true;
        }
    }

    checkFields(fields){
        if(fields===''){
            document.getElementsByClassName('error-field').innerHTML = "These fields can't be empty"
            return false;
        } else {
            return true;
        }
    }

    formValid() {
        let validField = this.state.firstName && this.state.lastName && this.state.address;
        let validEmail = this.state.email;
        let validPhoneNumber = this.state.phoneNumber;
        if(this.checkEmail(validEmail)==true && this.checkPhoneNumber(validPhoneNumber)==true && this.checkFields(validField)){
            return true;
        } else {
            return false;
        }
    }

    handleChangeFisrtName = event =>
    this.setState({ firstName: event.target.value });
    handleChangeLastName = event =>
    this.setState({ lastName: event.target.value });
    handleChangePhoneNumber = event =>
    this.setState({ phoneNumber: event.target.value });
    handleChangeAddress = event =>
    this.setState({ address: event.target.value });
    handleChangeEmail = event =>
    this.setState({ email: event.target.value });

    backToList(){
        window.location.href = "/"
    }


    render (){
        return (
            <div className="wrapper">
                <h3>Add a person</h3>
                <p>all fields are required</p><br/>
                <span id="error-form"></span><br/>
                <label>First name</label><br/>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChangeFisrtName} required/><br/>
                <span className="error-field"></span>
                <label>Last name</label><br/>
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChangeLastName} required/><br/>
                <span className="error-field"></span>
                <label>Phone number</label><br/>
                <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChangePhoneNumber} required/><br/>
                <span id="error-phone"></span>
                <label>Address</label><br/>
                <input type="text" name="address" value={this.state.address} onChange={this.handleChangeAddress} required/><br/>
                <span className="error-field"></span>
                <label>E-mail</label><br/>
                <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail} required/><br/>
                <span id="error-email"></span><br/>
                <button className="btn" onClick={this.validate}>Add</button>
                <button onClick={this.backToList}>Back to the list</button>
            </div>
        )};
        
   
    }

  
  
  export default AddPersonPage;