import { paramsRequestForProductList } from "../data/paramsRequest.js";
import {
  createElementFromHTML,
  removeContent,
  ucFirst,
} from "../utils/function.js";
import { priceSlider } from "./../main.js";
import { FactoryContent } from "../FactoryContent.js";

export class ServicesInfo {
  constructor(data) {
    this.data = data;
    this.dataSet = {};
  }

  makeComponent() {
    this.data = this.data[0];
    const imgName = this.data.version.split(" ").join("_");

    this.elHtmlString = `
    <article class="tmp-content"> 
      <span class="simpleArrow_left">
        <span></span>
      </span>  
      <header>
        <h1>${ucFirst(this.data.model + " " + this.data.version)}</h1>
      </header>
        <div class="services-content">
          <p class="services-content_img">
            <img src="./assets/products/apple/mobile/${
              this.data.model
            }_${imgName}.jpg" class="poducts-icon_img">
          </p>
          <div class="services-content_list">`;

    for (const key in this.data.services) {
      if (Object.hasOwnProperty.call(this.data.services, key)) {
        const price = this.data.services[key];

        this.elHtmlString += 
        `<div class="services-content_info">
          <p class="services_info">${ucFirst(key)}</p>
          <p class="services_price">${price}€</p>        
        </div>`;
      }
    }

    this.elHtmlString += `</div></div></article>`;

    console.log(this.elHtmlString);

    this.elHtml = createElementFromHTML(this.elHtmlString);

    console.log(this.elHtml);

    const prevButton = this.elHtml.querySelector(".simpleArrow_left");
    prevButton.addEventListener("click", (e) => {
      removeContent();
      priceSlider.goToPrev();
      const dataSet = paramsRequestForProductList(this.data);
      new FactoryContent(dataSet);
    });

    return this.elHtml;
  }
}
