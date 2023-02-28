import Product from './product.js';
import Home from './home.js';
import { select, settings } from './settings.js';


const app = {
  initPages: function() {     /* uruchamiana w momencie odswiezenia strony*/
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children; /* kontenery podstron */
    
    thisApp.navLinks = document.querySelectorAll(select.nav.links); /* wszystkie linki prowadzace do  podstron*/

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
        page.classList.add(select.classNames.avtive);
      }
      else{
        page.classList.remove(select.classNames.avtive);
      }
    }

    for(let link of thisApp.navLinks){
      if (link.getAttribute(select.attribute.href)=='#'+ pageId){
        link.classList.add(select.classNames.avtive);
        link.setAttribute(select.attribute.currentPage, 'page');
      }
      else{
        link.classList.remove(select.classNames.avtive);
        link.removeAttribute(select.attribute.currentPage);
      }
    }
    

  },
  initNavbar: function(){
    const thisApp = this;
    thisApp.navButton = document.querySelector(select.nav.buttonToggler);
    thisApp.navButton.addEventListener('click', function(event){
      event.preventDefault();
      
      thisApp.navbar = document.querySelector(select.nav.collapse);

      thisApp.navbar.classList.toggle(select.classNames.avtive);
    });


  },

  initData: function(){
    const thisApp = this;
    thisApp.data ={};
    const url = settings.db.url + '/'+ settings.db.products;

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
    thisApp.initTitle();
    
  },

  initProductPage: function(){

    const thisApp = this;
    for(let productData in thisApp.data.products){
          
      new Product(thisApp.data.products[productData]);
    }
  },

  initTitle: function(){

    const mainTitles = [
      '<span>Home of</span><br><span>Original tastes</span>', 
      '<span>Real<br>Venezuela,</span><br><span>Real Coffee</span>', 
      '<span>Taste</span><br><span>Real Venezuela</span>'
    ];
    const titleContainer = document.querySelector(select.containerOf.mainTitle);
    const randomIndex = Math.floor(Math.random() * mainTitles.length);
    titleContainer.innerHTML = mainTitles[randomIndex];

  },

  init: function(){
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
    thisApp.initNavbar();
  }
};

app.init();