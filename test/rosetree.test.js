// rosetree.test.js is
import assert from 'assert';
import RoseTree from './../fp/monad/rosetree';
describe('RoseTree', () => {
  describe('apply', function() {
    it('composition', () => {
      const v = RoseTree.Cons(1, [ RoseTree.of(2) ]);
      const u = RoseTree.of(x => x + 1);
      const a = RoseTree.of(x => x + 2);
      const b = v.ap(u.ap(a.map(f => g => x => f(g(x)))));
      const c = v.ap(u).ap(a);
      assert.deepEqual(b, c);
    });
  });
  describe('applicative', ()=> {
    it('identity', ()=> {
      const v = RoseTree.of(111);
      const b = v.ap(RoseTree.of(x => x));
      assert.deepEqual(b, v);
    });
    it('homomorphism', ()=> {
      const f = x => x + 3;
      const x = 1;
      const a = RoseTree.of(x).ap(RoseTree.of(f));
      const b = RoseTree.of(f(x))
      assert.deepEqual(b, a);
    });
    it('interchange', ()=> {
      const y = 1;
      const f = x => x + 4;
      const a = RoseTree.of(y).ap(RoseTree.of(f)); 
      const b = RoseTree.of(f).ap(RoseTree.of(f => f(y)))
      assert.deepEqual(b, a);
    });
  })
});
