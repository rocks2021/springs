import React, { useState } from 'react';
import { MapContainer, Marker, Popup, ZoomControl } from 'react-leaflet';
import Layers from './components/Layers'
import springsData from './data/Springs.json';


function App() {
  const [ springs, setSprings ] = useState( null );
  return (
    <>
      <div className='header'>
        <h1 style={{marginLeft:'8px'}}>Springs in Our Communities</h1>
        <p style= {{width: '77%', marginLeft:'8px',fontWeight:'bold', fontSize: '14px', marginBottom: '30px'}}>
          We actually have a lot of springs in Southern Nevada. 
          However, just as in other arid areas, many of them likely remain unmapped. Where are they?
          What do they look like? Where do they come from?
        </p>        
      </div>  
      <MapContainer 
          style={{height: '70vh', width: '100%'}}
          center = { [ 37.33254, -115.09724 ] }
          zoom = { 7 }
          scrollWheelZoom = { true }
          zoomControl = {false}

      >
        <Layers />

        <ZoomControl position='topright' />
       { springsData.map(eachData => (
         <Marker 
            key={eachData.Id} 
            position= {[eachData.Latitude, eachData.Longitude]}
            eventHandlers={{
              click: () => {
                setSprings(eachData)
              }
            }}
            
          />
       ))}

      { springs && (
        <Popup 
          position={ [ springs.Latitude, springs.Longitude ] }
          onClose={()=>{
            setSprings(null)
          }}
        >
          <div>
            <p>{ springs.Location }</p>
            
          </div>
        </Popup>
      )}

      </MapContainer> 
      <div className='footer'>
        <p style={{marginLeft:'8px', fontSize:'14px', fontWeight:'bold'}}>&copy; 2021 <a style={{color:'white'}} href="https://www.nova77.org">Nova77 STEM Workshop</a></p>
      </div>
    </>
  );
}

export default App;
