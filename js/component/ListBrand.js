import { paramsRequestForProductList } from "../data/paramsRequest.js";
import { FactoryContent } from "../FactoryContent.js";
import { createElementFromHTML, removeContent } from "../utils/function.js";
import { priceSlider } from "./../main.js";
import { bringsUpPrice } from "./../main.js";

export class ListBrand {
  constructor(data) {
    this.data = data;
    this.dataSet = {};
  }

  makeComponent() {
    this.elHtmlString = `<article class="tmp-content">   
    <span class="simpleArrow_left">
        <span></span>
    </span>    
        <div class="brand-icon">`;

    this.data.forEach((data) => {
      this.elHtmlString += `
        <a class="brand-icon_link">
          <img src="./assets/logo/${data.brand}_logo.png" alt="logo ${data.brand}" class="brand-icon_img">
        </a>`;
    });

    this.elHtmlString += `</div></article>`;
    this.elHtml = createElementFromHTML(this.elHtmlString);

    const linkCollection = this.elHtml.querySelectorAll(".brand-icon_link");

    for (const key in linkCollection) {
      if (Object.hasOwnProperty.call(linkCollection, key)) {
        const link = linkCollection[key];

        link.addEventListener("click", (e) => {
          priceSlider.goToNext();
          //  document.querySelector('.tmp-content').remove()

          removeContent();
          this.dataSet = paramsRequestForProductList(this.data[key]);
          new FactoryContent(this.dataSet);
          //Remove content of prev Slide

          setTimeout(() => {
           
          }, 300); //animation delay
        });
      }
    }

    this.elHtml
      .querySelector(".simpleArrow_left")
      .addEventListener("click", (e) => {
        console.log("click");

        const bringsUp = this.data[0].bringsup;
        const bringsUpProduct = this.data[0].product;

        //Get original Click source
        const originalTrigger = document.querySelector(
          `[data-bringsup="${bringsUp}"][data-product="${bringsUpProduct}"]`
        );
        //
        bringsUpPrice.hideTriggeredElement(originalTrigger);
      });

    return this.elHtml;
  }
}
