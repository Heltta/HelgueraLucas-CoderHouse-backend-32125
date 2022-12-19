import yargs from "yargs";

function createNRandomNumbers (quantity) {
    //Returns a given quantity of random numbers
    //between 1 and 1000
    const randomNumbers = {};
    for(let i = 0; i < quantity; i++){
        // randomNumbers.push(Math.random()*1000)
        const randomNumber = Math.round(Math.random()*1000);
        randomNumbers[randomNumber] = (randomNumbers[randomNumber]) ?
            randomNumbers[randomNumber]+1 :
            1 ;
    }
    return randomNumbers
}

process.on('message', msg => {
    console.log(`Father message: ${msg}`);
    const parsedArguments = yargs(process.argv.slice(2)).argv;
    const quantity = (typeof parsedArguments.quantity === 'number')?
        parsedArguments.quantity :
        100000000
    const listOfRandomNumbers = createNRandomNumbers(quantity);
    process.send({result: listOfRandomNumbers});
    process.exit();
})

process.send('ready');

export default createNRandomNumbers;
