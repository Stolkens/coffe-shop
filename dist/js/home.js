import { template, select } from './settings.js';
import utils from './utils.js';

class Home {
  constructor(data){
    const thisHome = this;
    
    thisHome.data = data;
    thisHome.render();
    thisHome.carousel();
   
  }
  render(){
    const thisHome = this;

    const generatedHtml = template.products(thisHome.data);
    
    const productElement = utils.createDOMFromHTML(generatedHtml);

    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.appendChild(productElement);

  }
  carousel(){
    // eslint-disable-next-line no-undef
    new Flickity(select.containerOf.carousel, {
      prevNextButtons: false,
      autoPlay: 5000,
      wrapAround: true,
      pageDots: false
    });
  }
}

export default Home;