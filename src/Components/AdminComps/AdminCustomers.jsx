import React, { useState } from 'react'
import GenericTable from '../GenericTable'

const AdminCustomers = () => {

  const data = [{FullName:"Avi Ron",JoinedAt:"17/03/1997",ProdcutsBought:[{Product:"Watch",Qty:"3",Date:"01/01/2020"},
  {Product:"PC",Qty:"1",Date:"01/01/2020"}]},
  {FullName:"Dana Cohen",JoinedAt:"11/07/2007",ProdcutsBought:[{Product:"TV",Qty:"4",Date:"03/12/2007"},
  {Product:"PC",Qty:"7",Date:"01/01/2020"}]}]

  const [Costumers,SetCostumers] = useState(data)

  return (
    <div>
      <GenericTable data={Costumers} />
    </div>
  )
}

export default AdminCustomers
