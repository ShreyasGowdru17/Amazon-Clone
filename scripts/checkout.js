import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-class.js'
//import '../data/backend-practise.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';


Promise.all([
  /*new Promise((resolve)=>{
    console.log('Starting Promise')
    loadProducts(()=>{
      console.log('Products Loaded');
      resolve(); 
    });
  })*/
 loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
   })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

/*new Promise((resolve)=>{
  console.log('Starting Promise')
  loadProducts(()=>{
    console.log('Products Loaded');
    resolve(); 
  });
}).then(()=>{
   return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
   });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
 })*/


/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

