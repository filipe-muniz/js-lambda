import generateLambdaExpression from "./js-to-lambda";

function add(x, y){
    return x + y
}
function identity(x){
    return x;
}
function greaterThan(x , y){
    return x > y;
}
function mockingbird(f){
    return f(f);
}

  

console.log(`Javascript add function: \n`, add.toString() )
console.log('Lambda Calculus add Expression: \n', generateLambdaExpression(add.toString()));
console.log(`Javascript identity function: \n`, identity.toString() )
console.log('Lambda Calculus identity Expression: \n', generateLambdaExpression(identity.toString()));
console.log(`Javascript mockingbird function: \n`, mockingbird.toString())
console.log('Lambda Calculus mockingbird Expression: \n', generateLambdaExpression(mockingbird.toString()));