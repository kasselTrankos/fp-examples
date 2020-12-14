// covariant

import Pred from 'crocks/Pred'
import { foldMap} from 'pointfree-fantasy'; 
import Reader from 'crocks/Reader';
import { Executor , Action} from './fp/monad/executor';

const greeting = Reader(x => `Hello ${x}`);

const reader = Reader(x => x +1);


const greaterThan5 = (x) => x > 5
const lessThan20 = (x) => x < 20
const isOdd = (x) => !!(x % 2);

const actions = {
    [Action('less')]: lessThan20,
    [isOdd]: Action('odd')
}

const a = Executor(actions)
    .action(Action('less'))
    .run(11)


console.log(a, 'a', 'mierda')
