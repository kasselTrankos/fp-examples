// mahoma

const { type } = require("ramda");

//// mpontain
const montain = {
    dispatachAnalitA: () => 'hola muntdo',
    dispatachAnalitB: x => `${x} lo pinto`
};
const handlerMahoma = (type) => {
    const handler =  montain[type];
    console.log(handler)
    return handler;
}

/// mahoma :: (a -> b) Object -> 
const mahoma = (handlerAction, params) => {
    const action = handlerAction('dispatachAnalitB');
    // montain.a
    const e = action(params)
}


/// con
const ab = mahoma(handlerMahoma, 1);
console.log(ab);




