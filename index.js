let outPutScreen = document.querySelector(".rectangle");
let numberPadClicked = true;


for (let i = 0; i < document.querySelectorAll(".number-decimal").length; i++) {
    // document.querySelectorAll(".number-decimal")[i].addEventListener("click", function() {
    //     console.log()
    // });
    let digitButtons = document.querySelectorAll(".number-decimal")[i];

    if (digitButtons.textContent == "."){
        digitButtons.addEventListener("click", function () {
            if (outPutScreen.textContent == "Error") {
                clearAllHighlight(document.querySelectorAll(".arithmetic"));
                algebraicExpression.length = 0;
                clearButtonCounter = 0;
                equalButtonCounter = 0;
                outPutScreen.textContent = "0."
            }
            else if (!outPutScreen.textContent.includes(".")) {
                clearAllHighlight(document.querySelectorAll(".arithmetic"));
                clearButtonCounter = 0;
                equalButtonCounter = 0;
                outPutScreen.textContent += ".";
            }
        });
        
    } else {
        digitButtons.addEventListener("click", function () {
            clearAllHighlight(document.querySelectorAll(".arithmetic"));
            clearButtonCounter = 0;
            equalButtonCounter = 0;

            if (outPutScreen.textContent == "0"){
                outPutScreen.textContent = "";
                outPutScreen.textContent += digitButtons.textContent;
            } else if (numberPadClicked === false) {
                outPutScreen.textContent = "";
                outPutScreen.textContent += digitButtons.textContent;
            } else if (outPutScreen.textContent == "Error") {
                algebraicExpression.length = 0;
                outPutScreen.textContent = digitButtons.textContent;
            }
            else {
                outPutScreen.textContent += digitButtons.textContent;
            }
            numberPadClicked = true;
        });
    }
    
}

let clearButton = document.querySelector(".clear");
let arithmeticButton = document.querySelectorAll(".arithmetic")[3];
let num1 = "0";
let num2 = "0";
let operator = "";
let clearButtonCounter = 0;
let equalButtonCounter = 0;
const algebraicExpression = [];

clearButton.addEventListener("click", function () {

    if (outPutScreen.textContent == "Error") {
        outPutScreen.textContent = "0";
        algebraicExpression.length = 0;
    } else {
        clearButtonCounter++;

        if ((["+", "-", "/", "*"].indexOf(algebraicExpression[algebraicExpression.length - 1]) > -1) && (clearButtonCounter === 1)) {
            outPutScreen.textContent = "0";
            
            if (algebraicExpression[algebraicExpression.length - 1] == "+") {
                addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[3]);
            } else if (algebraicExpression[algebraicExpression.length - 1] == "-") {
                addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[2]);
            } else if (algebraicExpression[algebraicExpression.length - 1] == "x") {
                addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[1]);
            } else if (algebraicExpression[algebraicExpression.length - 1] == "/") {
                addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[0]);
            }   
        } else if ((document.querySelector(".highlight") != null) && (clearButtonCounter === 2)) {
            outPutScreen.textContent = "0";
            clearAllHighlight(document.querySelectorAll(".arithmetic"));
            algebraicExpression.length = 0;
        } else if (equalButtonCounter >= 1) {
            outPutScreen.textContent = "0";
            algebraicExpression.length = 0;
        } else {
            outPutScreen.textContent = "0";
        }
    }
});

