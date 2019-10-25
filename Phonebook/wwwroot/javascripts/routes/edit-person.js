import React, {Component} from 'react';
import {withRouter} from 'react-router';


class EditPersonPage extends Component{
    constructor(props) {
      super(props);
      this.saveChanges = this.saveChanges.bind(this);
      //this.deletePerson = this.deletePerson.bind(this);
      this.validate = this.validate.bind(this);
      this.formValid = this.formValid.bind(this);   
  
      this.state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: ''
      };
    }

    componentDidMount(){
      fetch(`http://localhost:5000/api/single-person/${this.props.match.params.id}`)
    .then(res => {
      return res.json();      
    }).then(result => {
        this.setState({ ...result });
        console.log(this.state);
      },
      error => {
        console.log(error);
      })

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
    };

    validate() {
      console.log(this.formValid())
      if (!this.formValid()){
        console.log('form isnt correct')
      } else {
          this.saveChanges()
      }
    }

    checkPhoneNumber(number){
        console.log(number);
        if(!number.match(/^\d{10}$/)){
            console.log("Please put in a proper phone number, 10 digits");
            return false;
        } else {
            return true;
        }
    }

    checkEmail(email){
        console.log(email);
        if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            console.log("Please put in a proper email");
            return false;
        } else {
            return true;
        }
    }

    checkFields(fields){
        if(fields===''){
            console.log("These fields can't be empty");
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
            alert("form isn't valid")
            return false;
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
   
    
    /*deletePerson(){
      fetch(`http://localhost:5000/api/delete-person/${this.props.match.params.id}`, {
        method: 'DELETE'})
        .then(res => {
        return res
    })
    .catch(err => console.error(err))
    }*/
    
    render(){
     
      console.log(this.props);
      console.log("State in render: ", this.state); 
        return(
          <div>
            <div>
            <h3>Edit a person</h3>
                <input type="text" value={this.state.firstName} onChange={this.handleChangeFisrtName}/><br/>
                <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName}/><br/>
                <input type="text" value={this.state.phoneNumber} onChange={this.handleChangePhoneNumber}/><br/>
                <input type="text" value={this.state.address} onChange={this.handleChangeAddress}/><br/>
                <input type="text" value={this.state.email} onChange={this.handleChangeEmail}/><br/>
            </div>
            <button onClick={this.validate}>Save</button>            
            <button onClick={this.backToList}>Back to the list</button>
          </div>
        )
    }
}

export default withRouter(EditPersonPage);

//<button onClick={this.deletePerson}>Delete</button>