import { GetData } from "./data/GetData.js";
import { dataBrand } from "./data/dataBrand.js";
import { MakeComponent } from "./MakeComponent.js";
import { dataProducts } from "./data/dataProducts.js";

export class FactoryContent {
  constructor(dataSet) {
    console.error(dataSet);

    /*
      const root = document.querySelector(this.data[0].root);
      removeContent(root);*/

    const { component, collection, req, field, product, brand } = dataSet;
    this.collection = {};
    this.result = [];
    this.injectHTMLElement = HTMLCollection;

    switch (collection) {
      case "brand":
        this.collection = new GetData(dataBrand);

        break;
      case "products":
        this.collection = new GetData(dataProducts);

        break;
    }

    switch (req) {
      case "searchData":
        /*Récupère la liste des marques en fonction du type d'appareil*/
        this.result = this.collection.getBySearch(field, product);
        console.log(Object.assign(this.result, dataSet));
        this.result = this.result.map((item) => {
          return Object.assign(item, dataSet);
        });

        break;

      /*Inject la liste des appareils en fonction de la marque*/
      case "getProductsByBrand":
        this.result = this.collection.getProductsByBrand(dataSet);
        this.result = this.result.map((item) => {
          return Object.assign(item, dataSet);
        });

        console.error(this.result);

        break;

      case "getProductByID":
        this.result = this.collection.getProductByID(dataSet);
        this.result = this.result.map((item) => {
          return Object.assign(item, dataSet);
        });

        console.log(this.result);

        break;
    }

    //Instanciation de la factory qui fabrique les components
    const makeComponent = new MakeComponent(this.result);

    switch (component) {
      /*Inject la liste des marques en fonction du type d'appareil*/
      case "listBrand":
        this.injectHTMLElement = makeComponent.makeListBrand();
        console.log(this.injectHTMLElement);
        if (collection === "brand") {
          document
            .querySelector(".priceSlider-content_brand")
            .insertAdjacentElement("afterbegin", this.injectHTMLElement);
        }
        break;

      /*Inject la liste des appareils en fonction de la marque*/
      case "listProducts":
        console.log("yolo ta soeur");
        this.injectHTMLElement = makeComponent.listProducts();
        console.log(this.injectHTMLElement);
        console.log(document.querySelector(".priceSlider-content_product"));
        document
          .querySelector(".priceSlider-content_product")
          .insertAdjacentElement("afterbegin", this.injectHTMLElement);
        break;

      case "productInfo":
        this.injectHTMLElement = makeComponent.productInfo();
        console.log(this.injectHTMLElement);
        document
          .querySelector(".priceSlider-content_service")
          .insertAdjacentElement("afterbegin", this.injectHTMLElement);
        break;
    }
  }
}
