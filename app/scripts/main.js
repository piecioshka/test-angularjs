(function () {
    'use strict';

    var mod = angular.module('misc', []);

    mod.controller('ArrowFunctionController', function ($scope) {
        console.debug('ArrowFunctionController was created');
        $scope.title = 'function';

        var self = this;

        console.log('ArrowFunctionController: normal context', this);

        // Mozilla Firefox support Arrow Function natively.
        // setTimeout(() => {
        setTimeout(function () {
            console.log('ArrowFunctionController: delay context', this);
            $scope.title = 'arrow function?';
            // $scope.$digest();
            console.log('ArrowFunctionController: is context equals?', angular.equals(self, this));
        }, 1000);
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.controller('ObjectController', function ($scope) {
        console.debug('ObjectController was created');
        $scope.dataStructure = {
            foo: 'bar'
        };
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.controller('HelperController', function ($scope) {
        console.debug('HelperController was created');
        $scope.helper = 1;
    });

    mod.controller('DependencyController', function ($scope, $controller) {
        console.debug('DependencyController was created');
        var $newScope = $scope.$new();

        $controller('HelperController', {
            $scope: $newScope
        });

        console.log('DependencyController: $newScope.helper', $scope.value = $newScope.helper);
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.service('FirstService', function FirstService() {
        this.helper = function () {
            return 'FirstService: helper'
        };
    });

    function SecondService() {

    }

    SecondService.prototype.helper = function () {
        return 'SecondService: helper';
    };

    mod.service('SecondService', SecondService);

    mod.controller('PrototypeController', function ($scope, FirstService, SecondService) {
        console.debug('PrototypeController was created');
        $scope.firstHelper = FirstService.helper();
        $scope.secondHelper = SecondService.helper();
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.directive('terminalDirective', function () {
        return {
            restrict: 'A',
            compile: function () {
                console.warn('Directive: compile: terminalDirective');
            },
            controller: function () {
                console.warn('Directive: controller: terminalDirective');
            },
            link: function () {
                console.warn('Directive: link: terminalDirective');
            }
        }
    });

    mod.directive('priorityDirective', function () {
        return {
            restrict: 'A',
            compile: function () {
                console.warn('Directive: compile: priorityDirective');
            },
            controller: function () {
                console.warn('Directive: controller: priorityDirective');
            },
            link: function () {
                console.warn('Directive: link: priorityDirective');
            }
        }
    });

    mod.directive('massiveDirective', function () {
        return {
            restrict: 'A',
            compile: function () {
                console.warn('Directive: compile: massiveDirective');
            },
            controller: function () {
                console.warn('Directive: controller: massiveDirective');
            },
            link: function () {
                console.warn('Directive: link: massiveDirective');
            }
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.controller('CloakController', function ($timeout, $scope) {
        $timeout(function () {
            $scope.title = 'Cloak!';
        }, 1000);
    });

    // -----------------------------------------------------------------------------------------------------------------

    mod.controller('SwitchController', function ($scope) {
        $scope.foo = 'baz';
    });


    // -----------------------------------------------------------------------------------------------------------------

    mod.controller('ForEachController', function ($scope) {
        $scope.list = ['a', 'b', 'c'];

        var angularForEach = [];
        var standardForEach = [];

        angular.forEach($scope.list, function (item) {
            angularForEach.push(item);
        });
        $scope.list.forEach(function (item) {
            standardForEach.push(item);
        });

        console.assert(angular.equals(angularForEach, standardForEach), 'ForEachController: arrays not equal');

        // bad input

        try {
            angular.forEach(null);
            console.info('ForEachController: angular.forEach(null) - not crashed when passed not properly data');
        } catch (e) {
            console.warn('ForEachController: angular.forEach(null) - crashed when passed not properly data');
        }

        try {
            Array.prototype.forEach.call(null);
            console.info('ForEachController: Array.prototype.forEach.call(null); - not crashed when passed not properly data');
        } catch (e) {
            console.warn('ForEachController: Array.prototype.forEach.call(null); - crashed when passed not properly data');
        }
    });

    // -----------------------------------------------------------------------------------------------------------------

    angular.bootstrap(document, ['misc']);
}());
