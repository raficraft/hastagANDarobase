export class LightBox {
  constructor() {
    console.log("lightBox");

    this.lightBox = document.querySelectorAll("[data-lightbox]");
    console.log(this.lightBox);

    this.lightBox.forEach((lightBox) => {
      console.log(lightBox);

      lightBox.addEventListener("animationstart", (ev) => {
        console.log("Animation Startted", ev);
      });
    });
  }
}
