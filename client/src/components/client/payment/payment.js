import React,{useState,useContext,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import Navigation from '../navigation/navigation'
import WarningModal from './warningModal'
import {context} from '../../../contexts/context'
import "./payment.css"
const Payment = ()=>{

    const [items,setItems] = useState([])
    const [willPopup,setWillPopup] = useState(false)
    const {cart,countTotal} = useContext(context);
    const [name,setName] = useState("");
    const[address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const[bkash,setBkash] = useState("");
    const [order,setOrder] = useState({});
    const [total,setTotal] = useState(0);



    useEffect(()=>{

        setItems(cart);
        setTotal(countTotal());

        const orderDetails = cart.map((c)=>{
            return({
                bookId : c.item._id,
                bookName: c.item.name,
                unit:c.number,
                pricePerUnit:c.item.price,
                totalPricePerItem:c.item.price*c.number
            });


        });
        setOrder({itemInfo:orderDetails,total})
    },[cart])

    console.log("items in billing page",items);
    const mappedTableRow =items.map((c)=>{

       return (<tr>
            <td>
                {c.item.name}
            </td>
            <td>
                {c.item.price}
            </td>
            <td>
                {c.number}
            </td>
            <td>
             { `${c.item.price}*${c.number}=${c.item.price*c.number}`}
            </td>
        </tr> )
    })

return(<div className="">

    <Navigation/>

    <div className="container" >
    <h2  style={{textAlign:"center"}} > 
        PAYMENT
    </h2>

    <div className="bkashBox" >
        <p>Make your payment to this number</p>
        <p>Our Bkash No (Personal) </p>
        <p> <em>01831XXXXXXXXX </em> </p>
    </div>
    <div className="order" >

        <h2 style={{textAlign:"center"}} >Your Order</h2>

            {items.length>0?
                    <table style={{width:"100%"}} >
                    <tr>
                        <th>
                            Book Name
                        </th>
                        <th>
                            Price (per unit)
                        </th>
                        <th>
                            Unit
                        </th>
                        <th>
                            Total 
                        </th>
                    </tr>
                    {mappedTableRow}
                    <tr>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td  >
                            <strong>Total</strong> = {countTotal()}
                        </td>
                    </tr>
        
                    
                </table>
            :"Empty Order List"}
    </div>

     <div className="client-shipping-info" >
         <h2 style={{textAlign:"center"}} >
             SHIPPING INFO
         </h2>
        <Form onSubmit={(e)=>{ e.preventDefault(); setWillPopup(true)}} >
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your Name" 
            value={name} 
             disabled ={items.length===0? true :null}
            onChange={(e)=>{setName(e.target.value)}}
            required={true} />
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Your Phone Number" required={true}
            value={phone}
            disabled ={items.length===0? true :null}
            onChange={(e)=>{setPhone(e.target.value)}}
            />
            <Form.Label>Current Address</Form.Label>
            <Form.Control type="text" placeholder="District,City,ROad No,House No" 
             disabled ={items.length===0? true :null}
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            disabled ={items.length===0? true :null}
            required={true} />
            <Form.Label>Total Payment</Form.Label>
            <Form.Control type="number" placeholder="Total Payment"
            value={total}
            disabled={true}
            required={true} />
            <Form.Label>
                Bkash Number 
            </Form.Label>
            <Form.Control type="text" 
            value={bkash}
            disabled ={items.length===0? true :null}
            onChange={(e)=>{setBkash(e.target.value)}}
            required={true} placeholder="bkash No (the one you have used for the payment)" />
            </Form.Group>

            <Button  variant="primary" type="submit"  disabled ={items.length===0? true :null}  >
                Make Payment
            </Button>
        </Form>
     </div>
    </div>

    {willPopup?<WarningModal 
    
    paymentObj ={ {name,phone,bkash,address,order,total}}
    popupHandler={()=>{setWillPopup(false)}} />:null }
</div>)

}


export default Payment