(function () {
    'use strict';

    var mod = angular.module('misc', []);

    mod.controller('ArrowFunctionController', function ($scope) {
        console.log('ArrowFunctionController was created');
        $scope.title = 'Function';

        var self = this;

        console.debug(' - normal context', this);

        // Mozilla Firefox support Arrow Function natively.
        setTimeout(() => {
            console.debug(' - delay context', this);
            $scope.title = 'Arrow Function?';
            // $scope.$digest();
            console.debug('is context equals?', angular.equals(self, this));
        }, 1000);
    });

    angular.bootstrap(document, ['misc']);
}());
