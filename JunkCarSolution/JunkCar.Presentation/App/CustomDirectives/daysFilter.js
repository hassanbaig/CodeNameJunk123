angular.module('daysFilters', []).
filter('daysFilter', function () {
    return function (providersList, rangeInfo) {
        var filtered = [];        
        
        angular.forEach(providersList, function (provider) {
                provider.days
                filtered.push(provider.days);

        });        
        return filtered;
    };
});