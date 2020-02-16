module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    'rules': {    
            // allow paren-less arrow functions    
            'arrow-parens': 0,    
            // allow async-await    
            'generator-star-spacing': 0,    
            // allow debugger during development    
            'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,    
            'no-tabs': 0,   
            'no-mixed-spaces-and-tabs': 0,    
            'indent': ["off", "tab"],    
            'no-unused-vars': 0,    
            'no-trailing-spaces': 0,    
            "eqeqeq": 0  
        }
};