import { Redirect } from 'react-router';
import React from 'react';

function App() {
    return (
      <div className="App">
        <Redirect exact from="/" to="/login" />
      </div>
    );
  }
  
  export default App;