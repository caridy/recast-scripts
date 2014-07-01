#!/usr/bin/env node

// This script should echo the AST of the given file without
// modification.

var recast = require("recast");
var Syntax = recast.Syntax;
var Visitor = recast.Visitor;
var b = recast.types.builders;
var n = recast.types.namedTypes;

recast.run(function(ast, callback) {
    ast = new Exports().visit(ast);
    // transforming comments into import statements is possible,
    // but it is difficult to understand how to produce relative paths from the names
    // console.log(ast.program.comments);
    callback(ast);
}, {
    esprima: require('jsx-esprima')
});


var Exports = Visitor.extend({
    visitIfStatement: function(node) {
        // removing the hack to work on server and client
        if (n.BinaryExpression.check(node.test)
            && n.UnaryExpression.check(node.test.right)
            && node.test.right.operator === 'typeof'
            && n.Identifier.check(node.test.right.argument)
            && node.test.right.argument.name === 'exports') {
            return b.emptyStatement();
        }
        return node;
    },
    visitExpressionStatement: function (node) {
        // removing "use strict";
        if (n.Literal.check(node.expression) && node.expression.value === 'use_strict') {
            return b.emptyStatement();
        }
    },
    visitVariableDeclaration: function (node) {
        var d = node.declarations[0];
        // exporting the React.createClass() as default export
        if (n.VariableDeclarator.check(d)
            && n.CallExpression.check(d.init)
            && n.MemberExpression.check(d.init.callee)
            && d.init.callee.object.name === 'React'
            && d.init.callee.property.name === 'createClass') {
            // looking for React.create()
            return b.exportDeclaration(true, d.init);
        }
    }
});
