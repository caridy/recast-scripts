#!/usr/bin/env node

var recast = require("recast");
var Syntax = recast.Syntax;
var Visitor = recast.Visitor;
var b = recast.types.builders;

recast.run(function(ast, callback) {
    callback(new Explorer().visit(ast));
});

var Explorer = Visitor.extend({
    visitForInStatement: function(node) {
        console.log(4, node);
        return node;
    },
    visitFunctionDeclaration: function(node) {
        console.log(4, node);
        return node;
    },
    visitExpressionStatement: function (node) {
        console.log(14444, node);
    }
});
