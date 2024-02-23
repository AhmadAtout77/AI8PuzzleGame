
let interval = 500;
function node(state) {
    this.state = state;
    this.children = [];
    this.h1 = h1(state);
    this.h2 = h2(state);
    this.g = 0;
    this.f1;
    this.f2;
    this.parent = null;
}



function expandNode(node) {

    node.children = [upState(node.state), downState(node.state), rightState(node.state), leftState(node.state)];
    for (let i = 0; i < 4; i++) {
        let f = 0;
        if (node.children[i] != null) {
            node.children[i].parent = node;

            node.children[i].g = node.g + 1;
            node.children[i].f1 = node.children[i].g + node.children[i].h1;
            node.children[i].f2 = node.children[i].g + node.children[i].h2;
            if (node.parent != null) {
                for (let k = 0; k < 9; k++) {
                    if (node.children[i].state[k] != node.parent.state[k]) {
                        f = 1;
                    }
                }
                if (f == 0) {
                    node.children[i] = null;
                }
            }

        }
    }
}
////////////////////////////////////////////////////////////////////// 
function upState(state) {
    if (h1(state) == 0 || h2(state) == 0) {
        return null;
    }
    let new_state = [];
    new_state.push(...state);
    let space;
    let row;
    let col;
    let new_row;
    let new_col;
    let new_place;
    let temp;
    for (let i = 0; i < 9; i++) {
        if (new_state[i] == null) {
            space = i + 1;
        }
    }
    row = getCoordinates(space)[1];
    col = getCoordinates(space)[0];
    if (row == 1) {
        return null;
    }
    new_col = col;
    new_row = row - 1;
    new_place = getNum(new_col, new_row) - 1;
    space = space - 1;
    temp = new_state[new_place];
    new_state[new_place] = null;
    new_state[space] = temp;

    return new node(new_state);




}
function downState(state) {
    if (h1(state) == 0 || h2(state) == 0) {
        return null;
    }
    let new_state = [];
    new_state.push(...state);
    let space;
    let row;
    let col;
    let new_row;
    let new_col;
    let new_place;
    let temp;
    for (let i = 0; i < 9; i++) {
        if (new_state[i] == null) {
            space = i + 1;
        }
    }
    row = getCoordinates(space)[1];
    col = getCoordinates(space)[0];
    if (row == 3) {
        return null;
    }
    new_col = col;
    new_row = row + 1;
    new_place = getNum(new_col, new_row) - 1;
    space = space - 1;
    temp = new_state[new_place];
    new_state[new_place] = null;
    new_state[space] = temp;

    return new node(new_state);




}
function rightState(state) {
    if (h1(state) == 0 || h2(state) == 0) {
        return null;
    }
    let new_state = [];
    new_state.push(...state);
    let space;
    let row;
    let col;
    let new_row;
    let new_col;
    let new_place;
    let temp;
    for (let i = 0; i < 9; i++) {
        if (new_state[i] == null) {
            space = i + 1;
        }
    }
    row = getCoordinates(space)[1];
    col = getCoordinates(space)[0];
    if (col == 3) {
        return null;
    }
    new_col = col + 1;
    new_row = row;
    new_place = getNum(new_col, new_row) - 1;
    space = space - 1;
    temp = new_state[new_place];
    new_state[new_place] = null;
    new_state[space] = temp;

    return new node(new_state);




}
function leftState(state) {
    if (h1(state) == 0 || h2(state) == 0) {
        return null;
    }
    let new_state = [];
    new_state.push(...state);
    let space;
    let row;
    let col;
    let new_row;
    let new_col;
    let new_place;
    let temp;
    for (let i = 0; i < 9; i++) {
        if (new_state[i] == null) {
            space = i + 1;
        }
    }
    row = getCoordinates(space)[1];
    col = getCoordinates(space)[0];
    if (col == 1) {
        return null;
    }
    new_col = col - 1;
    new_row = row;
    new_place = getNum(new_col, new_row) - 1;
    space = space - 1;
    temp = new_state[new_place];
    new_state[new_place] = null;
    new_state[space] = temp;

    return new node(new_state);
}

/////////////////////////////////////////////////////////////////////////////////////////////
function h1(state) {
    let puzzle = document.getElementsByClassName("Grid-Item");
    let inPlace = 0;


    for (let i = 0; i < 8; i++) {
        if (state[i] == i + 1) {
            inPlace++;
        }
    }
    return 8 - inPlace;
}

