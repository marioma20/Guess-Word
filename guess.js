
// setting game name
let gamename = "Guess The Word";
document.title = gamename;
document.querySelector('h1').innerHTML = gamename;
document.querySelector('footer').innerHTML = `${gamename} Game Created By Elzero Web School`;

// setting game options
let numberoftries=6;
let numberofletters=6;
let currenttry=1;
let numberofhints = 2;

// manege words

let wordtoguess = '';
const words = ['Create', 'Update', 'Delete', 'Master', 'Branch', 'Mainly', 'Elzero', 'School'];
wordtoguess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let messagearea = document.querySelector('.message');

console.log(wordtoguess);
// create hint button

document.querySelector('.hint span').innerHTML = numberofhints;
const gethintbutton = document.querySelector('.hint');
gethintbutton.addEventListener('click', gethint);

function generatinput(){
     const inputscontainer = document.querySelector('.inputs');

   // create main try div
     for(let i=1; i<=numberoftries; i++){
        const trydiv = document.createElement('div');
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML = `<span>Try ${i}</span>`;
        if(i !== 1){
            trydiv.classList.add('disabled-inputs');
        }

        // create input
        for(let j=1; j<=numberofletters; j++){
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `Guess-${i}-Letter-${j}`;
            input.setAttribute('maxlength', '1');
            trydiv.appendChild(input);
        }
        inputscontainer.appendChild(trydiv);
     }
     inputscontainer.children[0].children[1].focus();
    //  console.log(inputscontainer.children[0].children[1]);

    const inputsindisablediv = document.querySelectorAll('.disabled-inputs input');
    inputsindisablediv.forEach((input) => (input.disabled=true));

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) =>{
        input.addEventListener('input', function(){
            this.value = this.value.toUpperCase();
            // console.log(index);
            const nextinput = inputs[index+1];
            if(nextinput) nextinput.focus();
        });

        input.addEventListener('keydown', function(event){
            // console.log(event);
            const currentindex = Array.from(inputs).indexOf(event.target); // or this
            // console.log(currentindex);
            if(event.key === 'ArrowRight'){
                const nextinput = currentindex + 1;
                if(nextinput < inputs.length) inputs[nextinput].focus();
            }

            if(event.key === 'ArrowLeft'){
                const previnput = currentindex - 1;
                if(previnput >= 0) inputs[previnput].focus();
            }
        });
    });
}
const guessbutton = document.querySelector('.check');
guessbutton.addEventListener('click', handlguess);

function handlguess(){
   
    let successguess = true;
    for(let i=1; i<=numberofletters; i++){
        const inputfield = document.querySelector(`#Guess-${currenttry}-Letter-${i}`);
        const letter = inputfield.value.toLowerCase();
        // console.log(letter);
        const actualletter = wordtoguess[i-1];

        // game logic

        if(letter === actualletter){

            // letter is correct and in place
            inputfield.classList.add('yes-in-place');

        }else if(wordtoguess.includes(letter) && letter !== ""){

                  // letter is currect and not in place
                inputfield.classList.add('not-in-place');
                successguess = false;

        }else{
            //letter wrong
            inputfield.classList.add('no');
            successguess=false;
        }
    }
    // check if user win or lose

    if(successguess){

       // console.log('you win');
       messagearea.innerHTML = `You Win Is <span>${wordtoguess}</span>`;

       if(numberofhints === 2){
        messagearea.innerHTML = ` <p> Congrates You Didnot Use Hints</p>`; // and option try is one

       }

       // add class disabled on all try divs
       let alltries = document.querySelectorAll('.inputs > div');
       alltries.forEach((trydiv) => trydiv.classList.add('disabled-inputs'));

       // dissabled guess button
       guessbutton.disabled = true;
       gethintbutton.disabled=true;


    }else{

     //   console.log('you lose');
     document.querySelector(`.try-${currenttry}`).classList.add('disabled-inputs');

     const currenttryinputs = document.querySelectorAll(`.try-${currenttry} input`);
     currenttryinputs.forEach((input) => (input.disabled = true));

     currenttry++;
       
    //  document.querySelector(`.try-${currenttry}`).classList.remove('disabled-inputs');

     const nexttryinputs = document.querySelectorAll(`.try-${currenttry} input`);
     nexttryinputs.forEach((input) => (input.disabled = false));
      
     let el = document.querySelector(`.try-${currenttry}`);
      
     if(el){

        document.querySelector(`.try-${currenttry}`).classList.remove('disabled-inputs');
          el.children[1].focus();

     }else{

          guessbutton.disabled=true;
          gethintbutton.disabled=true;
          messagearea.innerHTML = `You Lose The Word Is <span>${wordtoguess}</span>`;

     }


    }
}

function gethint(){

    if(numberofhints > 0){
        numberofhints--;
        document.querySelector('.hint span').innerHTML = numberofhints;
    }

    if(numberofhints === 0){
        gethintbutton.disabled = true;
    }

    const enabledinputs = document.querySelectorAll('input:not([disabled])');
   // console.log(enabledinputs);
   const emptyenabledinputs = Array.from(enabledinputs).filter((input) => input.value === '');
//    console.log(emptyenabledinputs);

 const randomindex = Math.floor(Math.random() * emptyenabledinputs.length);
//     console.log(randomindex);

 if(emptyenabledinputs.length > 0){
    const randomindex = Math.floor(Math.random() * emptyenabledinputs.length);
    // console.log(randomindex);
    const ransominput = emptyenabledinputs[randomindex];
    //console.log(ransominput);
    const indextofill = Array.from(enabledinputs).indexOf(ransominput);
    // console.log(indextofill);
    if(indextofill !== -1){
        ransominput.value = wordtoguess[indextofill].toLocaleUpperCase();
    }
 }


}

function handlebackspace(event){
  
     if(event.key === "Backspace"){
         const inputs = document.querySelectorAll('input:not([disabled])');
         const currentindex = Array.from(inputs).indexOf(document.activeElement);
       // console.log(currentindex);
          //  console.log('yes');

          if(currentindex > 0){
            const currectinput = inputs[currentindex];
            const previnput = inputs[currentindex - 1];
            currectinput.value = "";
            previnput.value = "";
            previnput.focus();
          }
    }

    

}
document.addEventListener('keydown', handlebackspace);

window.onload = function(){
    generatinput();
}
