var modProduct = function(a,b,n){
  if(b===0) return 0;
  if(b===1) return a%n;
  return (modProduct(a,(b-b%10)/10,n)*10+(b%10)*a)%n;
};

var isInt = function(n) {
   return typeof n === 'number' && n % 1 === 0;
};

var modPow = function(a,b,n){
  if(b===0) return 1;
  if(b===1) return a%n;
  if(b%2===0){
    var c=modPow(a,b/2,n);
    return modProduct(c,c,n);
  }
  return modProduct(a,modPow(a,b-1,n),n);
};
var isPrime = function(n){
  if(n===2||n===3||n===5) return true;
  if(n%2===0||n%3===0||n%5===0) return false;
  if(n<25) return true;
  for(var a=[2,3,5,7,11,13,17,19],b=n-1,d,t,i,x;b%2===0;b/=2);
  for(i=0;i<a.length;i++){
    x=modPow(a[i],b,n);
    if(x===1||x===n-1) continue;
    for(t=true,d=b;t&&d<n-1;d*=2){
      x=modProduct(x,x,n); if(x===n-1) t=false;
    }
    if(t) return false;
  }
  return true;
};
var getPrime = function() {
  var guess = Math.floor(Math.random()*50000) + 50000;
  // var guess = Math.floor(Math.random()*90000000) + 4906265;
  if (guess % 2 === 0) guess--;
  while (!isPrime(guess)) {
    guess -= 2;
  }
  return guess;
};

var modInverse = function(a, n) {

  var quotient,
      temp,
      t = 0,
      new_t = 1,
      r = n,
      new_r = a;

  while (new_r !== 0) {
    quotient = (r / new_r) >> 0;

    temp = new_t;
    new_t = t - quotient * new_t;
    t = temp;

    temp = new_r;
    new_r = r - quotient * new_r;
    r = temp;
  }

  if (r > 1) {
    return null;
  } else if (t < 0) {
    return t + n;
  } else {
    return t;
  }

};

var charToInt = function(input) {
  if (input === " ") return 1;
  else return input.charCodeAt() - 95;
};

var intToChar = function(input) {
  if (input === 0) return " ";
  else return String.fromCharCode(input + 96);
};


var encodeMessage = function(input) {
  input = input.toLowerCase();
  if (!/^[a-z\s]+$/.test(input)) {
    throw "message must be characters and spaces only.";
  } else if (input.length > 9) {
    throw "sorry, each message must be 6 or fewer characters.";
  } else {
    input = input.split('');
    var output = 0;
    var digit = 0;
    while (input.length) {
        var currentChar = input.pop();
        var currentVal = charToInt(currentChar);
        var outputVal = currentVal*Math.pow(27, digit++);
        output += outputVal;
    }
    return output + 1;
  }
};

var decodeMessage = function(input) {
  var output = "";
  input = input - 1;
  while (input > 0) {
      input = input - 1;
      var currentVal = input % 27;
      var currentChar = intToChar(currentVal);
      output = currentChar + output;
      input = (input/27) >> 0;
  }
  return output;
};

var encrypt = function(m, n, e) {
  if (isInt(m) && isInt(n) && isInt(e)) {
    return modPow(m, e, n);
  } else {
    throw "arguments to `encrypt` must be integers";
  }
};

var decrypt = function(c, n, d) {
  if (isInt(c) && isInt(n) && isInt(d)) {
    return modPow(c, d, n);
  } else {
    throw "arguments to `decrypt` must be integers";
  }
};

var p = getPrime();
var q = getPrime();
var n = p*q;
var phi_n = n - (p + q - 1);
var e = 65537;
var d = modInverse(e, phi_n);

console.log('');
console.log('');
console.log("p:", p);
console.log("q:", q);
console.log("n:", n);
console.log("phi_n:", phi_n);
console.log("e:", e);
console.log("d:", d);

var message = "a";
var encodedMessage = encodeMessage(message);
var encryptedMessage = encrypt(encodedMessage, n, e);
var decryptedMessage = decrypt(encryptedMessage, n, d);
var decoded = decodeMessage(decryptedMessage);

console.log('');
console.log("message:", message);
console.log("encoded:", encodedMessage);
console.log("encrypted:", encryptedMessage);
console.log("decrypted:", decryptedMessage);
console.log("decoded:", decoded);
console.log('');
console.log('');





