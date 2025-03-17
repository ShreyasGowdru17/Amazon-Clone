import Cart from  '../../data/cart-class.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {updateCheckOut} from '../../data/cart.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
hello();
import {deliveryOptions,getDeliveryOption,deliveryDayFormatting} from '../../data/deliverOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';


// const today=dayjs();
// const deliveryDate=today.add(7,'days');
// const dayDateFormat=deliveryDate.format('dddd,MMMM D');
// console.log(dayDateFormat);

export function renderOrderSummary(){
  let cartSummaryHTML='';

  const cart=new Cart('cart');

  cart.cartItems.forEach((cartItem)=>{
    const productId=cartItem.productId;

    const matchingProduct=getProduct(productId);

    const deliveryOptionId=cartItem.deliveryOptionId;
    const matchingId=getDeliveryOption(deliveryOptionId);
   
    cartSummaryHTML+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id} js-cart-item-container">
        <div class="delivery-date">
          Delivery date: ${deliveryDayFormatting(matchingId)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link"data-product-id=${matchingProduct.id}>
              Update
              </span>
              <input class="quantity-input js-quantity-input">
              <span class="save-quantity-link link-primary" data-product-save-id=${matchingProduct.id}>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct.id,cartItem)}
          </div>
        </div>
      </div>`;

  });

  function deliveryOptionsHTML(productId,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
      let dateString=deliveryDayFormatting(deliveryOption);
      const priceString=deliveryOption.priceCents===0 ?'FREE':`$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked= deliveryOption.id===cartItem.deliveryOptionId;
      html+=`
      <div class="delivery-option js-delivery-option" data-product-id=${productId} data-delivery-option-id=${deliveryOption.id}>
      <input type="radio" ${isChecked ?'checked':' '} 
        class="delivery-option-input"
        name="delivery-option-${productId}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
        </div>
    </div>`;
    });
    return html;
  }
  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;


  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeFromCart(productId);
        // const button=document.querySelector(`.js-cart-item-container-${productId}`);
        // button.remove();
        renderOrderSummary();
        renderPaymentSummary();
    })
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{

      const productId=updateLink.dataset.productId;
      const cartItem=document.querySelector(`.js-cart-item-container-${productId}`);
      cartItem.classList.add('is-editing-quantity');

      cartItem.querySelector('.save-quantity-link').addEventListener('click',()=>{
        const updatedQuantity=cartItem.querySelector('.js-quantity-input').value;
        updateCartQuantity(productId,updatedQuantity);
        cartItem.classList.remove('is-editing-quantity');
        localStorage.setItem('cart',JSON.stringify(cart));
        updateCheckOut();
        renderOrderSummary();
        renderPaymentSummary();
      });

    })
  });

  function updateCartQuantity(productId,updatedQuantity){
      updatedQuantity=Number(updatedQuantity);
      cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
          cartItem.quantity=updatedQuantity;
        }
      });
      
  }

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId,deliveryOptionId); 
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
