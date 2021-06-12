export const paramsRequestForBrandList = (data) => {
  console.log(data);
  let paramsRequest = {};

  return (paramsRequest = {
    collection: "brand",
    req: "searchData",
    product: data.product,
    component: "listBrand",
    field: "support",
  });
};

export const paramsRequestForProductList = (data) => {
  console.log(data);
  let paramsRequest = {};

  return (paramsRequest = {
    collection: "products",
    req: "getProductsByBrand",
    brand: data.brand,
    product: data.product,
    component: "listProducts",
  });
};

export const paramsRequestForProductInfo = (data) => {
  console.log(data);
  let paramsRequest = {};

  return (paramsRequest = {
    collection: "products",
    req: "getProductByID",
    component: "productInfo",
    id: data.id,
  });
};
