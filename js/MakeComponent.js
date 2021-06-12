import { ListBrand } from "./component/ListBrand.js";
import { ListProducts } from "./component/ListProducts.js";
import { ServicesInfo } from "./component/ServicesInfo.js";

export class MakeComponent {
  constructor(data) {
    this.data = data;
    this.dataSet = {};
  }

  makeListBrand() {
    const make = new ListBrand(this.data);
    return make.makeComponent();
  }

  listProducts() {
    const make = new ListProducts(this.data);
    return make.makeComponent();
  }

  productInfo() {
    const make = new ServicesInfo(this.data);
    return make.makeComponent();
  }
}

//Gérer les réponses sans Résultat
