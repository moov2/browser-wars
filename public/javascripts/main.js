require([

],

/**
 * This module determines which JavaScript functionality should be loaded dependant
 * on the URL of the page that the user is currently on.
 */
function () {

    /**
     * Different URL structures that determine what module should be loaded.
     */
    var routes = [
        { url: '/', moduleToLoad: 'index/index'},
    ];

    var checkUrl = function () {
        var url = getPage();

        // loops through all the routes determining which modules should load.
        for(var i = 0; i < routes.length; i++) {
            var route = routes[i];

            if (url === route.url || (route.startsWith && url.lastIndexOf(route.url, 0) === 0)) {
                require([route.moduleToLoad]);
            }
        }
    };

    /**
     * Gets the URL of the current page the user is visiting.
     */
    var getPage = function () {
        return window.location.pathname.toLowerCase();
    };

    checkUrl();
});