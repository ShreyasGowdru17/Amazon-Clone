import {cart} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions,getDeliveryOption } from '../../data/deliverOptions.js';

export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;

  cart.forEach((cartItem)=>{

    let {productId,deliveryOptionId}=cartItem;
    const matchingProduct=getProduct(productId);
    productPriceCents+=matchingProduct.priceCents*cartItem.quantity;
    
    const deliveryOption=getDeliveryOption(deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents;

    
  });
 
  const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
  const taxCents=totalBeforeTaxCents*0.1;
  const totalCents=totalBeforeTaxCents+taxCents;

  function itemsQuantity(){
    let quantity=0;
    cart.forEach((cartItem)=>{
      quantity+=cartItem.quantity;
    });
    return quantity;
  }
  const quantity=itemsQuantity();
  const paymentSummaryHTML=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>`;
 
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
}