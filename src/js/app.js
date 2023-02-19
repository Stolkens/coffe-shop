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
        
        for(let productData in thisApp.data.products){
          
          new Product(thisApp.data.products[productData]);
        }
      }); 
  },

  init: function(){
    const thisApp = this;
    thisApp.initData();

  }
};

app.init();