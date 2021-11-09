const div = document.querySelector('.main');
const INITIAL_VAL = 4; 
function createGrid(){
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('flexboxContainer');
    div.appendChild(mainContainer);  

    let squareDivs = INITIAL_VAL; 
    
    for(let i = 0; i < squareDivs; i++){
        const singleDiv = document.createElement('div'); 
        singleDiv.classList.add('singleDiv'); 
        mainContainer.appendChild(singleDiv);     
    } 
}
createGrid(); 
  



 