import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {getAddressValidationError, 
  getEmailValidationError, 
  getFirstNameValidationError, 
  getLastNameValidationError, 
  getPhoneNumberValidationError} from './validationFunctions'

class EditPersonPage extends Component{
    constructor(props) {
      super(props);
      this.saveChanges = this.saveChanges.bind(this);
      this.validate = this.validate.bind(this);
      this.compareValues = this.compareValues.bind(this);
      this.backToList = this.backToList.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.validateInput = this.validateInput.bind(this);
      this.handleInputBlur = this.handleInputBlur.bind(this);

  
      this.state = {
        id: this.props.match.params.id,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        phoneNumberError: '',
        addressError: '',
        emailError: '',
        originalState:{}
      };
    }

    componentDidMount(){
      fetch(`http://localhost:5000/api/single-person/${this.props.match.params.id}`)
    .then(res => {
      return res.json();      
    }).then(result => {
        this.setState({ ...result, originalState: result });
        // save original state as an object in your state and just don't update it
        console.log('state after component did mount', this.state);
      },
      error => {
        console.log(error);
      })

   }

    backToList(){
      console.log(this.compareValues())
      if(this.compareValues()==true){
        window.location.href = "/"
      } else {
        let result = confirm("Do you want to ignore these changes?");
        if(result){      
          window.location.href = '/'
        }
      }      
    };

    compareValues(oldValue, newValue) {
      oldValue = this.state.originalState;
      newValue = this.state;
      console.log('old and new values respectively', oldValue, newValue)
      if(oldValue.id === newValue.id
        && oldValue.firstName === newValue.firstName
        && oldValue.lastName === newValue.lastName
        && oldValue.phoneNumber === newValue.phoneNumber
        && oldValue.address === newValue.address
        && oldValue.email === newValue.email){
        return true;
      } else {
        return false;
      }
    };

    validate() {
      if(
          !this.state.addressError &&
          !this.state.emailError &&
          !this.state.firstNameError &&
          !this.state.lastNameError &&
          !this.state.phoneNumberError
      ){        
          this.saveChanges()
      }
  }

    saveChanges(){
      fetch(`http://localhost:5000/api/edit-person/${this.props.match.params.id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          email: this.state.email
        })})
      .then(res => {
        return res.json();      
      })
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response)); 
      window.location.href = `http://localhost:5000/single-person/${this.props.match.params.id}`
      
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
 
    
    render(){     
      console.log('props are:', this.props);
      console.log("State in render: ", this.state); 
        return(
          <div>
            <div>
            <h3>Edit a person</h3>
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

            </div>
            <button onClick={this.validate}>Save</button>            
            <button onClick={this.backToList}>Back to the list</button>
          </div>
        )
    }
}

export default withRouter(EditPersonPage);

//<button onClick={this.deletePerson}>Delete</button>

      //this.deletePerson = this.deletePerson.bind(this);


   /*deletePerson(){
      fetch(`http://localhost:5000/api/delete-person/${this.props.match.params.id}`, {
        method: 'DELETE'})
        .then(res => {
        return res
    })
    .catch(err => console.error(err))
    }*/