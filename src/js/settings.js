export const select = {
  templateOf: {
    products : '#template-products',
  }
};

export const template = {
  products: Handlebars.compile(document.querySelector(select.templateOf.products).innerHTML),
};