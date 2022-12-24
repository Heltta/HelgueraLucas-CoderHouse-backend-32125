import yargs from "yargs";

const commandLineArguments = yargs(process.argv.slice(2)).argv;

export default commandLineArguments;
export const server_port = commandLineArguments.server_port;