// Addition Button
arithmeticButton.addEventListener("click", function () {
    addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[3]);

    if (outPutScreen.textContent == "Error") {
        algebraicExpression.length = 0;
        outPutScreen.textContent = "0";
    }

    if (equalButtonCounter > 0) {
        algebraicExpression.pop();
    }

    equalButtonCounter = 0;

    if (algebraicExpression.length == 0){
        algebraicExpression.push(outPutScreen.textContent);
        algebraicExpression.push("+");
    } else if (algebraicExpression.length < 3 && numberPadClicked === false){
        algebraicExpression[0] = outPutScreen.textContent;
        algebraicExpression[1] = "+";
    } else if (algebraicExpression.length < 3 && numberPadClicked === true) {
        algebraicExpression.push(outPutScreen.textContent);

        // Perform the calculation
        if (algebraicExpression[1] == "+"){
            algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
            algebraicExpression[1] = "+";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if(algebraicExpression[1] == "-") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
            algebraicExpression[1] = "+";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if (algebraicExpression[1] == "/") {
            if (algebraicExpression[2] == "0") {
                document.querySelector(".rectangle").textContent = "Error";
                algebraicExpression.length = 0;
                errorMessage = true;
            } else {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                algebraicExpression[1] = "+";
                algebraicExpression.pop();
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            }
            
        } else if (algebraicExpression[1] == "x") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
            algebraicExpression[1] = "+";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        }
    }

    numberPadClicked = false;

});

// Subtraction Button
document.querySelectorAll(".arithmetic")[2].addEventListener("click", function () {
    addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[2]);

    if (outPutScreen.textContent == "Error") {
        algebraicExpression.length = 0;
        outPutScreen.textContent = "0";
    }

    if (equalButtonCounter > 0) {
        algebraicExpression.pop();
    }

    equalButtonCounter = 0;

    if (algebraicExpression.length == 0){
        algebraicExpression.push(outPutScreen.textContent);
        algebraicExpression.push("-");
    } else if (algebraicExpression.length < 3 && numberPadClicked === false){
        algebraicExpression[0] = outPutScreen.textContent;
        algebraicExpression[1] = "-";
    } else if (algebraicExpression.length < 3 && numberPadClicked === true) {
        algebraicExpression.push(outPutScreen.textContent);

        // Perform the calculation
        if (algebraicExpression[1] == "+"){
            algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
            algebraicExpression[1] = "-";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if(algebraicExpression[1] == "-") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
            algebraicExpression[1] = "-";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if (algebraicExpression[1] == "/") {
            if (algebraicExpression[2] == "0") {
                document.querySelector(".rectangle").textContent = "Error";
                algebraicExpression.length = 0;
                errorMessage = true;
            } else {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                algebraicExpression[1] = "-";
                algebraicExpression.pop();
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            }
            
        } else if (algebraicExpression[1] == "x") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
            algebraicExpression[1] = "-";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        }
    }

    numberPadClicked = false;
});

// Division
document.querySelectorAll(".arithmetic")[0].addEventListener("click", function () {
    addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[0]);

    if (outPutScreen.textContent == "Error") {
        algebraicExpression.length = 0;
        outPutScreen.textContent = "0";
    }

    if (equalButtonCounter > 0) {
        algebraicExpression.pop();
    }

    equalButtonCounter = 0;

    if (algebraicExpression.length == 0){
        algebraicExpression.push(outPutScreen.textContent);
        algebraicExpression.push("/");
    } else if (algebraicExpression.length < 3 && numberPadClicked === false){
        algebraicExpression[0] = outPutScreen.textContent;
        algebraicExpression[1] = "/"; // LEFT OFF HERE
    } else if (algebraicExpression.length < 3 && numberPadClicked === true) {
        algebraicExpression.push(outPutScreen.textContent);

        // Perform the calculation
        if (algebraicExpression[1] == "+"){
            algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
            algebraicExpression[1] = "/";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if(algebraicExpression[1] == "-") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
            algebraicExpression[1] = "/";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if (algebraicExpression[1] == "/") {
            if (algebraicExpression[2] == "0") {
                document.querySelector(".rectangle").textContent = "Error";
                algebraicExpression.length = 0;
                errorMessage = true;
            } else {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                algebraicExpression[1] = "/";
                algebraicExpression.pop();
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            }
            
        } else if (algebraicExpression[1] == "x") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
            algebraicExpression[1] = "/";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        }
    }

    numberPadClicked = false;
});

