(function () {
    'use strict';

    angular.module('biddy.productManagement')
        .filter('skills', skills)
    ;

    function skills() {
        return function (skills) {
            if (!skills || skills.length === 0) return null;

            var skillNames = [];
            angular.forEach(skills, function (skill) {
                skillNames.push(skill.name);
            });
            if (skillNames) {
                return skillNames.join(', ')
            }
            return null;
        };
    }
})();