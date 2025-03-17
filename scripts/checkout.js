import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
//import '../data/cart-class.js'
//import '../data/backend-practise.js';
import {loadProducts} from '../data/products.js';
import '../../data/car.js';
loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
