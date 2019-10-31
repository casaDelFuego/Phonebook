import React, { Component} from 'react';
import $ from "jquery";
import {getAddressValidationError, 
        getEmailValidationError, 
        getFirstNameValidationError, 
        getLastNameValidationError, 
        getPhoneNumberValidationError} from './validationFunctions'

const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
};

class AddPersonPage extends Component  {
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            firstNameError: '',
            lastNameError: '',
            phoneNumberError: '',
            addressError: '',
            emailError: ''
           
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
        this.validateInput();
        if(!this.state.firstName ||
           !this.state.lastName ||
           !this.state.phoneNumber ||
           !this.state.address ||
           !this.state.email){
            this.validateInput('firstName');
            this.validateInput('lastName');
            this.validateInput('phoneNumber');
            this.validateInput('address');
            this.validateInput('email');
            return false;
        } else {
            console.log('we hit the else', this.state)
            this.addPerson()
            window.location.href = '/'
            return true;
        }
    }
  
   

    validateInput(name) {
        if (name === 'firstName') {
            this.setState({ firstNameError: getFirstNameValidationError(this.state.firstName) });
        }

        if (name === 'lastName') {
            this.setState({ lastNameError: getLastNameValidationError(this.state.lastName) });
        }

        if (name === 'phoneNumber') {
            this.setState({ phoneNumberError: getPhoneNumberValidationError(this.state.phoneNumber) });
        }

        if (name === 'address') {
            this.setState({ addressError: getAddressValidationError(this.state.address) });
        }

        if (name === 'email') {
            this.setState({ emailError: getEmailValidationError(this.state.email) });
        }
    }

    handleInputChange(event){
        const name = event.target.name;
        const newValue = event.target.value;

        this.setState({ 
            [name]: newValue
        }, () => {
            this.validateInput(name);
        });
    }

    handleInputBlur(event) {
        const name = event.target.name;
        this.validateInput(name);
    }

    backToList(){
        window.location.href = "/"
    }



    render (){

        return (
            <div className="wrapper">
                <h3>Add a person</h3>
                <p>All fields are required</p><br/>
                
                <label>First name</label><br/>
                <input 
                type="text" 
                name="firstName" 
                value={this.state.firstName} 
                onChange={this.handleInputChange} 
                onBlur={this.handleInputBlur}
                style={{border: this.state.firstNameError ? '1px solid red' : '1px solid black'}}/><br/>
                { this.state.firstNameError && <div><span id="error-firstName">{this.state.firstNameError}</span><br/></div> }
                
                <label>Last name</label><br/>
                <input 
                type="text" 
                name="lastName" 
                value={this.state.lastName} 
                onChange={this.handleInputChange} 
                onBlur={this.handleInputBlur} 
                style={{border: this.state.lastNameError ? '1px solid red' : '1px solid black'}}/><br/>
                { this.state.lastNameError && <div><span id="error-lastName">{this.state.lastNameError}</span><br/></div>}

                <label>Phone number</label><br/>
                <input 
                type="text" 
                name="phoneNumber" 
                value={this.state.phoneNumber} 
                onChange={this.handleInputChange} 
                onBlur={this.handleInputBlur} 
                style={{border: this.state.phoneNumberError ? '1px solid red' : '1px solid black'}}/><br/>
                { this.state.phoneNumberError && <div><span id="error-phone">{this.state.phoneNumberError}</span><br/></div>}

                <label>Address</label><br/>
                <input 
                type="text" 
                name="address" 
                value={this.state.address} 
                onChange={this.handleInputChange} 
                onBlur={this.handleInputBlur}
                style={{border: this.state.addressError ? '1px solid red' : '1px solid black'}}/><br/>
                { this.state.addressError && <div><span id="error-address">{this.state.addressError}</span><br/></div>}

                <label>E-mail</label><br/>
                <input 
                type="text" 
                name="email" 
                value={this.state.email} 
                onChange={this.handleInputChange} 
                onBlur={this.handleInputBlur} 
                style={{border: this.state.emailError ? '1px solid red' : '1px solid black'}}/><br/>
                { this.state.emailError && <div><span id="error-email">{this.state.emailError}</span><br/></div>}

                <button className="btn" onClick={this.validate}>Add</button>
                <button onClick={this.backToList}>Back to the list</button>
            </div>
        )};
        
   
    }

  
  
  export default AddPersonPage;

 /*<p style={{color: 'red'}}>{this.state.formError}</p> 
 !this.state.addressError &&
            !this.state.emailError &&
            !this.state.firstNameError &&
            !this.state.lastNameError &&
            !this.state.phoneNumberError &&
            (this.state.firstName!=='' || 
            this.state.lastName!==''||
            this.state.phoneNumber!==''||
            this.state.address!=='' ||
            this.state.email!=='')*/
 //this.setState({formError: 'You cannot add an empty form'})
  //formError: ''