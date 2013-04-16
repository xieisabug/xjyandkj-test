function InvoiceCntl($scope) {
    $scope.qty = 1;
    $scope.cost = 19.95;
}

angular.module('drag', []).
    directive('draggable', function ($document) {
        varstartX = 0, startY = 0, x = 0, y = 0;
        return function (scope, element, attr) {
            element.css({
                position:'relative',
                border:'1pxsolidred',
                backgroundColor:'lightgrey',
                cursor:'pointer'
            });
            element.bind('mousedown', function (event) {
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
            });
            function mousemove(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top:y + 'px',
                    left:x + 'px'
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    });