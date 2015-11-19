/**
 * Created by cobos on 18/11/2015.
 */
angular.module('webappApp').directive('myTable', ['setMonthNameFilter', function (setMonthName) {
  return {
    restrict: 'E',
    scope:{
      years: '=',
      availabilities: '='
    },
    transclude: false,
    link: function (scope, element, attrs) {
      debugger;
      var tr_year = '';
      var tr_month = '';
      var tr_day = '';
      var tr_hour = '';
      var th_empty = '<th class="customTd_nothing"></th>';
      angular.forEach(scope.years, function (year, index) {
        tr_year += '<th class="customTd_year" colspan='+year.cellspace+'>' + year.value + '</th>';
        if ('months' in year) {
          angular.forEach(year.months, function (month, index) {
            tr_month += '<th class="customTd_month" colspan='+month.cellspace+'>' + setMonthName(month.value) +'</th>';
            if ('days' in month) {
              angular.forEach(month.days, function (day, index) {
                tr_day += '<th class="customTd_day" colspan='+day.cellspace+'>' + day.value + '</th>';
                if ('hours' in day) {
                  angular.forEach(day.hours, function (hour, index) {
                    tr_hour += '<th class="customTd" colspan='+hour.cellspace+'>' + hour.value + ':00<br>15:00</th>';
                  })
                }
              })
            }
          })
        }
      });
      if(scope.availabilities){

      }
      var th_new_availabilitie = '<th class="customTd_nothing"><input placeholder="name"></th>';
      var html = '<table class="table table-bordered"><tbody><tr>'+th_empty+tr_year+'</tr><tr>'+th_empty+tr_month+
        '</tr><tr>'+th_empty+tr_day+'</tr><tr>'+th_empty+tr_hour+'</tr><tr>'+th_new_availabilitie+'</tr></tbody></table>';
      debugger;
      element.replaceWith(html)
    }
  }
}]);
