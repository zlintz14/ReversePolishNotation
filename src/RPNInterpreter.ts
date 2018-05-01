let main = (): void => {
    //stack is array of numbers that will hold all digits entered and will act as a stack data structure
    var stack: number[] = []
    //num1 and num2 will temporarily hold the two digits popped of the stack
    var num1, num2
    //interpreted will hold the entire Infix Notation function as it is created
    var interpreted = ""
    //total is the calculated value of your entered expression
    var total: number = 0
    //parenthesisCount keeps track of the number of parenthesis to ouput to make order of operations clear
    var parenthesisCount = 0

    var prompt = require("prompt-sync")();
    console.log("\nRules for data entry:\n 1) ALWAYS enter a space between digits and operators. \n 2) IF you have any double digit numbers, i.e. 12, 100, 5000, etc., you MUST use spaces between terms. \n EXAMPLE: if you want to evaluate: (23 + 48) * 12, enter: 12 48 23 +*\n 3) IF you have four or more terms you MUST use spaces even if they are all single digits and you MUST enter the first two terms followed by an operator, then thereafter enter each additional term by itself followed by an operator.\n EXAMPLE: to evaluate: (12 * 3 + 4) / 10, enter: 3 12 * 4 + 10 / \n 4) IF you have three terms or less AND all are single digits you may enter spaces or no spaces between terms.\n EXAMPLE: 123 +/ \n EXAMPLE: 1 2 3 +/ \n Both are valid inputs and equivalent to each other.\n 5) VARYING spaces between terms do not matter, so long as there are no spaces between consecutive operators. \n EXAMPLE: (12 * 3 + 4) / 10, can be entered as: 3      12 *  4 +   10 / and  (3 + 2) / 1 can be entered as: 1 2    3 +/ \n")
    var RPN: string = prompt("Enter you function is Reverse Polish Notation (use *,/,+,-,^ for operators): ")
    
    //loop through entire input and perform appropriate operations
    for(let i = 0; i < RPN.length; i++) {
        //determine if current token is an operator
        if(RPN[i] === "+" || RPN[i] === "-" || RPN[i] === "/" || RPN[i] === "*" || RPN[i] === "^"|| RPN[i] === " ") {
            switch(RPN[i]) {
                case("+"):
                    //if stack's length is one do something slightly different for formatting reasons and perform appropriate operations on current total
                    if(stack.length == 1) {
                        num1 = stack.pop()
                        if(num1 != undefined) {
                            total = total + num1
                        } 
                        interpreted += " + " + num1 + ")"
                        parenthesisCount++
                    //otherwise get number off stack and convert it and perform appropriate operations on num1 and num2
                    } else {
                        num1 = stack.pop()
                        num2 = stack.pop()
                        if(num1 != undefined && num2 != undefined) {
                            total = num1 + num2
                        }    
                        interpreted += "(" + num1 + " + " + num2 + ")"
                    }
                    break
                case("-"):
                    if(stack.length === 1) {
                        num1 = stack.pop()
                        if(num1 != undefined) {
                            total = total - num1
                        } 
                        interpreted += " - " + num1 + ")"
                        parenthesisCount++
                    } else {
                        num1 = stack.pop()
                        num2 = stack.pop()
                        if(num1 != undefined && num2 != undefined) {
                            total = num1 - num2
                        } 
                        interpreted += "(" + num1 + " - " + num2 + ")"
                    }
                    break
                case("*"):
                    if(stack.length === 1) {
                        num1 = stack.pop()
                        if(num1 != undefined) {
                            total = total * num1
                        } 
                        interpreted += " * " + num1 + ")"
                        parenthesisCount++                        
                    } else {
                        num1 = stack.pop()
                        num2 = stack.pop()
                        if(num1 != undefined && num2 != undefined) {
                            total = num1 * num2
                        } 
                        interpreted += "(" + num1 + " * " + num2 + ")"
                    }
                    break
                case("/"):
                    if(stack.length === 1) {
                        num1 = stack.pop()
                        if(num1 != undefined) {
                            total = total / num1
                        } 
                        interpreted += " / " + num1 + ")"
                        parenthesisCount++
                    } else {
                        num1 = stack.pop()
                        num2 = stack.pop()
                        if(num1 != undefined && num2 != undefined) {
                            total = num1 / num2
                        } 
                        interpreted += "(" + num1 + " / " + num2 + ")"
                    }
                    break
                case("^"):
                    if(stack.length === 1) {
                        num1 = stack.pop()
                        if(num1 != undefined) {
                            total = total ** num1
                        } 
                        interpreted += " ^ " + num1 + ")"
                        parenthesisCount++
                    } else {
                        num1 = stack.pop()
                        num2 = stack.pop()
                        if(num1 != undefined && num2 != undefined) {
                            total = num1 ** num2
                        } 
                        interpreted += "(" + num1 + " ^ " + num2 + ")"
                    }
                    break    
                default:
                    break
            }
        //else we know it is ivalid input or a number
        } else {
            var count = i
            var temp = ""
            //see if input is invalid
            if((RPN[i] !== "+" && RPN[i] !== "-" && RPN[i] !== "*" && RPN[i] !== "/") && isNaN(Number(+RPN[i]))) {
                console.log("Please enter a valid form of Reverse Polish Notation.")
                main();
                break;
            }  
             //collect number
            while(RPN[count] != " "){
                temp += RPN[count] 
                count++
            }
            //get counter up to next token if extra spaces are entered
            while(RPN[count + 1] === " "){
                count++
            }
            //determine if it was a single digit number or multidigit number
            if((temp.length > 1 && !determineNoSpaceSingleDigitInput(RPN)) || 
            (determineNoSpaceDoubleDigitInput(RPN) && determineNoSpaceSingleDigitInput(RPN)))  {
                stack.push(+temp)
                i = count
            } else {
                stack.push(+RPN[i])
            }
        }
    }
    //will be empty if the input is invalid
    if(interpreted != "") {
        var parenthesis = ""
        for(let i = 0; i < parenthesisCount; i++) {
            parenthesis += "("
        }
        console.log("Your function in Infix Notation is: " + parenthesis + interpreted + " = " + total)
    }
}

//determine if the input entered was a collection of single digit numbers with no spacing, used for 3 or less terms
let determineNoSpaceSingleDigitInput = (input: string): boolean => {
    for(let i = 0; i < input.length; i++) {
        if((input[i] === "+" || input[i] === "-" || input[i] === "*" || input[i] === "/" || input[i] === "^") && 
            (input[i + 1] === "+" || input[i + 1] === "-" || input[i + 1] === "*" || input[i + 1] === "/" || input[i + 1] === "^")) {
            return true
        }
    }
    return false
};

//determine if the input entered was a collection of double digits numbers, used 3 or less terms
let determineNoSpaceDoubleDigitInput = (input: string): boolean => {
    var temp = ""
    var count = 0
    //collect number
    while(input[count] != " ") {
        temp += input[count]
        count++
    }
     //get counter up to next token if extra spaces are entered
    while(input[count + 1] === " "){
        count++
    }
    if(!isNaN(Number(temp)) && !isNaN(Number(input[count + 1]))) {
        return true
    }
    return false
};

main();