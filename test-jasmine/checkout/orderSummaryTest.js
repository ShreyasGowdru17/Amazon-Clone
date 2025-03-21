import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage,removeFromCart,cart} from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';


describe('test suite:renderOrderSummary',()=>{

  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done)=>{
    loadProducts(()=>{
      done();
    });
  })

  beforeEach(()=>{

    document.querySelector('.js-test-container').innerHTML=`
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionId:'1'
      },
      {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId:'2'
      }]);
    }); 

    loadFromStorage();
    renderOrderSummary();
  });

  it('dislpays the cart',()=>{

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    document.querySelector('.js-test-container').innerHTML='';
  });

  it('removes a product from the cart',()=>{

    document.querySelector(`.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(`${productId2}`);

    document.querySelector('.js-test-container').innerHTML='';
  });
});