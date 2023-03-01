'use strict';

////////////////////////////////////////////////////////////////////////
//
//      EXEMPLOS INTRODUTÓRIOS: CONCAT e SPLICE
//
////////////////////////////////////////////////////////////////////////

// 1a: versão 
function concat(items) {
    const itemsTxt = [];
    for (let item of items) {
        itemsTxt.push(item.toString());
    }
    return itemsTxt.join('');
}
concat( [14, 7.1, "alberto", true, 7.1, [0, 1]] );

// 2a versão: rest parameter
function concat(...items) {
    let itemsTxt = [];
    for (let item of items) {
        itemsTxt.push(item.toString());
    }
    return itemsTxt.join(sep) + end;
}

// 3a versão: parâmetro opcional sep e end
// NOTA: Como em JS o rest parameter tem de ser o último, 
// voltamos a assumir que items é uma lista
function concat(items, sep='', end='\n') {
    let itemsTxt = [];
    for (let item of items) {
        itemsTxt.push(item.toString());
    }
    return itemsTxt.join(sep) + end;
}

concat([14, 7.1, "alberto", true, 7.1, [0, 1]], '', '//');

// 4a versão: objecto de especificação
function concat(items, {sep = '', end = ''} = {}) {
    let itemsTxt = [];
    for (let item of items) {
        itemsTxt.push(item.toString());
    }
    return itemsTxt.join(sep) + end;
}

concat([14, 7.1, "alberto", true, 7.1, [0, 1]], {sep: '', end: '//'});
concat([14, 7.1, "alberto", true, 7.1, [0, 1]], {end: '//'});

// SPLICE COM OBJECTO ESPECIFICAÇÃO
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

function splice(items, spliceOptions) {    
    const {start, deleteCount, newItems} = spliceOptions;    
    const result = deleteCount && newItems ? items.splice(start, deleteCount, ...newItems)
               : deleteCount             ? items.splice(start, deleteCount)
               : newItems                ? items.splice(start, 0, ...newItems)
               : nums.splice(start);
    return result;
}

let nums = [14, 7, 7, 0, 1];
splice(nums, {start: 1, deleteCount: 2, newItems: [8, 8, 8]});
splice(nums, {start: 1, deleteCount: 2});
splice(nums, {start: 3});

// TPC 1: Melhorar esta interface:
// 1. Se spec for um inteiro, assumir que é o valor de start. Isto permite
//    splice(nums, 1) e apaga todos a partir de 1.

// TPC 2: Versão de SLICE
// 1. Lista de parâmetros (items, start, [end, [newItems]])
// 2. items pode ser um array ou uma string
// 3. start e end têm a semântica dos parâmetros equivalentes em 
//    Array.prototype.slice. 
// 4. newItems são itens para substituirem os elementos de start a end.
// 5. Se items for um array e se receber newItems, a função é destrutiva;
//    se for uma string e newItems for passado, devolve uma cópia com 
//    as alterações
//
// Exemplos:
// let nums = [15, 10, 25, 20], nome = "ALBERTO";
// slice(nums, 0, 1) => [15]
// slice(nums, 0) => [15, 10, 25, 20]
// slice(nums, 1, -1) => [10, 25]
// slice(nome, 1, -1) => "LBERT"
//
// slice(nums, 1, -1, [0, 0, 0]) => [15, 0, 0, 0, 20]; nums = [15, 0, 0, 0, 20]
// slice(nome, 1, -1, "RMAN") => "ARMANDO"; nome = "ALBERTO"

////////////////////////////////////////////////////////////////////////
//
//      REST PARAMETERS E PSEUDO-PARÂMETROS 'ARGUMENTS' E 'THIS'
//
////////////////////////////////////////////////////////////////////////

// REST PARAMETERS: ver em cima uma das definições de concat

// ARGUMENTS: Array com todos os parâmetros
// Não se aconselha utilização agora que temos rest parameters

function sum() {
    let total = 0;
    // não podemos utilizar for-of pq arguments não é iterável (logo, não é array)
    for (let i = 0; i < arguments.length; i += 1) {
        total += arguments[i];
    }
    return total;
}
console.log(sum(1, 2, 3, 4));
let nums = [10, 15, 12];
console.log(sum(...nums));    // possível pós ES6; antes não era possível utilizar sum

// REST PARAMETER: dispensa ARGUMENTS

function sum(...values) {
    let total = 0;
    for (let val of values) {
        total += val;
    }
    return total;
}
console.log(sum(1, 2, 3, 4));
console.log(sum(...nums));

