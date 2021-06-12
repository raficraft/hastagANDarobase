import { paramsRequestForBrandList } from "../data/paramsRequest.js";
import { FactoryContent } from "../FactoryContent.js";
import { createElementFromHTML, removeContent, ucFirst } from "../utils/function.js";
import { priceSlider } from "./../main.js";

export class ListProducts {
  constructor(data) {
    this.data = data;
    this.dataSet = {};
  }

  makeComponent() {

    this.elHtmlString = `<article class="tmp-content">
    <span class="simpleArrow_left">
      <span></span>
    </span> 
      <header>      
        <h1>${ucFirst(this.data[0].brand)}</h1>
      </header>
        <div class="product-icon">`

    this.data.forEach((data) => {
      const imgName = data.version.split(" ").join("_");
      this.elHtmlString += `
      <div class="product-icon_item">
          <p>
            <img src="./assets/products/apple/mobile/${data.model}_${imgName}.jpg" class="poducts-icon_img">          
          </p>
          <p>${ucFirst(data.model +' '+ data.version)}</p>
      </div>`
    });

    this.elHtmlString += `</div></article>`;

    this.elHtml = createElementFromHTML(this.elHtmlString);

    const prevButton = this.elHtml.querySelector(
      ".simpleArrow_left"
    );
    prevButton.addEventListener("click", (e) => priceSlider.goToPrev());

    const linkCollection = this.elHtml.querySelectorAll(".product-icon_item");

    for (const key in linkCollection) {
      if (Object.hasOwnProperty.call(linkCollection, key)) {
        const link = linkCollection[key];

        link.addEventListener("click", (e) => {
          priceSlider.goToNext();
          //  document.querySelector('.tmp-content').remove()

          removeContent();
          this.dataSet = {
            collection: "products",
            req: "getProductByID",
            component: "productInfo",
            id: this.data[key].id,
          };
          new FactoryContent(this.dataSet);
          setTimeout(() => {
            
          }, 300); //animation delay
        });
      }
    }

    //quand on clique sur la flèche cela vous le module en cours
    //et réaffiche le slide précédent

    this.elHtml
      .querySelector(".simpleArrow_left")
      .addEventListener("click", (e) => {
        removeContent();console.log(this.data);
        const dataSet = paramsRequestForBrandList(this.data[0]);
        new FactoryContent(dataSet);
      });

    return this.elHtml;
  }
}






























