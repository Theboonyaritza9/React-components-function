import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './App.css';
import ComponentToPrint from './components/ComponentToPrint';

function App() {

  const componentRef = useRef();

  return (
    <div className="container">
      <ComponentToPrint ref={componentRef} />
      <ReactToPrint
        trigger={() => <button className="btn btn-primary">Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
}

export default App;