// THIS: Referência para o objecto de invocação
//       Permite que um método determine que objecto vai manipular
//       Imprescíndivel para POO pseudo-clássica com protótipos
//
// Existem quatro formas de invocar uma função:
//      . Funcional  : referenciaFuncao(args)
//      .    Método  : objectoThis.nomeMetodo(args)
//                     objectoThis['nomeMetodo'](args)
//      . Construtor : new ReferenciaFuncao(args)
//      . Applicação : referenciaFuncao.apply(objectoThis, args)
//                     referenciaFuncao.call(objectoThis, arg1, arg2, ...)
// O que muda de forma para forma, além da sintaxe, é como this é tratado.

function funA() {
    console.log(this);
}
function funB() {
    'use strict';
    console.log(this);
}
function FunC() {
    this.x = 10;
}
function FunD() {
    'use strict';
    this.x = 10;
}

////////////////////////////////////////////////////////////////////////
//
//      LAMBDAS, ARROW FUNCTIONS E FUNÇÕES DE PRIMEIRA ORDEM
//
////////////////////////////////////////////////////////////////////////

let nums = [100, 15, -2, -1, 59, 44, 12, 10, 46, 77, 15, 90, 15];
let nomes = ['alberto', 'bruno', 'armando', 'josé', 'albertina'];

function filtra(itens, criterio) {   // função de 1a ordem: função que recebe outras funções
    let seleccionados = [];
    for (let item of itens) {
        if (  criterio(item)  ) {
            seleccionados.push(item);
        }
    }
    return seleccionados;
}

function ePar(num) {
    return num % 2 === 0;
}

function ePositivo(num) {
    return num >= 0;
}

function terminadoEmOh(texto) {
    return texto[texto.length-1] === 'o';
}

function temPeloMenosTresAs(texto) {
    let quantos = 0;
    for (let ch of texto) {
        if (ch === 'a') {
            quantos += 1;
        }
    }
    return quantos >= 3;
}

filtra(nums, ePar);
filtra(nums, ePositivo);
filtra(nomes, terminadoEmOh);
filtra(nomes, temPeloMenosTresAs);

filtra(nums, function(num) {return num % 2 === 0;});
filtra(nums, function(num) {return num > 0;});
filtra(nomes, function(nome) {return nome[nome.length-1] === 'o';});
filtra(nomes, function(nome) {
    let quantos = 0;
    for (let ch of texto) {
        if (ch === 'a') {
            quantos += 1;
        }
    }
    return quantos >= 3;
});

filtra(nums, (num) => num % 2 === 0);
filtra(nums, (num) => num > 0);
filtra(nomes, (nome) => nome[nome.length-1] === 'o');
filtra(nomes, (nome) => {
    let quantos = 0;
    for (let ch of texto) {
        if (ch === 'a') {
            quantos += 1;
        }
    }
    return quantos >= 3;
});

function igualA(val) {
    return function(x) {return x === val;} 
}

function lengthIgual(val) {
    return function(obj) {return obj.length  === val;} 
}

function entre(limInf, limSup) {
    return (x) => x >= limInf && x <= limSup;
    // return function(x) { return x >= limInf && x <= limSup};
}

function igualA(val) {
    return (x) => x === val; 
}

function lengthIgual(val) {
    return (obj) => obj.length  === val; 
}

filtra(nums, (num) => num >= 10 && num <= 20);
filtra(nums, (num) => num >= -5 && num <= 14);
filtra(nums, (num) => num >= 100 && num <= 723);

filtra(nums, entre(10, 20));
filtra(nums, entre(-5, 14));
filtra(nums, entre(100, 723));

filtra(nums, igualA(15))
filtra(nomes, lengthIgual(7));

////////////////////////////////////////////////////////////////////////
//
//      FILTER, MAP, FOR-EACH, REDUCE, EVERY, SOME
//
////////////////////////////////////////////////////////////////////////

let nums = [100, -2, -1, 59, 44, 46, 77];
let nomes = ['alberto', 'bruno', 'armando', 'josé', 'albertina'];

nums.filter((num) => num >= 50);
nums.filter((num) => {return num >= 50;} );
nums.filter(function(num) {return num >= 50;} );

nums.map((num) => 2 * num);

nomes.forEach((nome) => console.log(nome));

let sum = 0;
for (let num of nums) {
    sum += num;
}

nums.reduce((num, acumulador) => acumulador + num, 0);
nomes.reduce((acumulator, currentValue) => acumulator + currentValue + ',', '');

function allPositive() {
    for (let num of nums) {
        if (num < 0) {
            return false;
        }
    }
    return true;
}

nums.every(num => num > 0);
nums.some(num => num > 0);

////////////////////////////////////////////////////////////////////////
//
//      RECURSIVIDADE
//      FUNCÕES INTERNAS / ANINHADAS
//
////////////////////////////////////////////////////////////////////////

//
// FACTORIAL 

