require(['jquery',
	'components/bombfeed'],
	
function ($, BombFeed) {
	var feedSelector = '.js-bomb-feed';

	var bombFeed = new BombFeed($(feedSelector)[0]);
});