const main = document.querySelector('.main');
const gridContainer = document.querySelector('.gridSection');
const STARTING_GRID_SIZE = 16; 
let showGridSize = document.querySelector('.rightSection label'); 

let rowArray = [];
let cellArray =[]; 


const eraserbtn = document.querySelector('.eraser button');

const rainbowbtn = document.querySelector('.rainbow button'); 

const inputGridSlider = document.querySelector('#inputGridSize');

function removeAllChildNodes(parent){
    while(parent.firstChild){
    parent.removeChild(parent.firstChild);
    }
}

const DEFAULT_COLORS = 'DEFAULT_COLORS';
const RAINBOW_COLORS = 'RAINBOW_COLORS';
let colorScheme = DEFAULT_COLORS;

let rainbowCounter = 0;
let numberOfBuckets = 12;

function getNextColor() {
    switch(colorScheme) {
        case DEFAULT_COLORS: return 'gray';
        case RAINBOW_COLORS: {
            let nextBucket = rainbowCounter % numberOfBuckets;
            let percentage = nextBucket / numberOfBuckets;
            let cellColor = getRainbowColor(percentage);
            rainbowCounter++;
            return cellColor;
        }
    }
}

function createGrid() { 
    if (gridContainer.hasChildNodes()) {
        removeAllChildNodes(gridContainer)
    }
    
    getGrid(inputGridSlider.value);
    setupCellEventListeners();
    showGridSize.textContent = `Grid size: ${inputGridSlider.value} x ${inputGridSlider.value}`;
    
}

// initialize input value and createGrid
inputGridSlider.value = STARTING_GRID_SIZE;
createGrid();

function setupCellEventListeners() {
    cellArray.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.setAttribute("style", `background-color:${getNextColor()};`)
        });
    });
}


function setColorSchemeDefault() {
    colorScheme = DEFAULT_COLORS;
}

function setColorSchemeRainbow() {
    colorScheme = RAINBOW_COLORS;
}

    // let percentage = NUM_OF_RBGS;

    //     s += `<td style='background-color: ${getRainbowColor(percentage)}; width:15px; height:15px'></td>`;
    // }
    // s += "</tr></table>";
    // document.write(s);

function getGrid(gridSize){
    rowArray = []; 
    cellArray = [];
    for(let i = 0; i < gridSize; i++){
        const row = document.createElement('div'); 
        row.classList.add('row');
        rowArray.push((row));
        for(let j = 1; j <= gridSize; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
            cellArray.push((cell)); 
        } 
        gridContainer.appendChild(row);
    }   
    console.log(rowArray.length);
    console.log(gridSize);
}

function eraseGrid(){ 
    createGrid();
}


/**
 * 
 * @param {number} percentage - 0-1 (red to red) corresponding to what color in rainbow gradient we want to make a color out of
 * @returns {string} - the color
 */
function getRainbowColor(percentage) {
    const R = 'red';
    const G = 'green';
    const B = 'blue';

    /**
     * @param {string} key 
     * @returns {number}
     */
    function getOffset(key) {
        switch(key) {
            case R: return 0;
            case G: return 8;
            case B: return 4;
        }
    }

    /** 
     * @param {string} key
     * @returns {number} that is betweent 0 and 1 
     */
    function getColorPercentage(key) {
        let offset = getOffset(key);
        let k = (offset + (percentage * 12)) % 12 // k is between 0 and 12 and is cyclical
        let vals = [k - 3, 9 - k];
        let multiplier = Math.min(...vals, 1);
        multiplier = Math.max(multiplier, -1); // multiplier is between -1 and 1
        return 0.5 - (0.5 * multiplier); // result is between 0 and 1
    }
    
    /**
     * 
     * @param {number[]} rgb 
     * @returns {string}
     */
    function rgb2hex(rgb) {
        return "#" + rgb.map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join("");
    }

    return rgb2hex([R, G, B].map(getColorPercentage));
}