// N! = N x (N-1) x (N-2) x ... x 1
// N! = N x (N-1)!
// 1! = 1
// 0! = 1

function factorialI(n) {
    let res = 1;
    for (let i = n; i > 0; i -= 1) {
        res *= i;
    }
    return res;
}

function factorialR(n) {
    if ([0, 1].includes(n)) {
        return 1;
    }
    return n * factorialR(n - 1);
}

// factorialR(5) = 5 * 24 = 120
// factorialR(4) = 4 * 6 = 24
// factorialR(3) = 3 * 2 = 6
// factorialR(2) = 2 * 1 = 2
// factorialR(1) = 1

//
// FIBONACCI 

// Fib(N) = Fib(N-1) + Fib(N-2)
// Fib(1) = 1
// Fib(0) = 0

function fibI(n) {
    if ([0, 1].includes(n)) {
        return n;
    }
    let [x, y] = [0, 1];
    for (let i = 2; i <= n; i += 1) {
        [y, x] = [y + x, y];
    }
    return y;
}

function fibI(n) {
    if ([0, 1].includes(n)) {
        return n;
    }
    let [f2, f1] = [0, 1];
    let fN;
    for (let i = 2; i <= n; i += 1) {
        fN = f1 + f2;
        f2 = f1;
        f1 = fN;
    }
    return fN;
}

function fibR(n) {
    if ([0, 1].includes(n)) {
        return n;
    }
    return fibR(n - 1) + fibR(n - 2)
}

//
// PALINDROMO 

// Exemplo: txt = 'AABAA'
//
//     i ->
//     0     1     2     3     4
//     A  |  A  |  B  |  A  |  A 
//    -5    -4    -3    -2    -1
//                          <- j

function ePalindromo(txt) {
    let [i, j] = [0, txt.length - 1];
    while (i < j) {
        if (txt[i] != txt[j]) {
            return false;
        }
        i += 1;
        j -= 1;
    }
    return true;
}

//
// FLATTEN

let nums = [1, 2, [3, [4, 5], 6], 7];

function flatten(arr) {
    if (arr.length === 0) {
        return [];
    }
    let [first, rest] = [arr[0], arr.slice(1)];
    if (Array.isArray(first)) {
        return flatten(first).concat(flatten(rest));
    }
    return [first].concat(flatten(rest));
}

function flatten(arr) {
    function doFlatten(arr, pos, retArr) {
        if (pos === arr.length) {
            return;
        }

        let first = arr[pos];
        if (Array.isArray(first)) {
            doFlatten(first, 0, retArr);
        }
        else {
            retArr.push(first);
        }
        doFlatten(arr, pos + 1, retArr);
    }

    let retArr = [];
    doFlatten(arr, 0, retArr);
    return retArr;
}


////////////////////////////////////////////////////////////////////////
//
//      CLOSURES E IIFES
//
////////////////////////////////////////////////////////////////////////

// . Contexto da função interna, ou envolvida, inclui o contexto da função 
//   externa, ou envolvente
// . Este contexto persiste após a função externa ter terminado
// . Contexto de uma função é o âmbito do bloco dessa função (mais o âmbito 
//   global)
// . Âmbito de uma função interna é um âmbito dessa função mais o âmbito da
//   da função externa
//
// NOTA: Termo "contexto" utilizado como sinónimo de "âmbito" ou de 
//       "escopo" (scope)
// 
// Âmbito de bloco (block scope):
//
//  {
//      let X;
//      {
//          let Y;
//          ... temos acesso a X e Y ...
//      }
//      ... temos acesso a apenas a X ...
//  }
//
// O mesmo aplica-se a funções:
// 
//  function verde() {
//      let X;
//      function vermelha() {
//          let Y;
//          ... temos acesso a X e Y ...
//      }
//      ... temos acesso a apenas a X ...
//      return vermelha;    // funcao é um objecto com acesso a X e Y e params de preta
//  }
//
//      ┌─────────────────────────────────┐
//      │              ┌───────────────┐  │
//      │              │               │  │
//      │  VERMELHA    │     VERDE     │  │
//      │              │               │  │
//      │              └───────────────┘  │
//      └─────────────────────────────────┘
//

// EXEMPLO 1: SOMADOR

function somador(n) {
    function somador(x) {
        return x + n;
    }
    return somador;
}
soma10 = somador(10);

function somador(n) {
    function somador(x) {
        return x + n;
    }
    return somador;
}

somaA = somador(10)
somaA(1)        # 11
somaA(10)       # 20

// Ou, de forma mais sucinta, utilizando uma lambda:

function somador(n) {
    return function(x) {
        return x + n;
    }
}

// "Arrow functions", que também são lambdas, tornam o código ainda 
// mais sucinto:

function somador(n) {
    return (x) => x + n;
}

// EXEMPLO3: GERADORES COM CLOSURES
//
// Iteradores e geradores são mecanismos para "personalizar" e tornar 
// mais eficiente a iteração em linguagens funcionais. O ES6 trouxe  
// suporte nativo para estes conceitos em JavaScript. Porém, podemos
// utilizar closures para implementar geradores:

function contador() {
    let count = 0;
    return function() {
        return count += 1;
    }
}

conta = contador();
console.log(conta());   // 1
console.log(conta());   // 2
console.log(conta());   // 3

// EXEMPLO4: GERADORES COM CLOSURES

function range(start, end, step=1) {
    let count = start;
    return function() {
        let value = step > 0 && count < end || step < 0 && count > end
                  ? count 
                  : undefined;
        count = count + (value !== undefined) * step;
        return value;
    }
}

r1 = range(0, 3)
console.log(r1());   // 0
console.log(r1());   // 1
console.log(r1());   // 2
console.log(r1());   // undefined

r2 = range(0, 10, 2)
console.log(r2());   // 0
console.log(r2());   // 2
console.log(r2());   // 4
console.log(r2());   // 6
console.log(r2());   // 8
console.log(r2());   // undefined

r3 = range(20, 14, -2)
console.log(r3());   // 20
console.log(r3());   // 18
console.log(r3());   // 16
console.log(r3());   // undefined


// EXEMPLO5: CONVERSOR DE MESES

// Com variável global => mau!
let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
];

function toMonthName(monthNum) {
    return months[monthNum-1];
}
console.log(toMonthName(4));

// Sem variável global => lento
function toMonthName(monthNum) {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months[monthNum-1];
}
console.log(toMonthName(4));

// Com closure
function makeToMonthName() {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];    
    return function(monthNum) {
        return months[monthNum-1];
    }
}

toMonthName = makeToMonthName();
console.log(toMonthName(4));

// Com IIFE: não precisamos de definir uma nova função global (e escolher
// um nome para ela)
toMonthName = (function() {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];    
    return function(monthNum) {
        return months[monthNum-1];
    }
})();

// EXEMPLO6: COMPILAÇÃO DE EXPRESSÕES REGULARES FEITA SÓ UMA VEZ EM 
//           VAR. LOCAL DE UMA CLOSURE 

function isValidDate(date) {
    const YEAR       = '(19[0-9][0-9]|20[0-4][0-9]|2050)';
    const DD_MM_31   = '(0[1-9]|[12][0-9]|30|31)/(0[13578]|1[02])';
    const DD_MM_30   = '(0[1-9]|[12][0-9]|30)/(0[469]|11)';
    const DD_FEB     = '(0[1-9]|1[0-9]|2[0-8])/02';
    const LEAP_YEARS = '(1904|1908|1912|1920|1924|1928|1932|1936|1940|1944'
                       + '|1948|1952|1956|1960|1964|1968|1972|1976|1980'
                       + '|1984|1988|1992|1996|2000|2004|2008|2012|2016'
                       + '|2020|2024|2028|2032|2036|2040|2044|2048)'
                       ;
    const DD_FEB_LEAP_YEAR = `(0[1-9]|[12][0-9])/02/${LEAP_YEARS}`;
    const dateRegExp = new RegExp(
        `^(${DD_FEB_LEAP_YEAR}|(${DD_MM_31}|${DD_MM_30}|${DD_FEB})/${YEAR})$`
    );
    return dateRegExp.test(date.trim());
}

const isValidDate = (function() {
    const YEAR       = '(19[0-9][0-9]|20[0-4][0-9]|2050)';
    const DD_MM_31   = '(0[1-9]|[12][0-9]|30|31)/(0[13578]|1[02])';
    const DD_MM_30   = '(0[1-9]|[12][0-9]|30)/(0[469]|11)';
    const DD_FEB     = '(0[1-9]|1[0-9]|2[0-8])/02';
    const LEAP_YEARS = '(1904|1908|1912|1920|1924|1928|1932|1936|1940|1944'
                       + '|1948|1952|1956|1960|1964|1968|1972|1976|1980'
                       + '|1984|1988|1992|1996|2000|2004|2008|2012|2016'
                       + '|2020|2024|2028|2032|2036|2040|2044|2048)'
                       ;
    const DD_FEB_LEAP_YEAR = `(0[1-9]|[12][0-9])/02/${LEAP_YEARS}`;
    const dateRegExp = new RegExp(
        `^(${DD_FEB_LEAP_YEAR}|(${DD_MM_31}|${DD_MM_30}|${DD_FEB})/${YEAR})$`
    );
    return function isValidDate(date) {
        return dateRegExp.test(date.trim())
    };
})();

