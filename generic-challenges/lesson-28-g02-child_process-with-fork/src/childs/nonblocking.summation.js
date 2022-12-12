
import summation from "./summation.js";

process.on('message', msg => {
    console.log(`Father message: ${msg}`);
    const summResult = summation();
    process.send({result: summResult});
    process.exit();
})

process.send('ready');
