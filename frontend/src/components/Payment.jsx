import React , { useState, useEffect } from "react";
import tx_ref from './tx_ref'
import { data } from "react-router-dom";

function Payment() {
const secret_key="CHASECK_TEST-Dr5m3aqJxu4Tlr7X756jzTXgJoUyrXFb"
const [transactionData, setTransactionData] = useState(null);

const [records,setRecords]=useState([])
 
    const apiUrl = `https://api.chapa.co/v1/transaction/verify/kefiyalew-tx-11272024`;
    const apiKey = secret_key; // Replace with your Chapa API key

useEffect(()=>{

    fetch('https://api.chapa.co/v1/transaction/verify/kefiyalew-tx-11272024',{
        headers: {
                  'User-Agent':'Thunder Client (https://www.thunderclient.com)',
                  'Accept':'application/json',
                  'Authorization':`Bearer ${secret_key}`,
                  'Content-Type':'application/json',
                  'Accept-Encoding':'gzip,deflate,br',
                  'Connection':'keep-alive',
    }})
    .then(response=>response.json())
    .then(data=> setRecords(data))
    .catch(err=> console.log(err))

});


    // try {
    //   const response =  fetch(apiUrl, {
    //     mode:'no-cors',
    //     method: "GET",
    //     headers: {
    //       'User-Agent':'Thunder Client (https://www.thunderclient.com)',
    //       'Accept':'application/json',
    //       'Authorization':`Bearer ${secret_key}`,
    //       'Content-Type':'application/json',
    //       'Accept-Encoding':'gzip,deflate,br',
    //       'Connection':'keep-alive',
    //     }
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const data =  response.json();
    //   setTransactionData(data);
    // } catch (error) {
    //   console.error('Error fetching transaction data:', error);
    // }
 

    return (
        <div className="table-responsive py-0">
                        <table className="table my-0-def table-flush" id="example1">
                            <thead>
                                <tr>
                                    <th className="text-center">{transactionData}</th>
                                    <th className="text-center">Customer name </th>
                                    <th className="text-center">Amount </th>
                                     <th className="text-center">Payment Method </th>

                                    <th className="text-center">Chapa Refference </th>
                                    
                                    <th className="text-center">Type </th>
                                    <th className="text-center">Date </th>

                                </tr>
                            </thead>
                            <tbody>
                                                                                                        <tr>

                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">
                                            <span className="badge badge-pill badge-success"><i className="fas fa-circle"></i> </span>
                                        </td>

                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">
                                            -
                                        </td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">
                                                                                        ETB 10.00
                                                                                    </td>
                                        
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">
                                            test
                                        </td>
                                        <td className="text-center castro-copy" data-clipboard-text="APvjtBx0wqAzG">
                                           APvjtBx0wqAzG <i className="fal fa-copy"></i>
                                        </td>
                                        <td className="text-center castro-copy" data-clipboard-text="">- <i className="fal fa-copy"></i></td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">
                                            API
                                        </td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APvjtBx0wqAzG" className="text-center">2024/11/28 09:47:PM</td>

                                    </tr>
                                                                                                        <tr>

                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">
                                            <span className="badge badge-pill badge-success"><i className="fas fa-circle"></i> Success</span>
                                        </td>

                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">
                                            -
                                        </td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">
                                                                                        ETB 200.00
                                                                                    </td>
                                        
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">
                                            test
                                        </td>
                                        <td className="text-center castro-copy" data-clipboard-text="APmN5etNz1lxx">
                                           APmN5etNz1lxx <i className="fal fa-copy"></i>
                                        </td>
                                        <td className="text-center castro-copy" data-clipboard-text="">- <i className="fal fa-copy"></i></td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">
                                            API
                                        </td>
                                        <td data-href="https://dashboard.chapa.co/dashboard/view/transaction/APmN5etNz1lxx" className="text-center">2024/11/28 10:49:AM</td>

                                    </tr>
                                                            </tbody>
                        </table>
                    </div>
    );
}

export default Payment