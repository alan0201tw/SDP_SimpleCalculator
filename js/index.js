var app = angular.module('MyApp', ['ngMaterial', 'ngMessages','material.svgAssetsCache']);

app.controller('SelectedTextController',['$scope','$http', function($scope , $http) {

    $scope.input_value;

    $scope.new_base = 10;
    $scope.value_when_change_base;
    $scope.value_in_new_base;

    $scope.debugging_text = "No text";

    $scope.set_value = function (val) {
        if(val == null)
        {
            $scope.input_value = val;
            $scope.current_base = 10;
        }
        else
            $scope.input_value = val;
    }

    $scope.input_num = function (number) {
        if($scope.input_value == null)
        $scope.input_value = "";
        if(number < 10)
        $scope.input_value += String(number);
        else
        $scope.input_value += ".";
    }

    $scope.add_operator = function (operator) {
        try{
            if(operator == 0)
            {
                $scope.debugging_text = "+";
                $scope.input_value += "+";
            }
            if(operator == 1)
            {
                $scope.debugging_text = "-";
                $scope.input_value += "-";
            }
            if(operator == 2)
            {
                $scope.debugging_text = "*";
                $scope.input_value += "*";
            }
            if(operator == 3)
            {
                $scope.debugging_text = "/";
                $scope.input_value += "/";
            }
        }
        catch (err)
        {
            console.log(err);
        }
    }
    $scope.calculate = function() {
        try{
            $scope.input_value = String(eval($scope.input_value));
        }
        catch(err) {
            $scope.input_value = err;
        }
    }

    $scope.change_base = function() {
        try{
            var num = parseInt($scope.input_value, 10);
            $scope.value_when_change_base = num;
            $scope.value_in_new_base = num.toString(parseInt($scope.new_base , 10));
            //treat value as base = radix , and return decimal
        }
        catch(err){
            $scope.input_value = err;
        }
        finally{
            $scope.debugging_text = "In TO BIN";
            console.log("WAAAAAAAAAA");
        }
    }

}])
.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
app.config(function($mdThemingProvider) {
    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
});
