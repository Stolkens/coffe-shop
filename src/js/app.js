// import { select } from './settings.js';
import Product from './product.js';


const app = {

  initData: function(){
    const thisApp = this;
    thisApp.data ={};
    const url = 'http://localhost:3131/products';
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.products = parsedResponse;
        // console.log(thisApp.data.products);
        for(let productData in thisApp.data.products){
          console.log(thisApp.data.products[productData]);
          const testProduct = new Product(thisApp.data.products[productData]);
          console.log('testPoroduct', testProduct);
        // thisApp.initProducts();
        }
      });
   
    // },
    // initProducts: function(){
    //   const thisApp = this;
      
    //   new Product(thisApp.productData);
    
    
  },
  init: function(){
    const thisApp = this;
    thisApp.initData();
    // thisApp.initProducts();


  }
};

app.init();