function h2(state) {
    let x1;
    let x2;
    let y1;
    let y2;
    let distance = 0;

    for (let i = 0; i < 9; i++) {
        if (state[i] == null) {

        }
        else {

            x1 = getCoordinates(i + 1)[0];
            y1 = getCoordinates(i + 1)[1];
            x2 = getCoordinates(state[i])[0];
            y2 = getCoordinates(state[i])[1];
            distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }

    }

    return distance;
}

/////////////////////////////////////////////////////////////////////////////////////

function getNum(col, row) {

    for (let j = 1; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (row == j && col == i) {
                if (j == 1) {
                    return i;
                } else if (j == 2) {
                    return i + 3;
                } else if (j == 3) {
                    return i + 6;
                }
            }
        }
    }
}
function getCoordinates(num) {
    let C = new Array(2);
    if (num % 3 == 0) {
        C[0] = 3;
    } else {
        C[0] = num % 3;
    }
    if (num >= 1 && num <= 3) {
        C[1] = 1;
    }
    else if (num >= 4 && num <= 6) {
        C[1] = 2;
    }
    else {
        C[1] = 3;
    }

    return C;
}

function getState() {
    let items = document.getElementsByClassName("Grid-Item");
    let state = new Array(9);
    for (let i = 0; i < 8; i++) {

        for (let k = 1; k < 4; k++) {
            for (let j = 1; j < 4; j++) {
                if (window.getComputedStyle(items[i]).gridColumnStart == j && window.getComputedStyle(items[i]).gridRowStart == k) {
                    if (k == 1) {
                        state[j - 1] = parseInt(items[i].innerHTML);
                    } else if (k == 2) {
                        state[j + 2] = parseInt(items[i].innerHTML);
                    } else if (k == 3) {
                        state[j + 5] = parseInt(items[i].innerHTML);
                    }
                }
            }

        }
    }
    return state;
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function up() {
    let space = document.getElementById('space');
    let swapped;
    let gridItems = document.getElementsByClassName("Grid-Item");
    if (window.getComputedStyle(space).gridRowStart >= 2) {
        for (let i = 0; i <= 7; i++) {
            if ((window.getComputedStyle(gridItems[i]).gridColumnStart == window.getComputedStyle(space).gridColumnStart) &&
                (window.getComputedStyle(gridItems[i]).gridRowStart == window.getComputedStyle(space).gridRowStart - 1)) {
                swapped = gridItems[i];
                break;
            }
        }


        let r = window.getComputedStyle(swapped).gridRowStart;
        swapped.style.gridRowStart = window.getComputedStyle(space).gridRowStart;
        space.style.gridRowStart = r;

    }
}


function down() {
    let space = document.getElementById('space');
    let swapped;
    let gridItems = document.getElementsByClassName("Grid-Item");

    if (window.getComputedStyle(space).gridRowStart <= 2) {
        for (let i = 0; i <= 7; i++) {
            if ((window.getComputedStyle(gridItems[i]).gridColumnStart == window.getComputedStyle(space).gridColumnStart) &&
                (window.getComputedStyle(gridItems[i]).gridRowStart - 1 == window.getComputedStyle(space).gridRowStart)) {
                swapped = gridItems[i];
                break;
            }
        }


        let r = window.getComputedStyle(swapped).gridRowStart;
        swapped.style.gridRowStart = window.getComputedStyle(space).gridRowStart;
        space.style.gridRowStart = r;

    }
}

function right() {
    let space = document.getElementById('space');
    let swapped;
    let gridItems = document.getElementsByClassName("Grid-Item");
    if (window.getComputedStyle(space).gridColumnStart <= 2) {
        for (let i = 0; i <= 7; i++) {
            if ((window.getComputedStyle(gridItems[i]).gridRowStart == window.getComputedStyle(space).gridRowStart) &&
                (window.getComputedStyle(gridItems[i]).gridColumnStart - 1 == window.getComputedStyle(space).gridColumnStart)) {
                swapped = gridItems[i];
                break;
            }
        }


        let r = window.getComputedStyle(swapped).gridColumnStart;
        swapped.style.gridColumnStart = window.getComputedStyle(space).gridColumnStart;
        space.style.gridColumnStart = r;

    }
}


function left() {
    let space = document.getElementById('space');
    let swapped;
    let gridItems = document.getElementsByClassName("Grid-Item");
    if (window.getComputedStyle(space).gridColumnStart >= 2) {
        for (let i = 0; i <= 7; i++) {
            if ((window.getComputedStyle(gridItems[i]).gridRowStart == window.getComputedStyle(space).gridRowStart) &&
                (window.getComputedStyle(gridItems[i]).gridColumnStart == window.getComputedStyle(space).gridColumnStart - 1)) {
                swapped = gridItems[i];
                break;
            }
        }


        let r = window.getComputedStyle(swapped).gridColumnStart;
        swapped.style.gridColumnStart = window.getComputedStyle(space).gridColumnStart;
        space.style.gridColumnStart = r;

    }
}







function swap(item) {

    let space = document.getElementById('space');
    let gridItems = document.getElementsByClassName("Grid-Item");
    let swappedItem;

    for (let i = 0; i <= 8; i++) {

        if (gridItems[i].innerHTML == item) {
            swappedItem = gridItems[i];
            break;
        }
    }
    if ((((window.getComputedStyle(space).gridColumnStart - window.getComputedStyle(swappedItem).gridColumnStart == 1) ||
        (window.getComputedStyle(space).gridColumnStart - window.getComputedStyle(swappedItem).gridColumnStart == -1)) ||
        ((window.getComputedStyle(space).gridRowStart - window.getComputedStyle(swappedItem).gridRowStart == 1) ||
            (window.getComputedStyle(space).gridRowStart - window.getComputedStyle(swappedItem).gridRowStart == -1))) &&
        ((window.getComputedStyle(space).gridColumnStart == window.getComputedStyle(swappedItem).gridColumnStart)) ||
        (window.getComputedStyle(space).gridRowStart == window.getComputedStyle(swappedItem).gridRowStart)) {

        let c = window.getComputedStyle(swappedItem).gridColumnStart;
        let r = window.getComputedStyle(swappedItem).gridRowStart;

        document.getElementsByClassName(swappedItem.className)[0].style.gridColumnStart = window.getComputedStyle(space).gridColumnStart;
        document.getElementsByClassName(swappedItem.className)[0].style.gridRowStart = window.getComputedStyle(space).gridRowStart;

        space.style.gridColumnStart = c;
        space.style.gridRowStart = r;
    }
}

function solveGreedy(h) {
    let open = new Array();
    let close = new Set();
    let root = new node(getState());
    open.push(root);
    do {
        if (open.length == 0) {
            window.alert("No Solution!");
        }
        let n = open[0];

        if (h == 1) {


            for (let k = 0; k < open.length; k++) {
                if (open[k].h1 < n.h1) {
                    n = open[k];
                }
            }
            if (n.h1 == 0) {
                printSolPath(n);
                printTestPath(close);
                return;
            }
        } else if (h == 2) {

            for (let k = 0; k < open.length; k++) {
                if (open[k].h2 < n.h2) {
                    n = open[k];
                }
            } for (let k = 0; k < open.length; k++) {
                if (open[k].h2 < n.h2) {
                    n = open[k];
                }
            }
            if (n.h2 == 0) {
                printTestPath(close);
                printSolPath(n);
                return;
            }








        }



        expandNode(n);
        let f = 0;
        let f1 = 0;
        let Aset = Array.from(close);
        for (let i = 0; i < 4; i++) {

            if (n.children[i] != null) {

                for (let k = 0; k < open.length; k++) {
                    if (n.children[i].state.join() == open[k].state.join()) {
                        f1 = 1;
                    }
                }

                if (Aset.length != 0) {
                    for (let p = 0; p < Aset.length; p++) {
                        if (n.children[i].state.join() == Aset[p].state.join()) {
                            f = 1;
                        }
                    }
                } else {
                    f = 0;
                }

                if (f == 0 && f1 == 0) {
                    open.push(n.children[i]);
                    n.children[i].parent = n;
                    f = 0;
                    f1 = 0;
                }



            }
        }

        let index = open.indexOf(n);
        open.splice(index, 1);
        close.add(n);




    } while (open.length != 0)
}



function solveA_star(h) {
    let root = new node(getState());
    let open = new Array();
    let close = new Set();
    open.push(root);
    do {
        if (open.length == 0) {
            window.alert("No Solution!");
            return;
        }
        let n = open[0];



        if (h == 1) {


            for (let k = 0; k < open.length; k++) {
                if (open[k].f1 < n.f1) {
                    n = open[k];
                }
            }
            for (let k = 0; k < open.length; k++) {
                if (open[k].f1 == n.f1) {
                    if (open[k].h1 < n.h1) {
                        n = open[k];
                    }
                }
            }
            if (n.h1 == 0) {
                printSolPath(n);
                printTestPath(close);
                return;
            }

        } else if (h == 2) {



            for (let k = 0; k < open.length; k++) {
                if (open[k].f2 < n.f2) {
                    n = open[k];
                }
            }
            for (let k = 0; k < open.length; k++) {
                if (open[k].f2 == n.f2) {
                    if (open[k].h2 < n.h2) {
                        n = open[k];
                    }
                }
            }
            if (n.h2 == 0) {
                printSolPath(n);
                printTestPath(close);
                return;
            }







        }



        expandNode(n);
        let f = 0;
        let f1 = 0;
        let Aset = Array.from(close);
        for (let i = 0; i < 4; i++) {

            if (n.children[i] != null) {

                for (let k = 0; k < open.length; k++) {
                    if (n.children[i].state.join() == open[k].state.join()) {
                        f1 = 1;
                    }
                }

                if (Aset.length != 0) {
                    for (let p = 0; p < Aset.length; p++) {
                        if (n.children[i].state.join() == Aset[p].state.join()) {
                            f = 1;
                        }
                    }
                } else {
                    f = 0;
                }

                if (f == 0 && f1 == 0) {
                    open.push(n.children[i]);
                    n.children[i].parent = n;

                } else {

                    if (h == 1) {
                        open.forEach((obj, index) => {
                            if (obj.state.join() == n.children[i].state.join()) {
                                if (n.children[i].f1 < obj.f1) {

                                    open.splice(index, 1);
                                    open.push(n.children[i]);

                                }
                            }
                        });


                        close.forEach(obj => {
                            if (obj.state.join() == n.children[i].state.join()) {
                                if (n.children[i].f1 < obj.f1) {
                                    close.delete(obj);
                                    open.push(n.children[i]);
                                }
                            }
                        });
                    } else if (h == 2) {

                        open.forEach((obj, index) => {
                            if (obj.state.join() == n.children[i].state.join()) {
                                if (n.children[i].f2 < obj.f2) {

                                    open.splice(index, 1);
                                    open.push(n.children[i]);

                                }
                            }
                        });


                        close.forEach(obj => {
                            if (obj.state.join() == n.children[i].state.join()) {
                                if (n.children[i].f2 < obj.f2) {
                                    close.delete(obj);
                                    open.push(n.children[i]);
                                }
                            }
                        });






                    }










                }



            }
        }



        let index = open.indexOf(n);
        open.splice(index, 1);
        close.add(n);











    } while (open.length != 0)





}

function printSolPath(n) {
    let stack1 = new Array();
    let stack2 = new Array();
    let node = n;
    while (node != null) {
        stack1.push(node);
        node = node.parent;
    }
    for (let o = 0; o < stack1.length; o++) {
        stack2[o] = stack1[stack1.length - o - 1];
    }


    let t = new Array();
    for (let k = 0; k < stack2.length; k++) {

        for (let j = 0; j < 4; j++) {
            if (stack2[k].children[j] != null && stack2[k + 1] != null) {
                if (stack2[k + 1].state.join() == stack2[k].children[j].state.join()) {
                    if (j == 0) {
                        t[k] = "up";

                    } else if (j == 1) {
                        t[k] = "down";
                    } else if (j == 2) {
                        t[k] = "right";


                    } else if (j == 3) {
                        t[k] = "left";


                    }



                }
            }

        }

    }

    for (let y = 0; y < t.length; y++) {
        if (t[y] == "up") {
            setTimeout(() => {
                up();
            }, y * 500);
        }
        if (t[y] == "down") {
            setTimeout(() => {
                down();
            }, y * 500);
        }
        if (t[y] == "right") {
            setTimeout(() => {
                right();
            }, y * 500);
        }
        if (t[y] == "left") {
            setTimeout(() => {
                left();
            }, y * 500);
        }
    }
    document.getElementsByClassName("solPath")[0].innerHTML = "SOLUTION PATH: "+ t;
}


function printTestPath(close) {
let a = Array.from(close);
let b = new Array();
for(let i = 0; i< a.length; i ++) {
    b[i] = a[i].state;

}

for(let i =0; i < b.length; i++){
    document.getElementsByClassName("testPath")[0].innerHTML += "["+ b[i]+ "]";
}





}
