import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UnknownPage from '../routes/unknown-page';
import StartPage from '../routes/startpage';
import AddPersonPage from '../routes/add-person';
import SinglePersonPage from '../routes/single-person';
import EditPersonPage from '../routes/edit-person';


const Routing = () => {

  return (
    <Router>
        <Switch>
          <Route path="/edit-person/:id" children={<EditPersonPage />}/>
          <Route path="/single-person/:id" children={<SinglePersonPage/>}/>
          <Route path="/add-person" component ={AddPersonPage}/>
          <Route path="/" component={StartPage}/>
          <Route>
            <UnknownPage/>
          </Route>
        </Switch>
    </Router>
  );  
} 

export default Routing;


/*const Routing = () => {
  const path = window.location.pathname;
    /*
    '/' -> ''
    '/add-person/foobar' -> 'add-person/foobar'
    
   const formattedPath = path.startsWith('/') ? path.substr(1) : path;
  
   if (formattedPath === '') {
       return <StartPage />;
   } else if (formattedPath === 'add-person') {
       return <AddPersonPage />;
   } else if (formattedPath.startsWith('single-person')) {
         const id = formattedPath.replace('single-person/', '');
       return <SinglePersonPage id={id} />;
   } else if (formattedPath.startsWith('edit-person')) {
         const id = formattedPath.replace('edit-person/', '');
       return <EditPersonPage id={id}/>
   } else {
       return <UnknownPage />;
   } 
  }*/
  