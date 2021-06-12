import { BringsUp } from './plugin/BringsUp.js';
import { ScrollHorizontalManager } from './plugin/ScrollHorizontalManager.js';


const bringUp = new BringsUp()

const bringUpMap =  new BringsUp({
  triggerName : 'map'
})
const bringsUpCall = new BringsUp({
  triggerName : 'call'
})
const bringsUpContact = new BringsUp({
  triggerName : 'contact'
})
export const bringsUpPrice = new BringsUp({
  triggerName : 'price'
})


const scrollManager = new ScrollHorizontalManager({
	slideWidth : 97,
	pushUp : '.header-top',
	slideLink : true,
	infiniteLoop : true,
})


export const priceSlider = new ScrollHorizontalManager({
	slideWidth : 100,
	unity : '%',
	sizeSlide : true,
	slideLink : false,
	infiniteLoop : false,
	sliderName : 'priceslider',
	slideTransition : 0.3,
	touchAndDrag : false,
	pushDown : '.icon-lightBox',
	keyBoardControl : true
})




