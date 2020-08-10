import React from 'react';
import Form from './components/form';
import Form2 from './components/form2';

class App extends React.Component{
  render(){
    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col">
            <Form2 />
            </div>
            <div class="col">
            <Form />
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default App;
