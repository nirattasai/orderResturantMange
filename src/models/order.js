import React from 'react'
import { useState, useEffect} from 'react'
import { db } from "./../firebase"
import '../css/style.css'
import '../css/order.css'
import TheHeader from '../components/TheHeader'

const Order =()=> {

    const [orderList, setOrderList] = useState({
        order: []
    })

    const downloadOrder = async () => {
        db.ref(`/table/table_no${localStorage.tableNo}/allOrder/orderNo${localStorage.orderNo}`).on('value', snapshot => {
            const data = snapshot.val()
            console.log(data)
            if (data) {
                setOrderList({
                    order: Object.keys(data),
                    data: data
                })
            }
        })
    }


    useEffect(() => {
        downloadOrder()
        console.log(orderList)
    }, db.ref(`/order`))

    return (
        <div>
            <TheHeader/>
            <br></br>
            <div class="menu-box1">Test Menu Item</div>
            {orderList.order.map((key, index) => {
                    return (
                        <div class='menu-box1'>
                            MenuName : {orderList.data[key].menuName}<br/>
                            MenuID : {orderList.data[key].menuID}<br/>                       
                            Amount : {orderList.data[key].amount}
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default Order;