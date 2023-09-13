let input=document.getElementById('inputBox');
let buttons=document.querySelectorAll('button');
const output=document.querySelector('.output')


let string="";
let arr=Array.from(buttons);
arr.forEach(button=>{
    button.addEventListener('click',(e)=>{
if(e.target.innerHTML == '=' )   {
    string=eval(prepareInput(string));
    string=parseFloat(string.toFixed(7));
    output.innerHTML=cleanOutput(string);
}
else if(e.target.innerHTML=='AC'){
    string='';
    input.value=string;
    output.innerHTML=string;
}
else if(e.target.innerHTML=='DEL'){
    string=string.substring(0,string.length-1);
    input.value=string;
    
}
    else{
        if (validateInput(e.target.innerHTML))
        {
            string+=e.target.innerHTML;
            input.value=string;
        }
    
}
 })
}) 

function chMode(){
    let n=0
    if(mode.className=="button spl-button fa-solid fa-moon "){
        mode.className="button spl-button fa-solid fa-sun ";
        n=1;
    }else{
        mode.className="button spl-button fa-solid fa-moon ";
        n=0;
    }

    // mode.className=='fa-solid fa-sun'? mode.className='fa-solid fa-moon' : mode.className='fa-solid fa-sun';
    if(n===0){
        const calculator=document.querySelector('.container')
        calculator.classList.remove('dark-mode')
    }else{
        const calculator=document.querySelector('.container')
        calculator.classList.add('dark-mode')
    }
    
}

// Adding an event listener to the document to capture keypress events
document.addEventListener('keydown', function(event) {
    // Get the pressed key's value
    const key = event.key;

    // Check if the pressed key is a valid input or an operator
        
        if ((/^\d$/.test(key))  || ['+', '-', '*', '/', '.','%', 'Enter', '=', 'Backspace','Delete'].includes(key) ) {
        // Handle the keypress just like you handle button clicks
        if (key === '=' || key === 'Enter') {
            string = eval(prepareInput(string));
            string = parseFloat(string.toFixed(7));
            output.innerHTML = cleanOutput(string);
        } else if (key === 'Backspace') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else if (key === 'Delete') {
            string = '';
            input.value = string;
            output.innerHTML = string;
        } else  {
            validateInput(key);
            string += key;
            input.value = string;
        }
    }
});


function validateInput(value){
    let last_input=string.slice(-1);
    let operators=['+','-','*','/'];

    if(value == '.' && last_input == '.'){
        return false;
    }    
    if(operators.includes(value) && operators.includes(last_input)){
        // if(operators.includes(last_input)){
        return false;
        }else{
            return true;
        }
        // return true; 
    }
   
function prepareInput(string){
    let input_arr=string.split("");
    for(let i=0;i<input_arr.length;i++){
        if(input_arr[i]=="%"){
            input_arr[i]="/100";
        }
    }
    return input_arr.join("")
}

function cleanOutput(output){
    let output_string=output.toString();
    let decimal=output_string.split(".")[1];
   output_string= output_string.split(".")[0]

   let output_arr=output_string.split("");

   if(output_arr.length>3){
    for(let i=output_arr.length-3;i>0;i-=3){
        output_arr.splice(i,0,',');
    
    }
   }
   if(decimal){
    output_arr.push('.')
    output_arr.push(decimal)
   }
   return output_arr.join("")
}