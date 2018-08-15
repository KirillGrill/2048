const LENGTH = 4;

const table = document.createElement('table');
const tbody = document.createElement('tbody');
const tr = document.createElement('tr');
const td = document.createElement('td');


for(let i = 0; i < LENGTH; i++){
    let newTr = tr.cloneNode(true);
    for(let j = 0; j < LENGTH; j++){

        let newTd = td.cloneNode(false);
        newTd.classList.add('empty');
        newTd.dataset.line = i + '';
        newTd.dataset.column = j + '';

        newTr.appendChild(newTd);
    }

    tbody.appendChild(newTr);
}

table.appendChild(tbody);

let startRow = randomNumber(0, 3);
let startCell = randomNumber(0, 3);
table.rows[startRow].cells[startCell].innerText = '2';
table.rows[startRow].cells[startCell].classList.add(`klass2`);

document.body.appendChild(table);




function getKey() {
    var key = event.keyCode;

    let move = false;
    switch(key){
        case 37:
            move = ifKeyCode37();
            break;
        case 38:
            move = ifKeyCode38();
            break;
        case 39:
            move = ifKeyCode39();
            break;
        case 40:
            move = ifKeyCode40();
            break;
        default:
            return;
    }

    ifPeremoga();

    if(ifNotExistFreeCells()){
        if(ifNotExistNeighborSimilarCells()){
            alert('GAME OVER');
        }
    }

    if(move)
        newElement();

}

function randomNumber(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

function ifPeremoga() {

    for(let i = 0; i < LENGTH; ++i){
        for(let j = 0; j < LENGTH; ++j){
            if(table.rows[i].cells[j].innerText === '2048'){
               /* const imgWrap = document.createElement('div');
                const image = document.createElement('img');
                image.setAttribute('src', 'images/win.jpg');
                imgWrap.appendChild(image);*/
               alert('PEREMOGA!!!!!');

            }
        }
    }

}


function ifNotExistFreeCells(){
    for(let i = 0; i < LENGTH; ++i){
        for(let j = 0; j < LENGTH; ++j){
            if(table.rows[i].cells[j].innerText === ''){
                return false;
            }
        }
    }
    return true;

}

function ifNotExistNeighborSimilarCells() {
    for (let i = 0; i < LENGTH; ++i) {
        for (let j = 1; j < LENGTH; ++j) {
            if (table.rows[j].cells[i].innerText === table.rows[j - 1].cells[i].innerText) {
                return false;
            }
            if (table.rows[i].cells[j].innerText === table.rows[i].cells[j - 1].innerText) {
                return false;
            }

        }
    }
    return true;
}


function ifExistEmptyCellBefore37() {

    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let a = 0; a < LENGTH; ++a) {
            for (let j = 1; j < LENGTH - a; ++j) {

                if (table.rows[i].cells[j].innerText) {
                    if (!table.rows[i].cells[j - 1].innerText) {
                        move = true;
                        table.rows[i].cells[j - 1].innerText = table.rows[i].cells[j].innerText;
                        table.rows[i].cells[j].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                        table.rows[i].cells[j - 1].classList.add(`klass${table.rows[i].cells[j].innerText}`);
                        table.rows[i].cells[j].innerText = '';
                    }
                }
            }
        }
    }
    return move;

}


function ifExistFullSimmilarCellBefore37() {
    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let j = 1; j < LENGTH; ++j) {
            if (table.rows[i].cells[j].innerText) {
                if (table.rows[i].cells[j].innerText === table.rows[i].cells[j - 1].innerText) {
                    move = true;
                    table.rows[i].cells[j].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                    table.rows[i].cells[j - 1].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                    table.rows[i].cells[j - 1].innerText = +table.rows[i].cells[j].innerText * 2;
                    table.rows[i].cells[j - 1].classList.add(`klass${table.rows[i].cells[j - 1].innerText}`);
                    table.rows[i].cells[j].innerText = '';
                    ifExistEmptyCellBefore37();// можно сделать какое-то условие что бы не гоняло в холостую при двух парах одинаковых ячеек в одной строке

                }
            }
        }
    }
    return move;
}

