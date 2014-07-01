var counter;
function foo(a, b) {

  for (var i = 0; i < 10; i++) {
    console.log(i);
  }

  counter++;
  return a + b;
}

for (var i in [2, 3, 4]) {
  console.log(i);
}
