import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import classes from '../../styles/Cartpage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Table from 'react-bootstrap/Table';

export default function Cartpage({ cartData }) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState([27.70770481291534, 85.32522362345625]);
  //Send location variable in place of location in database
  const [address, setAddress] = useState("")

  const onLocationChange = (location) => {
    setLocation(location)
  }

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${location[0]}+${location[1]}&key=12fb8a882afb473aafcc3be8ea7267cb`

        // New API KEY
        // `https://api.opencagedata.com/geocode/v1/json?q=${location[0]}+${location[1]}&key=0f11663459b6469293821368875f9787`
      );
      const data = await response.json();
      const locationName = data.results[0].formatted;
      setAddress(locationName);

    };

    fetchAddress();
  }, [location]);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (mapInstance) {
      mapInstance.on('moveend', () => {
        const center = mapInstance.getCenter();
        setLocation([center.lat, center.lng]);
        onLocationChange([center.lat, center.lng]);
      });
      console.log(location);
    }
  }, [onLocationChange]);

  return (

    <div>
      <Header />

      <Table responsive style={{ 'marginTop': '5rem' }}>
        <thead>
          <tr>
            <th>ID</th>

            <th>Name of Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>1</td>
            <td>Name here</td>
            <td>Price here</td>
            <td>Quantity here</td>
            <td>Amount here</td>
          </tr>
        </tbody>
      </Table>

      <div className='container'>
        <div className="row">
          <div className="col-8">
            <MapContainer center={location} zoom={12} style={{ height: "50vh" }} ref={mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {location && (
                <Marker position={location}>
                  <Popup>
                    {address}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="col">
            <label htmlFor="" className='form-text' >Delivery Location</label>
            <br />
            <input className='form-control' value={address} type="text" disabled />

            <br />

            <button className='btn btn-primary'>Checkout</button>
          </div>

        </div>
      </div>



    </div>
  )
}
