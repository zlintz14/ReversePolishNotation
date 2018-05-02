# About ReversePolishNotation
This repo is for a Reverse Polish Notation Interpreter and Calculator. This program written in Typescript is intended to read in a function or equation from the command line in Reverse Polish Notation and returns the equation you entered in Infix Notation (the way equations are commonly expressed) and also calculates the result of your equation.

# How to Use RPNInterpreter.ts
If you do not have Typescript or Node.js installed, please see Other Info About RPNInterpreter.ts which contains install instructions and other issues that I encountered while trying to set up this enviroment on my system. Also please make sure to use the tsconfig.json and package.json that I have provided. This program is intended to be used on the command line. Start by entering the command "npm run-script build" and then the command "node RPNInterpreter.js". Then simply follow the intructions that will appear for entering your function in Reverse Polish Notation and that's it!

# How the Program Works
You enter in the the equation and the program reads the input into a string array. It then loops through the entire array and reads character by character deciding if the the character is a number, operator, or invalid input by using subroutines, for and while loops, and a switch statement. Valid input is described at runtime and examples of valid input are given.

# Other Info About RPNInterpreter.ts
As I mentioned, if you do not have Typescript or Node.js I would recommned following these steps as I had several issues getting Node.js to install properly because the most current version of Node.js (10.0.0) had some interal bugs within the software. So first just install the most update to date version of Node.js from their website. Then make the director you wish to put the project in and then cd into it. Next do "npm init -y", then do "npm i typescript --save-dev". After that do "npm i @types/node@9.6.7 --save dev", we are going to downgrade the @types from the most current version of Node.js because I encountered errors while trying to work with them. Then do "node node_modules/typescript/lib/tsc --init". Lastly to get the "prompt-sync" module correctly installed, do "npm install --save prompt-sync".

Enjoy!
![alt text](https://media.giphy.com/media/BmmfETghGOPrW/giphy.gif)
