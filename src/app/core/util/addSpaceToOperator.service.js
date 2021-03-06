(function () {
    'use strict';

    angular.module('biddy.core.util')
        .factory('AddCalculatedField', AddCalculatedField);

    function AddCalculatedField() {

        return {
            addSpaceBeforeAndAfterOperator: addSpaceBeforeAndAfterOperator
        }
    }

    var oldString = null;

    function addSpaceBeforeAndAfterOperator(expression) {
        var newCharacters = getDifference(oldString, expression.expression),
            subString, positions;

        switch (newCharacters) {
            case  ' *':
            case '*':
            case ' +':
            case '+':
            case  ' -':
            case '-':
            case  ' /':
            case '/':
            {
                //expression.expression = expression.expression.replace(/[/]/g, '  /  ');
                positions = getAllIndexOfCharacter(expression.expression, newCharacters);

                _.each(positions, function (position) {
                    if (_.isUndefined(expression.expression[position + 1]) || (expression.expression[position + 1] !=' ' && expression.expression[position - 1] !=' ' )) {
                        var firstString = expression.expression.substring(0, position);
                        var lastString = expression.expression.substring(position + newCharacters.length, expression.expression.length);

                        expression.expression = firstString.concat('  ').concat(newCharacters).concat('  ').concat(lastString);
                    }
                });
                break;
            }
            case  ' (':
            case '(':
            {
                positions = getAllIndexOfCharacter(expression.expression, '(');

                _.each(positions, function (position) {
                    if (_.isUndefined(expression.expression[position + 1]) || expression.expression[position + 1] =='[') {
                        var firstString = expression.expression.substring(0, position + 1);
                        var lastString = expression.expression.substring(position + 1, expression.expression.length);

                        expression.expression = firstString.concat('  ').concat(lastString);
                    }
                });
                break;
            }
            case  ' )':
            case ')':
            {
                subString = expression.expression.substring(0, expression.expression.length - 1);
                expression.expression = subString + '  )';
                break;
            }
        }

        oldString = expression.expression;

        return expression;
    }

    function getAllIndexOfCharacter(word, character) {
        word = _hackString(word);

        var positions = [], index = word.indexOf(character);

        while (index >= 0) {
            positions.push(index);
            index = word.indexOf(character, index + 1);
        }

        return positions;
    }

    function _hackString(word) {
        var string = angular.copy(word);
        var isFieldName = true;

        for (var key in word) {
            if(string[key] == '[') {
                isFieldName = true;
            }

            if(string[key] == ']') {
                isFieldName = false;
            }

            if(isFieldName) {
                string = replaceAt(string, key, 'a');
            }
        }

        return string
    }

    function replaceAt(string, index, character) {
        var a = string.split("");
        a[index] = character;
        return a.join("");
    }

    function getDifference(a, b) {
        var i = 0;
        var j = 0;
        var result = "";

        if (!a && !b) {
            return null;
        }

        if (!a) {
            return b;
        }

        if (!b) {
            return a;
        }

        while (j < b.length) {
            if (a[i] != b[j] || i == a.length)
                result += b[j];
            else
                i++;
            j++;
        }
        return result;
    }

})();