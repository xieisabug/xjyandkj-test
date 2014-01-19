describe('inputTest controllers', function() {

    describe('mo', function(){
        var scope, ctrl;

        beforeEach(module('test'));

        beforeEach(inject(function($controller) {
            scope = {};
            ctrl = $controller('inputTest', {$scope:scope});
        }));

        it('should create "phones" model with 3 phones', function() {
            expect(scope.list.length).toBe(3);
        });

    });
});