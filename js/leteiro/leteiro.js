/******* Configuração ******/
const runLetreiroItemLargura = 205; //flex-basics, flex-shronk, flex-grow
const itemLetreiroMarginLeft = 50;
const itemLetreiroMarginRight = 50;
const itemMoreMargimLeftRight = runLetreiroItemLargura + itemLetreiroMarginLeft + itemLetreiroMarginRight;
/************************ */

const itemsLeteiro = document.querySelector(".run-letreiro-item");
const estilos = window.getComputedStyle(itemsLeteiro);
const largura = estilos.getPropertyValue("width");
const widthNumber = largura.replace("px", "");
const propToMoveOfItem = estilos.getPropertyValue("left"); //isso que vai animar
const propToMoveOfItemOnlyNumber = propToMoveOfItem.replace("px", "");
const larguraJanela = window.innerWidth;

window.onload = start;
function start() {
    let itemsArray = [];
    const items = document.querySelectorAll(".run-letreiro-item");
    items.forEach((item) => {
        itemsArray.push(item);
    });
    animation(itemsArray);
}
function animation(itemsArray) {    

    let pos = parseInt(propToMoveOfItemOnlyNumber);
    const totalItems = itemsArray.length;
    let andou = 0;
    let lastItem;
    const id = setInterval(frame, 10);

    function frame() {
        if (andou == 20) { 
            const response = calcLastItemPassScreen(itemsArray,totalItems);
            if(response){
                lastItem = itemsArray.pop();
                let newPos = atualizePositionInScreen(itemsArray,lastItem,pos);                
                pos = newPos;
            }
            andou = 0;
        } else {
            pos++;
            andou++;
            for (let i = 0; i < itemsArray.length; i++) {
                const element = itemsArray[i];
                element.style.left = pos + "px";
            }   
        }   
    }
}
function calcLastItemPassScreen(itemsArray,totalItems){
    const lastItemPos = itemsArray[totalItems - 1];
    const rect = lastItemPos.getBoundingClientRect();
    const xLast = rect.left;

    if(xLast > larguraJanela){
        return true;
    }else{
        return false;
    }
}
function atualizePositionInScreen(itemsArray,lastItem,pos){
    let idItem = lastItem.getAttribute("id");
    let leteiroContainer = document.querySelector(".leteiro-container");
    let newPos = pos - itemMoreMargimLeftRight;
    
    const div = document.createElement("div");
    const divNomeItem = document.createElement("div");
    divNomeItem.classList.add("nome-item");
    divNomeItem.innerText = idItem;
    
    const img = document.createElement("img");
    img.setAttribute("src","imagem-"+idItem+".png");

    div.appendChild(divNomeItem);
    div.appendChild(img);
    
    div.classList.add("items","run-letreiro-item");
    div.style.left = newPos + "px";
    div.setAttribute("id",idItem);
    
    leteiroContainer.innerHTML = "";
    
    itemsArray.unshift(div);
    leteiroContainer.appendChild(div);
    
    for (let i = 0; i < itemsArray.length; i++) {
        const elem = itemsArray[i];
        elem.style.left = newPos + "px";
        leteiroContainer.appendChild(elem);
    }
    return newPos
}