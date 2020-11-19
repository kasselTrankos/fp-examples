// stream
import Stream from './fp/monad/stream';
const can = new Stream(({complete, next})=>{
    next(1);
    next(2);
    next(3);
    const t = setTimeout(() => {
        next(4);
        complete();
    }, 1200);
    return ()=> clearInterval(t); // un sub
})
const sus = can.subscribe({
    next: x => console.log('next', x),
    complete: ()=> console.log('completation'),
    error: e => console.log(e, 'err0r')
});
setTimeout(sus, 1100);
// console.log(sus(), '0000000')
// can();
//