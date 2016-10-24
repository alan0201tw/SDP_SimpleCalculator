var app = angular.module('MyApp', ['ngMaterial', 'ngMessages','material.svgAssetsCache']);

app.controller('SelectedTextController',['$scope','$http', function($scope , $http) {

    $scope.input_value;

    $scope.hex;
    $scope.dec;
    $scope.oct;
    $scope.bin;

    $scope.new_base = 10;

    $scope.debugging_text = "No text";

    $scope.on_input_change = function() {
        try
        {
            console.log("lalalala");
            var num = parseInt($scope.input_value, 10);
            $scope.value_when_change_base = num;
            if(num > 0 && $scope.input_value != null)
            {
            $scope.hex = num.toString(parseInt($scope.new_base , 16));
            $scope.dec = num.toString(parseInt($scope.new_base , 10));
            $scope.oct = num.toString(parseInt($scope.new_base , 8));
            $scope.bin = num.toString(parseInt($scope.new_base , 2));
            }
            else
            {
                $scope.hex = "0";
                $scope.dec = "0";
                $scope.oct = "0";
                $scope.bin = "0";
            }
        }
        catch(err)
        {
            $scope.input_value = err;
        }
    }

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
        if($scope.input_value == null || parseInt($scope.input_value, 10) == 0)
            $scope.input_value = "";
        if(number < 10)
            $scope.input_value += String(number);
        else
            $scope.input_value += ".";

        $scope.on_input_change();
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
            if(operator == 4)
            {
                $scope.debugging_text = "%";
                $scope.input_value += "%";
            }
            $scope.on_input_change();
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
        $scope.on_input_change();
    }

    $scope.clear = function() {
        try
        {
            $scope.input_value = 0;
            $scope.on_input_change();
        }
        catch(err)
        {
            $scope.input_value = err;
        }
    }

    $scope.back = function() {
        $scope.input_value = $scope.input_value.slice(0, -1);
        $scope.on_input_change();
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
