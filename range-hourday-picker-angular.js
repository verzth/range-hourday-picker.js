(function ($,angular) {
    angular.module('rangeHourdayPicker',[])
        .directive('rangeHourdayPicker',function () {
            return {
                restrict : 'C',
                scope : {
                    ngModel : '=',
                    ngRhdp : '='
                },
                link : function (scope,element,attrs) {
                    var firstVal = scope.ngModel;
                    var rhdp = new RangeHourdayPicker($.extend({
                        id : attrs.id!==undefined?'#'+attrs.id:'',
                        callback : function (data) {
                            scope.ngModel = data;
                            if(scope.$root.$$phase!=='$apply' && scope.$root.$$phase!=='$digest')scope.$apply();
                        }
                    },scope.ngRhdp));
                    scope.$watch('ngModel',function (newVal) {
                        if(Array.isArray(newVal))rhdp.setValues(newVal);
                    });
                    rhdp.setValues(firstVal);
                }
            };
        });
})(jQuery,angular);