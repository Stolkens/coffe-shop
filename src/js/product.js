import { template } from './settings.js';
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
    console.log('yooo', thisProduct.data);
    console.log(generatedHtml);
    const productElement = utils.createDOMFromHTML(generatedHtml);
    const productContainer = document.querySelector('#products-wrapper');
    productContainer.appendChild(productElement);

  }
}

export default Product;