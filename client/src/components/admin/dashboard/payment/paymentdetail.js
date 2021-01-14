import React,{useEffect,useState,useContext} from 'react'
import {context} from '../../../../contexts/context'
import {Button,ListGroup} from 'react-bootstrap'
import axios from 'axios'
import './paymentdetail.css'

const PaymentDetail = ()=>{

    const [payment,setPayment] =useState([]);
    const {adminLoginToken} = useContext(context)

    useEffect(()=>{

        const fetchData = async ()=>{

            try{
                const res = await axios.get('/api/payment/all',{headers:{
                    axdxmxixn:adminLoginToken
                }} );
    
                setPayment(res.data.payments)
            }

            catch(error){

                throw error;
            }

        }

        fetchData()
    },[]);

    const makeDate =(s)=>{

        const dateObj = new Date(s);

        const date = dateObj.getDate()+"/"+dateObj.getMonth()+1+"/"+dateObj.getFullYear();

        const time = dateObj.getHours()+":"+dateObj.getMinutes();

        return date+" "+time;
    }
    const mappedTableRow = payment.map((p)=>{
        return(<tr  >
            <td>
                {makeDate(p.date)}
            </td>
            <td  >
            {p.name}
            </td>

            <td>
            {p.phone}
            </td>
            <td>
                {p.bkash}
            </td>
            <td>
                {p.address}
            </td>
            <td >
               {p.order.itemInfo.map((o)=>{

                return(<div>
                            <div style={{border:"1px solid black" ,padding:"5%",marginBottom:"1%"}} >
                            <p>
                        <strong>book id :</strong> {o.bookId}
                        </p>
                        <p>
                       <strong>book name :</strong> {o.bookName}
                        </p>
                        <p>
                       <strong>unit</strong>  {o.unit}
                        </p>
                        <p>
                        <strong>price per unit</strong> {o.pricePerUnit}
                        </p>
                        <p>
                      <strong>total price per unit</strong>   {o.totalPricePerItem}
                        </p>



                            </div>

            
                    
                

                </div>)
               })}

            </td>
            <td>
                {p.total}
            </td>
        </tr>)
    })

    return(<div className="payment-list"  style={{marginTop:"5%"}} >

        <div>
            <h2>Payment Records</h2>
        

        </div>

        <div>
            <table  className="payment-table" cellSpacing="10px" cellPadding="10px"   >
                
                <tr  >
                    <th  >
                        Date
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        Bkash
                    </th>
                    <th>
                        Address
                    </th>
                    <th  >
                        Order
                    </th>
                    <th>
                        Total
                    </th>
                </tr>
                {mappedTableRow}
            </table>
        </div>
    </div>)




}

export default PaymentDetail