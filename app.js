angular.module('AutoLoanCalculatorApp', [
    'AutoLoanCalculatorController'
  ]);
  
angular.module('AutoLoanCalculatorController', []).
controller('autoLoanCalculatorController', function($scope) {
    $scope.displayVal = function() {
        var that = this;
        that.monthlyRate = (that.int / 100.0) / 12;
    
        //Calculate the payment
        that.monthlyPayment = that.amount * (that.monthlyRate / (1 - Math.pow(
            1 + that.monthlyRate, - that.months)));

        that.interest();
        that.amortization();

        return that.monthlyPayment;
    };

    $scope.calculateYears = function() {
        var that = this;
        that.years = (that.months / 12) > 0 ? that.months / 12 : 'Years';
        return that.years;  
    }


    $scope.interest = function() {
        var that = this;
        that.interestOnly = (that.monthlyPayment * that.months) - that.amount;
        return that.interestOnly;
    };

    $scope.amortization = function() {
        var that = this;
        var balance = that.amount;
        that.monthDetails = [];

        for (var count = 0; count < that.months; ++count) {
            //Month detail Item
            var monthDetail = {};


            //in-loop interest amount holder
            var interest = 0;
        
            //in-loop monthly principal amount holder
            var monthlyPrincipal = 0;

            //Set the month number using the loop count variable
            monthDetail.month = count + 1;

            //calc the in-loop interest amount and display
            monthDetail.balance = balance.toFixed(2);

            //calc the in-loop interest amount and display
            monthDetail.interest = (balance * that.monthlyRate).toFixed(2);

            //calc the in-loop monthly principal and display
            monthDetail.amount = (that.monthlyPayment - monthDetail.interest).toFixed(2);

            //update the balance for each loop iteration
            balance = balance - monthDetail.amount;	

            //adding month details to the array
            that.monthDetails.push(monthDetail);
        }
        
        return that.amortization;
    };

    // Clear all
    $scope.clearValues = function() {
        $scope.amount = null;
        $scope.months = null;
        $scope.years = null;
        $scope.int = null;
        $scope.down = null;
        $scope.monthlyPayment = null;
        $scope.interestOnly = null;
        $scope.monthDetails = null;
    };
});
    