function ifExistEmptyCellBefore38() {

    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let a = 0; a < LENGTH; ++a) {
            for (let j = 1; j < LENGTH - a; ++j) {

                if (table.rows[j].cells[i].innerText) {
                    if (!table.rows[j - 1].cells[i].innerText) {
                        move = true;
                        table.rows[j - 1].cells[i].innerText = table.rows[j].cells[i].innerText;
                        table.rows[j].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                        table.rows[j - 1].cells[i].classList.add(`klass${table.rows[j].cells[i].innerText}`);
                        table.rows[j].cells[i].innerText = '';
                    }
                }
            }
        }
    }
    return move;
}


function ifExistFullSimmilarCellBefore38() {
    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let j = 1; j < LENGTH; ++j) {
            if (table.rows[j].cells[i].innerText) {
                if (table.rows[j].cells[i].innerText === table.rows[j-1].cells[i].innerText) {
                    move = true;
                    table.rows[j].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                    table.rows[j - 1].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                    table.rows[j - 1].cells[i].innerText = +table.rows[j].cells[i].innerText * 2;
                    table.rows[j - 1].cells[i].classList.add(`klass${table.rows[j - 1].cells[i].innerText}`);
                    table.rows[j].cells[i].innerText = '';
                    ifExistEmptyCellBefore38();// можно сделать какое-то условие что бы не гоняло в холостую при двух парах одинаковых ячеек в одной строке

                }
            }
        }
    }
    return move;
}

function ifExistEmptyCellBefore39(){
    var move = false;
    let nolik;
    for (let i = 0; i < LENGTH; ++i) {
        for (let a = 0; a < LENGTH; ++a) {
            nolik = 0;
            for (let j = LENGTH - 2; j >= nolik + a; --j) {

                if (table.rows[i].cells[j].innerText) {
                    if (!table.rows[i].cells[j + 1].innerText) {
                        move = true;
                        table.rows[i].cells[j + 1].innerText = table.rows[i].cells[j].innerText;
                        table.rows[i].cells[j].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                        table.rows[i].cells[j + 1].classList.add(`klass${table.rows[i].cells[j].innerText}`);
                        table.rows[i].cells[j].innerText = '';
                    }
                }
            }
        }
    }
    return move;
}

function ifExistFullSimmilarCellBefore39(){
    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let j = LENGTH - 2; j >= 0; --j) {
            if (table.rows[i].cells[j].innerText) {
                if (table.rows[i].cells[j].innerText === table.rows[i].cells[j + 1].innerText) {
                    move = true;
                    table.rows[i].cells[j].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                    table.rows[i].cells[j + 1].classList.remove(`klass${table.rows[i].cells[j].innerText}`);
                    table.rows[i].cells[j + 1].innerText = +table.rows[i].cells[j].innerText * 2;
                    table.rows[i].cells[j + 1].classList.add(`klass${table.rows[i].cells[j + 1].innerText}`);
                    table.rows[i].cells[j].innerText = '';
                    ifExistEmptyCellBefore39();// можно сделать какое-то условие что бы не гоняло в холостую при двух парах одинаковых ячеек в одной строке

                }
            }
        }
    }
    return move;
}


function ifExistEmptyCellBefore40() {
    var move = false;
    let nolik;
    for (let i = 0; i < LENGTH; ++i) {
        for (let a = 0; a < LENGTH; ++a) {
            nolik = 0;
            for (let j = LENGTH - 2; j >= nolik + a; --j) {

                if (table.rows[j].cells[i].innerText) {
                    if (!table.rows[j + 1].cells[i].innerText) {
                        move = true;
                        table.rows[j + 1].cells[i].innerText = table.rows[j].cells[i].innerText;
                        table.rows[j].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                        table.rows[j + 1].cells[i].classList.add(`klass${table.rows[j].cells[i].innerText}`);
                        table.rows[j].cells[i].innerText = '';
                    }
                }
            }
        }
    }
    return move;
}


