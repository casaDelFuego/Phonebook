import React, { Component} from 'react';


class StartPage extends Component{
  constructor() {
    super();
    this.state = {
      people: []
    };
  };

  componentDidMount(){
    fetch("http://localhost:5000/api/list-of-people")
    .then(res => {
      return res.json();      
    }).then(result => {
      console.log(result);
      let list = [];
      result.forEach(res => {
          list.push(res);
      });
      return this.setState({
          people: list
      });
      },
      error => {
        console.log(error);
      })
   }

   redirectToAddPerson() {
    window.location.href = "/add-person"
   }


   showSinglePerson = (id) => {    
    console.log(id);
    window.location.href = `/single-person/${id}`
   }

   toEdit = (id) => {
    
    console.log('button edit was clicked')
    
    window.location.href = `/edit-person/${id}`
  }

  toDelete(id){
    let result = confirm("Are you sure to delete?");
    if(result){      
      this.deletePerson(id)
      window.location.href = '/'
    }
    //console.log('here is supposed to be a popup', id)    
  }


  deletePerson(id){
    fetch(`http://localhost:5000/api/delete-person/${id}`, {
      method: 'DELETE'})
      .then(res => {
        console.log('this is res from then', res)
      return res
  })
  .catch(err => console.error('this is error from catch', err))
  }

   render(){
     const items = this.state.people.map((item, index) =>      
      <tr key={index} >        
        <td onClick={() => this.showSinglePerson(item.id)}>{item.firstName}</td>
        <td onClick={() => this.showSinglePerson(item.id)}>{item.lastName}</td> 
        <td onClick={() => this.showSinglePerson(item.id)}>{item.phoneNumber}</td> 
        <td onClick={() => this.showSinglePerson(item.id)}>{item.address}</td> 
        <td onClick={() => this.showSinglePerson(item.id)}>{item.email}</td> 
        <td>
          <button onClick={() => this.toEdit(item.id)}>Edit</button>
          <button onClick={() => this.toDelete(item.id)}>Delete</button>         
        </td>        
      </tr>
      )
    return(
      <div className="mainTable">
        <table>
          <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>E-mail</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {items}
          </tbody>         
        </table>
        <button onClick={this.redirectToAddPerson}>Add new person</button>
      </div>
    );
  }
};
   

export default StartPage;


  //onClick={() => this.showSinglePerson(item.id)}
