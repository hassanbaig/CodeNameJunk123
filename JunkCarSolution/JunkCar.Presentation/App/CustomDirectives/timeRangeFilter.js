angular.module('timeRangeFilters', []).
filter('timeRangeFilter', function () {
    return function (value) {
        if (value === 1410) return '11:30 PM'
        var h = parseInt(value / 60);
        var m = parseInt(value % 60);
        
        var hStr = '';
        var mStr = '';       
        
         hStr = h;
         mStr = m;

        if (h < 12) {
            timeFormat = 'AM';
        }
        else {
            timeFormat = 'PM';
        }

        if (h == 0 && m <= 30)
        {
            hStr = 12;
        }

        if (h > 12)
        {
            hStr = h % 12;
        }
       
        if (m == 0) {
            output = hStr + ':' + mStr + '0' + ' ' + timeFormat;
        }
        else {
            output = hStr + ':' + mStr + ' ' + timeFormat;
        }
        return output;
    };
});