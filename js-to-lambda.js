    function tokenizer(input) {
        let current = 0;
        let tokens = [];
    
        while (current < input.length) {
            let char = input[current];
    
            if (char === "(" || char === ")") {
                tokens.push({
                    type: 'parenthesis',
                    value: char,
                });
                current++;
                continue;
            }
    
            let WHITESPACE = /\s/;
            if (WHITESPACE.test(char)) {
                // Skip white spaces
                current++;
                continue;
            }
    
            let NUMBERS = /[0-9]/;
            if (NUMBERS.test(char)) {
                let value = '';
                while (NUMBERS.test(char)) {
                    value += char;
                    char = input[++current];
                }
                tokens.push({ type: 'number', value });
                continue;
            }
    
            if (char === '"') {
                let value = '';
                char = input[++current];
                while (char !== '"' && current < input.length) {
                    value += char;
                    char = input[++current];
                }
                if (char === '"') {
                    char = input[++current];
                    tokens.push({
                        type: 'string',
                        value,
                    });
                } else {
                    throw new SyntaxError('String not closed');
                }
                continue;
            }
    
            let LETTERS = /[a-zA-Z]/;
            if (LETTERS.test(char)) {
                let value = '';
                while (LETTERS.test(char) || char === "_") {
                    value += char;
                    char = input[++current];
                }
    
                if (value === "function") {
    
                    let params = [];
                    while (WHITESPACE.test(char)) {
                        char = input[++current];
                    }
    
                    while (char !== '(' ) {
                        char = input[++current];
                    }
    
                    if (char === '(') {
                        char = input[++current]; // Move past '('
                      
                        while (char !== ')') {
                            let paramName = '';
                            while (LETTERS.test(char)) {
                                paramName += char;
                                char = input[++current];
                            
                            }
                      
                            if (char === ',') {
                                char = input[++current]; // Move past the comma
                             
                            }
                            
                            if (paramName.trim() !== "") {
                                params.push({
                                    type: 'variable',
                                    value: paramName,
                                });
                            }
                            while (WHITESPACE.test(char)) {
                                char = input[++current];
                             
                            }
                        }
    
                        if (char === ')') {
                            char = input[++current]; // Move past ')'
                         
                            tokens.push({
                                type: 'params',
                                value: params,
                            });
                        } else {
                            throw new SyntaxError('Function parameters not closed');
                        }
                    }
                    
                    
                } else if (value === "return") {
                    // Ignore the 'return' keyword
                    let expression = '';
    
                    // Skip whitespaces after 'return'
                    while (WHITESPACE.test(char) && current < input.length) {
                        char = input[++current];
                    }
                
                    while (char !== ';' && current < input.length) {
                        expression += char;
                        char = input[++current];
                    }
                
                    // Check if the next character is a semicolon
                   
                    tokens.push({
                        type: 'expression',
                        value: expression.trim(),
                    });
                } else {
                    tokens.push({
                        type: 'identifier',
                        value,
                    });
                }
                continue;
            }
            if(char === "{"){
               
                char = input[++current];
                continue;
            }
            if(char === ";"){
                         
                char = input[++current];
                continue;
            }
            if(char === '}'){
                char = input[++current];
                continue;
            }
            let OPERATORS = /[+\-*/=<>!&|]/;
            if (OPERATORS.test(char)) {
                let value = char;
                char = input[++current];
    
                while (OPERATORS.test(char)) {
                    value += char;
                    char = input[++current];
                }
    
                tokens.push({
                    type: 'operator',
                    value,
                });
                continue;
            }
    
            throw new SyntaxError(`Unknown character '${char}' at line ${getLineNumber(input, current)}`);
        }
        
        return tokens;
    }
    
    
    function getLineNumber(input, position) {
        const lines = input.split('\n');
        let lineCount = 1;
        let currentPosition = 0;
    
        for (const line of lines) {
            currentPosition += line.length + 1; // +1 for the newline character
            if (currentPosition > position) {
                return lineCount;
            }
            lineCount++;
        }
    
        return lineCount;
    }
    function generateLambdaExpression(string) {
        const tokens = tokenizer(string)
        if (tokens.length === 0) {
            throw new Error('Empty tokens array');
        }
    
        const lambdaExpressions = tokens.map(token => {
            if (token.type === 'params') {
                const params = token.value.map(param => param.value).join(' ');
                return `\\ ${params} . `;
            } else if (token.type === 'expression') {
                return token.value;
            } else {
                throw new Error(`Unexpected token type: ${token.type}`);
            }
        });
    
        return lambdaExpressions.join('');
    }




export default generateLambdaExpression


