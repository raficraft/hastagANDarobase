import { FactoryContent } from "./../FactoryContent.js";
import { TextAnimated } from "./TextAnimated.js";
import { removeContent } from "../utils/function.js";

export class BringsUp {
  constructor(params = {}) {
    this.params = Object.assign(
      {},
      {
        triggerName: "menu",
        event: "click",
      },
      params
    );

    console.error(
      document.querySelector(
        `[data-bringsupname="${this.params.triggerName}"] [data-js="closeParent"]`
      )
    );

    this.trigger = document.querySelectorAll(
      `[data-bringsup="${this.params.triggerName}"]`
    );
    console.log(this.trigger);
    this.triggeredElement = document.querySelector(
      `[data-bringsupname="${this.params.triggerName}"]`
    );

    if (
      document.querySelector(
        `[data-bringsupname="${this.params.triggerName}"][data-lightbox]`
      )
    ) {
      this.triggerCloseParent = document.querySelector(
        `[data-bringsupname="${this.params.triggerName}"] [data-js="closeParent"]`
      );

      if (this.triggerCloseParent) {
        this.triggerCloseParent.addEventListener("click", (e) => {
          console.log("closeParent");
          this.manageLightbox();
        });
      }
    }

    this.trigger.forEach((trigger) => {
      this.trigger = trigger;

      console.log(trigger.dataset);

      trigger.addEventListener(this.params.event, (e) => {
        console.log("icone cliqué", trigger);

        let stateTrigger = e.target.dataset.state;

        //Gestion transversal
        //Si un élément est affiché on le cache et on affiche celui du click
        this.resetShowEl();

        if (stateTrigger === "close") {
          this.showTriggeredElement(trigger);

          //Spécifique au projet #ashtad & @ arobase
          //Animation des Texte de la partie Call
          if (this.params.triggerName === "call") {
            //console.log('animated');

            new TextAnimated({
              method: "letterByLetter",
              child: '[textAnimated-name="call"]',
              keyframes: "flipX",
              shiftDelay: 0.075,
              animationOffset: 0.5,
            });
            new TextAnimated({
              method: "letterByLetter",
              child: '[textAnimated-name="adress01"]',
              keyframes: "flipX",
              shiftDelay: 0.075,
              animationOffset: 0.5,
            });
            new TextAnimated({
              method: "letterByLetter",
              child: '[textAnimated-name="adress02"]',
              keyframes: "flipX",
              shiftDelay: 0.075,
              animationOffset: 0.5,
            });
          } else if (this.params.triggerName === "price") {
            //Gestion de l'affichage des différents tarif

            //Remove content in the slide before posting
            removeContent();
            const dataSet = trigger.dataset;
            dataSet.root = ".priceSlider-content_brand";

            console.log(dataSet);
            new FactoryContent(dataSet);
          }

          //Fin du code spécifique
        } else if (stateTrigger === "open") {
          this.hideTriggeredElement(trigger);
        }
      });
    });
  }

  showTriggeredElement(trigger) {
    trigger.setAttribute("data-state", "open");
    this.triggeredElement.setAttribute("data-state", "show");
  }

  hideTriggeredElement(trigger) {
    trigger.setAttribute("data-state", "close");
    this.triggeredElement.setAttribute("data-state", "hide");
  }

  manageLightbox() {
    this.allLightBox = document.querySelectorAll(`[data-lightbox]`);

    this.allLightBox.forEach((lightBox) => {
      if (lightBox.dataset.state === "show") {
        const otherLightBoxName = lightBox.dataset.bringsupname;
        document
          .querySelector(`[data-bringsup="${otherLightBoxName}"]`)
          .setAttribute("data-state", "close");
        lightBox.setAttribute("data-state", "hide");
      }
    });
  }

  resetShowEl(exclude = null) {
    const showEl = document.querySelector('[data-state="show"]');

    if (showEl) {
      const iconShowEl = document.querySelector(
        `[data-bringsup="${showEl.dataset.bringsupname}"]`
      );
      iconShowEl.click();
    }
  }
}
