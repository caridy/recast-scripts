#!/usr/bin/env node

// This script should echo the AST of the given file without
// modification.

require("recast").run(function(ast, callback) {
    console.log(JSON.stringify(ast.program.body, null, 4));
    callback(ast);
});
