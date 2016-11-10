var app = angular.module('MyApp', ['ngMaterial', 'ngMessages','material.svgAssetsCache']);

app.controller('SelectedTextController',['$scope','$http', function($scope , $http) {

    $scope.input_value;

    $scope.hex;
    $scope.dec;
    $scope.oct;
    $scope.bin;

    $scope.new_base = 10;

    $scope.debugging_text = "No text";
    $scope.warning_text = "";

    $scope.on_input_change = function() {
        try
        {
            //console.log("lalalala");
            var num = parseInt($scope.input_value, $scope.new_base);
            //console.log(num);
            if(num > 0 && $scope.input_value != null)
            {
                $scope.hex = num.toString(parseInt(10 , 16));
                $scope.dec = num.toString(parseInt(10 , 10));
                $scope.oct = num.toString(parseInt(10 , 8));
                $scope.bin = num.toString(parseInt(10 , 2));
            }
            else
            {
                $scope.hex = "0";
                $scope.dec = "0";
                $scope.oct = "0";
                $scope.bin = "0";
            }

            if( /[A-Fa-f]/.test($scope.input_value) ) {
                $scope.warning_text = "Currently in hexidecimal mode";
                $scope.new_base = 16;
            }
            else {
                $scope.warning_text = "Currently in decimal mode";
                $scope.new_base = 10;
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
        else if(number == 100)
        $scope.input_value += ".";
        else if(number < 16 && number >= 10)
        $scope.input_value += String.fromCharCode(65+number-10);

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
            //console.log("foo baz".splice(4, "woo")); foo woobaz
            if($scope.new_base == 16){
                for (var i = 0, len = $scope.input_value.length; i < len; i++) {
                    console.log($scope.input_value);
                    if(i == 0 || $scope.input_value[i-1] == '+' || $scope.input_value[i-1] == '-' || $scope.input_value[i-1] == '*' || $scope.input_value[i-1] == '/' || $scope.input_value[i-1] == '%'){
                        console.log("detected at " + i.toString(10));
                        $scope.input_value = $scope.input_value.splice(i, "0x");
                        len = $scope.input_value.length;
                        i+=3;
                    }
                }
                //console.log("in 16");
            }
            console.log($scope.input_value);
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

    $scope.remove_current_input = function() {
        try
        {
            var state = 0; // 1 for number , 2 for operator
            //$scope.debugging_text = $scope.input_value[$scope.input_value.length-1];
            if( !isNaN( parseInt($scope.input_value[$scope.input_value.length - 1], 10) ) ) // Not a number
            state = 1;
            else
            state = 2;

            if(state == 1)
            {
                while( !isNaN( parseInt($scope.input_value[$scope.input_value.length - 1], 10) ) )
                $scope.input_value = $scope.input_value.slice(0, -1);
            }
            else if (state == 2)
            {
                $scope.input_value = $scope.input_value.slice(0, -1);
            }

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

String.prototype.splice = function(idx, str) {
    return this.slice(0, idx) + str + this.slice(idx);
};
