// create our variable
var num1 = 0;
var num2 = 0;
var opr = "";
var divNumbers = document.querySelectorAll(".container .box-num");
var divOpers = document.querySelectorAll(".container .box-opr");
var showCalcBox = document.getElementById("sc");
var resetBox = document.getElementById("reset");
var clearBox = document.getElementById("clear");
// isOprClick = check if an operator is clicked
var isOprClick = false;
// isEqClick = check if equal is clicked
var isEqClick = false;
// fco = first click on operator
var fco = 0;

// add action to all divs
// clear show-calc box letter by letter

clearBox.onclick = function() {
  showCalcBox.innerHTML = showCalcBox.innerHTML.substring(0, showCalcBox.innerHTML.length - 1);
};

//reset div to clear and start again
resetBox.onclick = function() {
  isOprClick = false;
  isEqClick = false;
  fco = 0;
  num1 = 0;
  num2 = 0;
  opr = "";
  sc.innerHTML = "0";
};

//add action to show numbers
for(var i = 0; i < divNumbers.length; i++) {
  divNumbers[i].onclick = function() {
    if(isOprClick) {
      num1 = parseFloat(sc.innerHTML);
      sc.innerHTML = "";
    }
    // check if the text doesn't contain '.'
    if(sc.innerHTML.toString().indexOf(".") === -1) {
      //if text is equal to 0 and the div pressed is not a '.'
      if(sc.innerHTML === "0" && this.innerHTML !== ".") {
        sc.innerHTML = this.innerHTML;
        isOprClick = false;
      } else {
        sc.innerHTML = sc.innerHTML + this.innerHTML;
        isOprClick = false;
      }
    } else if(this.innerHTML !== ".") {
      sc.innerHTML = sc.innerHTML + this.innerHTML;
      isOprClick = false;
    }
  };
}

//add action to do operations
for(var i = 0; i < divOpers.length; i++) {
  divOpers[i].onclick = function() {
    if(fco === 0) {
      fco++;
      num1 = parseFloat(sc.innerHTML);
      // get the operator
      opr = this.innerHTML;
      isOprClick = true;
    } else {
      if(this.innerHTML !== "=") { // if the click div is not '='
        if(!isEqClick) {// if '=' is not already clicked
          num2 = parseFloat(sc.innerHTML);
          sc.innerHTML = calc(opr, num1, num2);
          opr = this.innerHTML;
          num2 = parseFloat(sc.innerHTML);
          isOprClick = true;
          isEqClick = false;
        } else {
            isEqClick = false;
            opr = this.innerHTML;
        }
      } else {
          num2 = parseFloat(sc.innerHTML);
          sc.innerHTML = calc(opr, num1, num2);
          opr = this.innerHTML;
          num1 = parseFloat(sc.innerHTML);
          isOprClick = true;
          isEqClick = true;
      }
    }
  };
}

// create a calc function to do the operations
function calc(op, n1, n2) {
  var result = 0;
  switch(op) {
    case"+":
      result = n1 + n2;
      break;
    case"-":
      result = n1 - n2;
      break;
    case"X":
      result = n1 * n2;
      break;
    case"/":
      if(n2 > 0)
      result = n1 / n2;
      break;
  }
  return result;
}