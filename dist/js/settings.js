export const select = {
  templateOf: {
    products : '#template-products',
  },
  containerOf: {
    products: '#products-wrapper',
    home: '#home-wrapper', 
    mainTitle:'.main-title',
    pages: '#pages',
    carousel: '.main-carousel'
  }, 
  nav:{
    buttonToggler:'.navbar-toggler',
    collapse: '.navbar-collapse',
    links: '.navbar a'
  },
  classNames:{
    avtive: 'active'
  },
  attribute: {
    href:'href',
    currentPage:'aria-current'
  }   
};
export const settings = {
  db:{
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    products: 'products'
  }
};

export const template = {
  products: Handlebars.compile(document.querySelector(select.templateOf.products).innerHTML),
};


