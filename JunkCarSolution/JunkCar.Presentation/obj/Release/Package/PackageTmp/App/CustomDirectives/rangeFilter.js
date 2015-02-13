angular.module('rangeFilters', []).
filter('rangeFilter', function () {
    return function (providersList, rangeInfo) {
        var filtered = [];        
        var arrayOfDays = [];
        var arrayOfAddress = [];
        var arrayOfTime = [];
        var min = parseInt(rangeInfo.userFeeMin);
        var max = parseInt(rangeInfo.userFeeMax);
        
        angular.forEach(providersList, function (provider) {
            arrayOfDays = provider.days.split(',');          
            arrayOfAddress = provider.address.split(' ');
            arrayOfTime = provider.timings.split('$');
        });
               
        angular.forEach(providersList, function (provider) {
            if (provider.fee >= min && provider.fee <= max) {
                if (arrayOfDays.length > 0) {
                    if (arrayOfDays.indexOf(rangeInfo.doctorsSearchMonDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchTueDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchWedDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchThuDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchFriDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchSatDay) > -1 ||
                        arrayOfDays.indexOf(rangeInfo.doctorsSearchSunDay) > -1) {

                        var minTime = parseInt(rangeInfo.userTimeMin);
                        var maxTime = parseInt(rangeInfo.userTimeMax);                  

                        for (var i = 0; i < arrayOfTime.length; i++) {
                            var proStartHr = parseInt(arrayOfTime[i].substring(0, 2));
                            var proStartMn = parseInt(arrayOfTime[i].substring(3, 5));
                            var proTTMin = arrayOfTime[i].substring(10, 12);
                            var proEndHr = parseInt(arrayOfTime[i].substring(42, 44));
                            var proEndMn = parseInt(arrayOfTime[i].substring(45, 47));
                            var proTTMax = arrayOfTime[i].substring(52, 54);

                            if (proTTMin === 'PM' && proStartHr != 12) {
                                proStartHr += 12;
                                proStartHr *= 60;
                            }
                            else { proStartHr *= 60; }

                            if (proTTMax === 'PM' && proEndHr != 12) {
                                proEndHr += 12;
                                proEndHr *= 60;
                            }
                            else { proEndHr *= 60; }

                            var proMinTime = proStartHr + proStartMn;
                            var proMaxTime = proEndHr + proEndMn;
                            
                            if ((proMinTime >= minTime) && (proMaxTime <= maxTime)) {
                                for (var j = 0; j < arrayOfAddress.length; j++) {
                                    if (rangeInfo.searchSelectedLocalities.indexOf(arrayOfAddress[j]) > -1) {
                                        if (filtered.indexOf(provider) < 0) {
                                            filtered.push(provider);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        rangeInfo.providersListCount = filtered.length;
        return filtered;
    };
});