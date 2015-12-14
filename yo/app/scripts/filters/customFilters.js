'use strict';

angular.module('webappApp').filter('setMonthName', function () {
  return function(item){
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[item];
  };
});
