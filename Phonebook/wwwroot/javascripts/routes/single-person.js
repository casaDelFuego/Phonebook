import React, {Component} from 'react';
import {withRouter} from 'react-router';

class SinglePersonPage extends Component{
  constructor(props) {
    super(props);
    this.toEdit = this.toEdit.bind(this)

    this.state = {
      person: {}
    };
  }

  componentDidMount(){
    fetch(`http://localhost:5000/api/single-person/${this.props.match.params.id}`)
    .then(res => {
      console.log(res)
      return res.json();            
    }).then(result => {
        this.setState({ person: result });
      },
      error => {
        console.log(error);
      })
   }

  backToList(){
    window.location.href = "/"
  };

  toEdit(){
    window.location.href = `/edit-person/${this.props.match.params.id}`
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <div>
          <h3>{this.state.person.firstName} {this.state.person.lastName}</h3>
          <p>Phone number: {this.state.person.phoneNumber}</p><br/>
          <p>Address: {this.state.person.address}</p><br/>
          <p>E-mail: {this.state.person.email}</p>
        </div>
        <button onClick={this.backToList}>Back to the list</button>
        <button onClick={this.toEdit}>Edit</button>
      </div>
    )
  }



}

export default withRouter(SinglePersonPage);

