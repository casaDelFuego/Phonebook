import React, { Component} from 'react';
import $ from "jquery";

const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
};

class AddPersonPage extends Component  {
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
        //this.formValid = this.formValid.bind(this);
        /*this.checkAddress = this.checkAddress.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkFirstName = this.checkFirstName.bind(this);
        this.checkLastName = this. checkLastName.bind(this);
        this.checkPhoneNumber = this.checkPhoneNumber.bind(this);*/
        this.handleChangeFisrtName = this.handleChangeFisrtName.bind(this);
        this.FirstNameValid = this.FirstNameValid.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            email: '',
            isFirstNameValid: true,
            isLastNameValid: true,
            isPhoneNumberValid: true,
            isAddressValid: true,
            isEmailValid: true
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
        }
    }

    /*checkPhoneNumber(number){
        console.log(number);
        if(!number.match(/^\d{10}$/)){
            document.getElementById('error-phone').innerHTML = "Please put in a proper phone number, 10 digits";
            this.setState({isPhoneNumberValid: false});
            return false;
        } else {
            document.getElementById('error-phone').innerHTML = "";
            this.setState({isPhoneNumberValid: true});
            return true;
        }
    }

    checkEmail(email){
        console.log(email);
        if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            document.getElementById('error-email').innerHTML = "Please put in a proper email";
            this.setState({isEmailValid: false});
            return false;
        } else {
            document.getElementById('error-email').innerHTML = "";
            this.setState({isEmailValid: true});
            return true;
        }
    }*/

    checkFirstName(firstName){
        if(firstName===''){
            document.getElementById('error-firstName').innerHTML = "This field can't be empty";
            this.setState({isFirstNameValid: false})
            return false;
        } else {
            document.getElementById('error-firstName').innerHTML = "";
            this.setState({isFirstNameValid: true})
            return true;
        }
    }
    /*
    checkLastName(lastName){
        if(lastName===''){
            document.getElementById('error-lastName').innerHTML = "This field can't be empty";
            LastNameValid();
            return false;
        } else {
            document.getElementById('error-lastName').innerHTML = "";
            this.setState({isLastNameValid: true});
            return true;
        }
    }

    checkAddress(address){
        if(address===''){
            document.getElementById('error-address').innerHTML = "This field can't be empty";
            this.setState({isAddressValid: false});
            return false;
        } else {
            document.getElementById('error-address').innerHTML = "";
            this.setState({isAddressValid: true});
            return true;
        }
    }

    formValid() {
        let validFirstName = this.state.firstName;
        let validLastName = this.state.lastName;
        let validAddress = this.state.address;
        let validEmail = this.state.email;
        let validPhoneNumber = this.state.phoneNumber;
        if(this.checkEmail(validEmail)==true 
        && this.checkPhoneNumber(validPhoneNumber)==true 
        && this.checkFirstName(validFirstName)==true
        && this.checkLastName(validLastName)==true
        && this.checkAddress(validAddress)==true) { 
            this.setState({
            isFirstNameValid: true,
            isLastNameValid: true,
            isPhoneNumberValid: true,
            isAddressValid: true,
            isEmailValid: true
            })
            return true;
        } else {
            return false;
        }
    }*/

    handleChangeFisrtName(event){
        this.setState({ firstName: event.target.value });
        this.checkFirstName();
    }
    /*this.setState({ firstName: event.target.value });
    handleChangeLastName = event =>
    this.setState({ lastName: event.target.value });
    handleChangePhoneNumber = event =>
    this.setState({ phoneNumber: event.target.value });
    handleChangeAddress = event =>
    this.setState({ address: event.target.value });
    handleChangeEmail = event =>
    this.setState({ email: event.target.value });*/

    backToList(){
        window.location.href = "/"
    }

    FirstNameValid (){
        this.checkFirstName();
    } 
    /*LastNameValid = () => this.setState({isLastNameValid: false});  
    PhoneNumberValid = () => this.setState({isPhoneNumberValid: false});
    AddressValid = () => this.setState({isAddressValid: false});
    EmailValid = () => this.setState({isEmailValid: false});*/

    render (){

        return (
            <div className="wrapper">
                <h3>Add a person</h3>
                <p>all fields are required</p><br/>
                <span id="error-form"></span><br/><br/>
                <label>First name</label><br/>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChangeFisrtName} onBlur={this.FirstNameValid} style={{border: this.state.isFirstNameValid ? '1px solid black' : '1px solid red'}}/><br/>
                <span id="error-firstName"></span><br/>
                
                <button className="btn" onClick={this.validate}>Add</button>
                <button onClick={this.backToList}>Back to the list</button>
            </div>
        )};
        
   
    }

  
  
  export default AddPersonPage;

  /*<label>Last name</label><br/>
  <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChangeLastName} onBlur={this.LastNameValid} style={{border: this.state.isLastNameValid ? '1px solid black' : '1px solid red'}}/><br/>
  <span id="error-lastName"></span><br/>
  <label>Phone number</label><br/>
  <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChangePhoneNumber} onBlur={this.PhoneNumberValid} style={{border: this.state.isPhoneNumberValid ? '1px solid black' : '1px solid red'}}/><br/>
  <span id="error-phone"></span><br/>
  <label>Address</label><br/>
  <input type="text" name="address" value={this.state.address} onChange={this.handleChangeAddress} onBlur={this.AddressValid} style={{border: this.state.isAddressValid ? '1px solid black' : '1px solid red'}}/><br/>
  <span id="error-address"></span><br/>
  <label>E-mail</label><br/>
  <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail} onBlur={this.EmailValid} style={{border: this.state.isEmailValid ? '1px solid black' : '1px solid red'}}/><br/>
  <span id="error-email"></span><br/>*/