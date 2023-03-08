import React from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, GeoJSON, LayersControl, TileLayer} from "react-leaflet";
// import {default as features}  from "../data/countries.json";
import "../styles/covidMap.css"


const CovidMap = ({ countries }) => {

  const mapStyle = {
    fillColor : "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  }

  const onEachCountry = (country, layer)=> {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;

    const deaths = country.properties.deaths;
    const mortality_rate = country.properties.mortality_rate;
    const cases_28_days = country.properties.cases_28_days;
    const deaths_28_days = country.properties.deaths_28_days;

    layer.bindPopup(`Country Name: ${name} <br/> Confirmed Cases: ${confirmedText} <br /> Confirmed Deaths: ${deaths} <br/> Mortality Rate: ${mortality_rate} <br /> Cases Last 28 Days: ${cases_28_days} <br/> Deaths Last 28 Days: ${deaths_28_days}`);
  }


  return (
    <div className='map'>
      <MapContainer style={{height: "600px"}} zoom = {3} center = {[20, 100]} >
         <LayersControl>
            <LayersControl.Overlay checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="NASA Gibs Blue Marble">
                <TileLayer
                  url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
                  attribution="&copy; NASA Blue Marble, image service by OpenGeo"
                  maxNativeZoom={8}
                />
            </LayersControl.Overlay>
            </LayersControl>
        <GeoJSON style={mapStyle} data={countries} onEachFeature={onEachCountry} />

      </MapContainer>
    </div>
  )
}

export default CovidMap;