function ifExistFullSimmilarCellBefore40() {
    var move = false;
    for (let i = 0; i < LENGTH; ++i) {
        for (let j = LENGTH - 2; j >= 0; --j) {
            if (table.rows[j].cells[i].innerText) {
                if (table.rows[j].cells[i].innerText === table.rows[j+1].cells[i].innerText) {
                    move = true;
                    table.rows[j].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                    table.rows[j + 1].cells[i].classList.remove(`klass${table.rows[j].cells[i].innerText}`);
                    table.rows[j + 1].cells[i].innerText = +table.rows[j].cells[i].innerText * 2;
                    table.rows[j + 1].cells[i].classList.add(`klass${table.rows[j + 1].cells[i].innerText}`);
                    table.rows[j].cells[i].innerText = '';
                    ifExistEmptyCellBefore40();// можно сделать какое-то условие что бы не гоняло в холостую при двух парах одинаковых ячеек в одной строке

                }
            }
        }
    }
    return move;
}


function findRowsWithFreeCells() {

    var arr = [];
    let counter = 0;
    for(let i = 0; i < LENGTH; ++i){
        for(let j = 0; j < LENGTH; ++j){
            if(!table.rows[i].cells[j].innerText){
                arr[counter] = i;
                counter++;
                continue;//внимание!!! я не знаю делает ли это то что я задумал(переодит ко следующей итерации внешнего цикла)
            }
        }
    }
    return arr;
}

function findLocationOfFreeCells(NumberOfRow){

    var arr = [];
    let counter = 0;
    for(let i = 0; i < LENGTH; ++i){
        if(!table.rows[NumberOfRow].cells[i].innerText){
            arr[counter] = i;
            counter++;
            continue;//внимание!!! я не знаю делает ли это то что я задумал(переодит ко следующей итерации внешнего цикла)
        }
    }
    return arr;

}


function newElement() {

    let arrForRows = findRowsWithFreeCells();

    let NewRandRow = randomNumber(0, arrForRows.length - 1);

    let arrForCells = findLocationOfFreeCells(arrForRows[NewRandRow]);

    let NewRandCell = randomNumber(0, arrForCells.length - 1);

    let TwoOrFour = randomNumber(0, 1);

    if(TwoOrFour) {
        table.rows[arrForRows[NewRandRow]].cells[arrForCells[NewRandCell]].innerText = 4;
        table.rows[arrForRows[NewRandRow]].cells[arrForCells[NewRandCell]].classList.add(`klass4`);
    }else{
        table.rows[arrForRows[NewRandRow]].cells[arrForCells[NewRandCell]].innerText = 2;
        table.rows[arrForRows[NewRandRow]].cells[arrForCells[NewRandCell]].classList.add(`klass2`);
    }
}




function ifKeyCode37() {

    let ifmove1 = ifExistEmptyCellBefore37();
    let ifmove2 = ifExistFullSimmilarCellBefore37();
    if(ifmove1 || ifmove2){
        return true;
    }

}

function ifKeyCode38() {

    let ifmove1 = ifExistEmptyCellBefore38();
    let ifmove2 = ifExistFullSimmilarCellBefore38();
    if(ifmove1 || ifmove2){
        return true;
    }

}

function ifKeyCode39() {

    let ifmove1 = ifExistEmptyCellBefore39();
    let ifmove2 = ifExistFullSimmilarCellBefore39();
    if(ifmove1 || ifmove2){
        return true;
    }

}

function ifKeyCode40(){

    let ifmove1 = ifExistEmptyCellBefore40();
    let ifmove2 = ifExistFullSimmilarCellBefore40();
    if(ifmove1 || ifmove2){
        return true;
    }
}




