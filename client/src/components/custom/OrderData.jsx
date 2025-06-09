import React from 'react'
import {Card} from "../ui/card"
const OrderData = ({
    amount=100,
    address="Hingna Road,Ambazari,Nagpur",
    status="pending",
    createdAt="2021-09-01",
    updatedAt="2021-09-01"
}) => {
  return (
    <Card className="grid gap-2 p-2">
        <div>

        </div>
    </Card>
  )
};

export default OrderData;