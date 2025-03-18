
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'));
  if(cart===null || !cart.length ){
    cart=[{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId:'1'
    },
    {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
    }];
  }
}


updateCheckOut();
export function updateCheckOut(){
  let cartItemsCount=document.querySelector('.js-return-to-home-link');
  if (cartItemsCount) {
    cartItemsCount.innerHTML = cartQuantity()+' '+'items'; // Ensures no empty text
  }

}

export function cartQuantity(){
  let totalQuantity=0;
  cart.forEach((cartItem)=>{
    totalQuantity+=cartItem.quantity;
  });
  return totalQuantity;
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){

  const addedDisplay=document.querySelector(`.js-added-to-cart-${productId}`)

  addedDisplay.classList.add('show-added-to-cart');

  setTimeout(()=>{
    addedDisplay.classList.remove('show-added-to-cart');
  },3000);

  let matchingItem;

  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      matchingItem=cartItem;
    }}
  );
  let quantityToBeAdded=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  if(matchingItem){
    matchingItem.quantity+=quantityToBeAdded;
  }
  else{
    cart.push({
      productId:productId,
      quantity:quantityToBeAdded,
      deliveryOptionId:'1'
    });
  }
  saveToStorage();
  updateCheckOut();

}

export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
  updateCheckOut();  

}

export function updateDeliveryOption(productId,deliveryOptionId){

  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
      matchingItem=cartItem;
    }}
  );

  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToStorage();

}

export function loadCart(fun){

  const xhr=new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
  
}





