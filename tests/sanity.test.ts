import * as test from "tape";

test("setup", function(t) {
  t.end();
});

test("<Sanity test>", async (t: any) => {
  const res = Math.random();
  const clean = Boolean(res);
  const expected = true;

  t.deepEqual(clean, expected);
});

test("teardown", function(t) {
  // ...
  t.end();
});
