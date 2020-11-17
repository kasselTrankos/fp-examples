// ZERO := ƛfx.x 
export const ZERO = f => x => x;

// T = K := ƛxy.x
export const K = x => y => x;

// T := ƛxy.x
export const T = x => y => x;

// F = KI : = ƛxy.y
export const KI = x => y => y;

// M : = ƛx.xx
export const M = a => a(a);

// C : = ƛfxy.fyx ( as flip)
export const C = f => a => b => f(b)(a);

// F : = ƛxy.y
const F = x => y => y;
// ONCE := ƛfx.fx
export const ONCE = f => x => f(x);
// SUCCESSOR := λnfx.f(nfx)
const SUCC = num => f => x => f(num(f)(x));

// ADD := ƛnk.n(SUCC)k
export const ADD = n => k => n(SUCC)(k);

// B := λab.a∘b = compose
export const B = a => b => x =>a(b(x));

// MULT := λab.a∘b = compose
const MULT = B;

// NOT := ƛb.bFT
export const NOT = b => b(F)(T);

// AND := ƛpq.pTq
export const AND = p => q => p(q)(F);


// OR := ƛpq.pT.q
export const OR = p => q => p(T)(q);

// I := ƛx.x
export const I = x => x;

// EQ := ƛpq.pq.NOTq
export const EQ = p => q => p(q)(NOT(q));



// is0 := ƛn.n(KF)T
const is0 = n => n(K(F))(T);

// SUBTITUTION := ƛfgx.(fx)(gx)
const S = f => g => x => f(x)(g(x));



const PAIR = a => b => f => f(a)(b);



export const Y = fn => M(m => a => fn(m(m))(a));


// VIREO 
export const V = x => y => z => z(x)(y);