// Multiplication
document.querySelectorAll(".arithmetic")[1].addEventListener("click", function () {
    addHighlight(document.querySelectorAll(".arithmetic"), document.querySelectorAll(".arithmetic")[1])
    

    if (outPutScreen.textContent == "Error") {
        algebraicExpression.length = 0;
        outPutScreen.textContent = "0";
    }

    if (equalButtonCounter > 0) {
        algebraicExpression.pop();
    }

    equalButtonCounter = 0;

    if (algebraicExpression.length == 0){
        algebraicExpression.push(outPutScreen.textContent);
        algebraicExpression.push("x");
    } else if (algebraicExpression.length < 3 && numberPadClicked === false){
        algebraicExpression[0] = outPutScreen.textContent;
        algebraicExpression[1] = "x"; // LEFT OFF HERE
    } else if (algebraicExpression.length < 3 && numberPadClicked === true) {
        algebraicExpression.push(outPutScreen.textContent);

        // Perform the calculation
        if (algebraicExpression[1] == "+"){
            algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
            algebraicExpression[1] = "x";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if(algebraicExpression[1] == "-") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
            algebraicExpression[1] = "x";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        } else if (algebraicExpression[1] == "/") {
            if (algebraicExpression[2] == "0") {
                document.querySelector(".rectangle").textContent = "Error";
                algebraicExpression.length = 0;
                errorMessage = true;
            } else {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                algebraicExpression[1] = "x";
                algebraicExpression.pop();
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            }
            
        } else if (algebraicExpression[1] == "x") {
            algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
            algebraicExpression[1] = "x";
            algebraicExpression.pop();
            document.querySelector(".rectangle").textContent = algebraicExpression[0];
        }
    }

    numberPadClicked = false;
});

// Equal Sign
document.querySelector(".equal").addEventListener("click", function () {
    if (outPutScreen.textContent != "Error") {
        clearButtonCounter = 0;
        equalButtonCounter++;
        clearAllHighlight(document.querySelectorAll(".arithmetic"));
        numberPadClicked = false;

        if (algebraicExpression.length == 2) {
            algebraicExpression.push(outPutScreen.textContent);

            if (algebraicExpression[1] == "+"){
                algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if(algebraicExpression[1] == "-") {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if (algebraicExpression[1] == "x") {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if (algebraicExpression[1] == "/") {
                if (algebraicExpression[2] == "0") {
                    outPutScreen.textContent = "Error";
                    algebraicExpression.length = 0;
                } else {
                    algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                    document.querySelector(".rectangle").textContent = algebraicExpression[0];
                }
                
            }
        } else if (algebraicExpression.length == 3) {
            if (algebraicExpression[1] == "+"){
                algebraicExpression[0] = String(Number(algebraicExpression[0]) + Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if(algebraicExpression[1] == "-") {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) - Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if (algebraicExpression[1] == "x") {
                algebraicExpression[0] = String(Number(algebraicExpression[0]) * Number(algebraicExpression[2]));
                document.querySelector(".rectangle").textContent = algebraicExpression[0];
            } else if (algebraicExpression[1] == "/") {
                if (algebraicExpression[2] == "0") {
                    outPutScreen.textContent = "Error";
                    algebraicExpression.length = 0;
                } else {
                    algebraicExpression[0] = String(Number(algebraicExpression[0]) / Number(algebraicExpression[2]));
                    document.querySelector(".rectangle").textContent = algebraicExpression[0];
                }
            }
        }
    }
    
});

function clearAllHighlight(arithmeticButtons) {
    for (let i = 0; i < arithmeticButtons.length; i++) {
        arithmeticButtons[i].classList.remove("highlight");
        
    }
}

function addHighlight(arithmeticButtons, button) {
    clearAllHighlight(arithmeticButtons);
    button.classList.add("highlight");
}