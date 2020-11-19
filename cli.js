// cli
import Cli from './utils/cli';

const cli = new Cli();

const readLine = cli.question('hola mindo: ');

readLine.subscribe({
    next: x => console.log(x, 'next'),
    error: x => console.log(x, 'error'),
    complete: x => console.log(x, 'complete'),
});


