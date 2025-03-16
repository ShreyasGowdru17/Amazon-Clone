class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey=localStorageKey;
    this.loadFromStorage();
    this.updateCheckOut();
  }

  loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
    if(this.cartItems===null || !this.cartItems ){
      this.cartItems=[{
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

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  updateCheckOut(){
    let cartItemsCount=document.querySelector('.js-return-to-home-link');
    if (cartItemsCount) {
      cartItemsCount.innerHTML = this.cartQuantity()+' '+'items'; // Ensures no empty text
    }
  }
  cartQuantity(){
    let totalQuantity=0;
    this.cartItems.forEach((cartItem)=>{
      totalQuantity+=cartItem.quantity;
    });
    return totalQuantity;
  }

  addToCart(productId){

    const addedDisplay=document.querySelector(`.js-added-to-cart-${productId}`)
  
    addedDisplay.classList.add('show-added-to-cart');
  
    setTimeout(()=>{
      addedDisplay.classList.remove('show-added-to-cart');
    },3000);
  
    let matchingItem;
  
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId===productId){
        matchingItem=cartItem;
      }}
    );
    let quantityToBeAdded=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  
    if(matchingItem){
      matchingItem.quantity+=quantityToBeAdded;
    }
    else{
      this.cartItems.push({
        productId:productId,
        quantity:quantityToBeAdded,
        deliveryOptionId:'1'
      });
    }
    this.saveToStorage();
    this.updateCheckOut();
  
  }
  removeFromCart(productId){
    const newCart=[];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems=newCart;
    this.saveToStorage();
    this.updateCheckOut();  
  }
  updateDeliveryOption(productId,deliveryOptionId){

    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId===productId){
        matchingItem=cartItem;
      }}
    );
  
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  
  }

}


const cart= new Cart('cart-oop');
const businessCart=new Cart('business-cart');



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart)










