// import { select } from './settings.js';
import Product from './product.js';
import Home from './home.js';


const app = {
  initPages: function() {     /* uruchamiana w momencie odswiezenia strony*/
    const thisApp = this;
    thisApp.pages = document.querySelector('#pages').children; /* kontenery podstron */
    
    thisApp.navLinks = document.querySelectorAll('.navbar a'); /* wszystkie linki prowadzace do  podstron*/

    const idFromHash = window.location.hash.replace('#/', '');      /* z url strony wydobywamy id podstrony ktora ma byc otwarta jako domyslna */
 
    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id==idFromHash){          /* sprawdzamy czy ktoras z podstron pasuje do idFromHash,  */
        pageMatchingHash = page.id;     /* jesli nie to wyswietlamy domyslna strone - czyli pierwsza [0] */
        break;                          /* jesli pasuje to przypisujemy jej id jako domyslna strone */
      }
    }
    thisApp.activatePage(pageMatchingHash);   /* a ktywujemy odpowiednia postrone*/

    for(let navLink of thisApp.navLinks){
      navLink.addEventListener('click', function(event){    /* dodajemy nasluchiwacze do wszystkich linkow od podstron */
        event.preventDefault();
        const clickedElement = this;
        const id = clickedElement.getAttribute('href').replace('#', ''); /*na klikniecie wydobywamy atrubut href kliknietego linka */
        thisApp.activatePage(id);       /*i aktywujemy odpowiednia strone o tym id */

        window.location.hash = '#/' + id;     /* zmieniamy url zeby strona nie przeskakiwala do sekcji z dana podstrona */
      });
    }

  },
  activatePage: function(pageId){
    const thisApp = this;
    for(let page of thisApp.pages){
      if (page.id == pageId){
        page.classList.add('active');
      }
      else{
        page.classList.remove('active');
      }
    }

    for(let link of thisApp.navLinks){
      if (link.getAttribute('href')=='#'+ pageId){
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
      else{
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    }
    

  },
  initNavbar: function(){
    const thisApp = this;
    thisApp.navButton = document.querySelector('.navbar-toggler');
    console.log(thisApp.navButton);
    thisApp.navButton.addEventListener('click', function(event){
      event.preventDefault();
      console.log('kliknawszy');
      thisApp.navbar = document.querySelector('.navbar-collapse');

      thisApp.navbar.classList.toggle('active');
    });


  },

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
        
        thisApp.initProductPage();
        thisApp.initHomePage();
        
      }); 
  },
  initHomePage: function(){
    const thisApp = this;
    for(let productData in thisApp.data.products){
          
      new Home(thisApp.data.products[productData]);
    }
  },

  initProductPage: function(){
    const thisApp = this;
    for(let productData in thisApp.data.products){
          
      new Product(thisApp.data.products[productData]);
    }
  },

  init: function(){
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    this.initNavbar();
  }
};

app.init();