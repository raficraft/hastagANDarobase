
/**
 * Permet de modofier plusieurs attribut en une seul requête
 * @param {HTMLElement} el //Element ciblé
 * @param {objet} options  // Collections d'attributs à appliqué
 */

 const setAttributes = (el, options) => {
	Object.keys(options).forEach(function(attr) {
	  el.setAttribute(attr, options[attr]);
	})
 }

export class TextAnimated{
  constructor(options = {}){

    this.options =  Object.assign({},{

      method : 'wordByWord',
      container : '[textAnimatedContainer]',
      child : '', //Attribut textAnimated-name 
      lineBreak : [],
      keyframes : '', //nom de l'animation à appliqué
      animationDuration : 0.7, //Durée de l'animation des mots ou lettre du texte
      shiftDelay : 0.2, //Délai d'animation entre deux mots ou deux lettre.    
      animationOffset : 0, //Délai de lancement de l'animation global.
      spacingDimension : '1.375rem' // Dimension d'espacement entre les mots pour l'animation lettre par lettre

    },options)  

    this.container = document.querySelector(this.options.container)
    if(this.container === null){
      console.error('impossible de trouver l\'element : ', this.options.container);
      return
    }
    this.strings = document.querySelectorAll(this.options.child)

    this.strings.forEach(element => {

      if(this.options.method === "wordByWord"){
        this.wordByWord(element)   
      }else if(this.options.method === "letterByLetter"){ 
        this.letterByLetter(element) 
      }   
    });

  }

  wordByWord(element){  

    const words = element.textContent.trim(' ').split(' ')
    const newContainer = document.createElement('span')        
    newContainer.style.overflow = 'hidden'
    newContainer.style.display = 'inline-block' 
    let delay = this.options.animationDuration
    
    words.forEach((word,key) => {

      const newEl = document.createElement('span')
      newEl.style.display = 'inline-block'
      newEl.style.animation = `${this.options.keyframes} ${delay}s both`
      
      const shiftDelay = (key * this.options.shiftDelay) + this.options.animationOffset
      newEl.style.animationDelay = `${shiftDelay}s`
      
      
      newEl.innerHTML= `${word}&ensp;`
      newContainer.insertAdjacentElement('beforeend',newEl)

      if(this.options.lineBreak.includes(key)){
        const lineBreak = document.createElement('br')
        newContainer.insertAdjacentElement('beforeend',lineBreak)
      }
    
    });

    element.textContent = ''
    element.insertAdjacentElement('beforeend',newContainer)

  }

  letterByLetter(element){
     
   const words = element.textContent.trim(' ').split(' ')
   const letterArray = []
   const wordsCount = words.length -1
   const newContainer = document.createElement('span')
   let delay = this.options.animationDuration
   newContainer.style.overflow = 'hidden'
   newContainer.style.display = 'inline-block' 


    words.forEach((word,key) => {

      const letters = word.split('')
      letters.forEach(letter => {
        letterArray.push(letter)        
      });

      if(key < wordsCount){
        letterArray.push(' ')
      }
    })

   
     
    letterArray.forEach((letter,key) => {
      
      const newEl = document.createElement('span')
      newEl.style.display = 'inline-block'
      newEl.style.animation = `${this.options.keyframes} ${delay}s both`

      const shiftDelay = (key * this.options.shiftDelay) + this.options.animationOffset
      newEl.style.animationDelay = `${shiftDelay}s`

      if(!this.options.lineBreak.includes(key) ){
        if(letter === ' '){
          newEl.innerHTML = '&ensp;'
          newEl.classList.add('blankAnimated')
          newEl.style.content = ' '
          newEl.style.width = this.options.spacingDimension
        }
        newEl.innerHTML = letter
      }

      if(this.options.lineBreak.includes(key)){
        const lineBreak = document.createElement('br')
        newContainer.insertAdjacentElement('beforeend',lineBreak)
      }

      newContainer.insertAdjacentElement('beforeend',newEl)
      
    });

    element.textContent = ''
    element.insertAdjacentElement('beforeend',newContainer)
    
  }
}



