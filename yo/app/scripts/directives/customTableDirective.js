/**
 * Created by cobos on 18/11/2015.
 */
angular.module('webappApp').directive('myTable', ['setMonthNameFilter', function (setMonthName) {
  function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  return {
    restrict: 'E',
    scope:{
      years: '=',
      availabilities: '='
    },
    transclude: false,
    link: function (scope, element, attrs) {
      var th_empty = '<th class="customTd_nothing"></th>';
      scope.$watch('years', function(newValue, oldValue) {
        var id_list = [];
        var tr_year = '';
        var tr_month = '';
        var tr_day = '';
        var tr_hour = '';
        var tr_check = '';
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
                      tr_hour += '<th class="customTd" colspan='+hour.cellspace+'>' + hour.value + '<br>' + hour.final + '</th>';
                      id_list.push(hour.id);
                    })
                  }
                })
              }
            })
          }
        });
        var th_participants = "";
        angular.forEach(scope.availabilities, function (participant, index) {
          var name_participant = '<th class="customTd_grey"><i class="fa fa-user">'+ participant.participant +'</th>';
          var votes = "";
          var list_timeSlot = [];
          angular.forEach(participant.slotsAvailabilities, function (slotAvailability, index) {
            list_timeSlot.push({"id": slotAvailability.timeSlot.id, "availability": slotAvailability.availability})
          });
          angular.forEach(id_list, function (id, index) {
            //debugger;
            var index = (list_timeSlot) ? findWithAttr(list_timeSlot, 'id', id) : -1;
            if(index != -1){
              switch(list_timeSlot[index].availability) {
                case "YES":
                  votes += '<th class="customTd_yes" colspan=1>Yes</th>';
                  break;
                case "NO":
                  votes += '<th class="customTd_no" colspan=1>No</th>';
                  break;
                default:
                  votes += '<th class="customTd_maybe" colspan=1>Maybe</th>';
              }
            }else{
              votes += '<th style="text-align: center;" colspan=1></th>';
            }
          });
          th_participants += name_participant + votes + "</tr><tr>";
        });
        var html = '<table class="table" style="width: auto !important;"><tbody><tr>'+th_empty+tr_year+'</tr><tr>'+th_empty+tr_month+
          '</tr><tr>'+th_empty+tr_day+'</tr><tr>'+th_empty+tr_hour+'</tr><tr>'+th_participants+'</tr></tbody></table>';
        element.html(html);
      }, true);
    }
  }
}]);
