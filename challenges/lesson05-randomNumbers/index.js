console.log('Hola soy generador random');

const rNums = [];
for(let i =0 ; i<=10000; i++){
    rNums.push(Math.ceil(Math.random()*20))
}

const keys = {};

for(let i =1; i<=20; i++){
    keys[i]=0;
}

rNums.forEach((num)=>{
    keys[num]++;
})

console.log(keys);
