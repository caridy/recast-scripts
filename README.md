

```
./scripts/echo.js fixtures/simple.js
./scripts/ast.js fixtures/simple.js
```


```
find ./path/to/folder | grep "\.js$" | time parallel ~/repo/recast-scripts/scripts/<something> --update
```

Builder

```
echo '(counter++, __es6_export("counter", counter))' | ./node_modules/ast-util/bin/make-builder
```
