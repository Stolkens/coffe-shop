export const select = {
  templateOf: {
    products : '#template-products',
  },
  
  containerOf: {
    products: '#products-wrapper',
  }
      
};

export const template = {
  products: Handlebars.compile(document.querySelector(select.templateOf.products).innerHTML),
};


