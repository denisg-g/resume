import React, { useRef, useEffect } from 'react'

export default function Paypal(props) {

  const paypal = useRef()

  useEffect(() => {  
    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color:  'blue',
        shape:  'rect',
        label:  'paypal'
      },
      createOrder: (data,actions,err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [{
            description: "Donacion para Denis Garcia Developer",
            amount: {
              value: 10.00
            }
          }]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        document.getElementById('modal').style.display = 'flex'
        console.log(order)
      },
      onError: (err) => {
        console.log(err)
      }
    }).render(paypal.current)
  }, [])
  
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
