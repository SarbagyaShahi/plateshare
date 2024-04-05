import React from 'react';
import classes from '../../styles/Cartpage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Table from 'react-bootstrap/Table';

export default function Cartpage({cartData}) {

  return (

    <div>
      <Header />

      <Table responsive style={{'marginTop': '5rem'}}>
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
          {/* Console.log(cartData)
          {cartData.map(item => (
            <tr key={item.id}>
              <td>{item.productId}</td>
              <td>{item.name}</td>
            </tr> */}
            {/* ))} */}
          {/* <tr>
            <td>1</td>
            <td>Name here</td>
            <td>Price here</td>
            <td>Quantity here</td>
            <td>Amount here</td>
          </tr> */}
        </tbody>
      </Table>

      <input placeholder='location'/>
      


    </div>
  )
}
