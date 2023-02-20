import { template, select } from './settings.js';
import utils from './utils.js';

class Product {
  constructor(data){
    const thisProduct = this;
    
    thisProduct.data = data;
    thisProduct.render();
  }
  render(){
    const thisProduct = this;

    const generatedHtml = template.products(thisProduct.data);
    
    const productElement = utils.createDOMFromHTML(generatedHtml);

    const productContainer = document.querySelector(select.containerOf.products);

    productContainer.appendChild(productElement);
  }
}

export default Product;