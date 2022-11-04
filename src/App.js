import {useEffect, useState} from 'react';
import {DistanceFilter} from './components/DistanceFilter';

function App() {

  return (
    <>
    <div className="box container-fluid">

      <div className="row scaniaBlue">
        <div className="d-flex flex-row-reverse">
          <img className="scaniaLogo m-2" src="https://www.scania.com/content/dam/scanianoe/market/master/homepage/scania-symbol.svg"/>
        </div>
      </div>

      <div className="row">
        <div className="scaniaHeader m-4">
          <div className="headerText">Driver evaluation</div>
        </div>
      </div>

      <div className="row">
        <div className="scaniaContent content p-5 m-0">
          <DistanceFilter />
        </div>
      </div>

    </div>
    </>
    
  );
}

export default App;
