import { template, select } from './settings.js';
import utils from './utils.js';

class Home {
  constructor(data){
    const thisHome = this;
    
    thisHome.data = data;
    thisHome.render();
   
  }
  render(){
    const thisHome = this;

    const generatedHtml = template.products(thisHome.data);
    
    const productElement = utils.createDOMFromHTML(generatedHtml);

    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.appendChild(productElement);

  }
}

export default Home;