import React from 'react';
import { 
  TileLayer, 
  LayersControl,
  LayerGroup,
  GeoJSON
} from 'react-leaflet';
import Clark from '../data/Clark.json';
import Nye from '../data/Nye.json';
import Esmeralda from '../data/Esmeralda.json';
import Lincoln from '../data/Lincoln.json';
import Mineral from '../data/Mineral.json';


const Layers = () => {
  const borderData = [Clark, Nye, Esmeralda, Lincoln, Mineral]
  
  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Basic Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {borderData.map((data) => {
          const geojson = data.features[0].geometry
          const county_name = data.features[0].properties.namelsad
          
          return (
            <>
              <LayersControl.Overlay checked name={county_name}>
                <LayerGroup>
                  <GeoJSON 
                    key={county_name} 
                    data={geojson}
                    opacity={1}
                    fillOpacity={0.0}                                
                  >                  
                  </GeoJSON>
                </LayerGroup>
              </LayersControl.Overlay>
            </>
          )
        })}
      </LayersControl>
    </>
  )
}

export default Layers