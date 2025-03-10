export const cart=[]

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
      quantity:quantityToBeAdded
    });
  }
}

