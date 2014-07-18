Recast Scripts
--------------

Collection of recast scripts and notes.

### Echo

```bash
./scripts/echo.js fixtures/simple.js
```

### AST Echo

```bash
./scripts/ast.js fixtures/simple.js
```

### Parallel

If you plan to execute the script to modify a massive amount of code, make sure you use `parallel` to speed things up:

```
find ./path/to/folder | grep "\.js$" | time parallel ~/repo/recast-scripts/scripts/<something>
```

### Builder

If you don't know how to create a certain structure, you can use the ast builder to show you the right structure:

```bash
echo 'obj.doSomething("counter", counter)' | ./node_modules/ast-util/bin/make-builder
```

as a result, it will print out something like this:

```javascript
b.callExpression(
  b.memberExpression(
    b.identifier('obj'),
    b.identifier('doSomething'),
    false
  ),
  [
    b.literal('counter'),
    b.identifier('counter')
  ]
)
```

### Custom Writer

If you want your recast script to update the source file directly, you can use the `writeback` option to specify how to write the content into disk. In the following example, if the script is executed with the parallel command, you can write back into the source file directly:

```javascript
recast.run(function(ast, callback) {
    callback(ast);
}, {
    writeback: function (output) {
        console.log('Writting: ' + process.argv[2]);
        require('fs').writeFileSync(process.argv[2], output);
    }
});
```
