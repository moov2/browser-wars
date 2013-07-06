define(['jquery'], 

function ($) {
	var newBombsUrl = '/api/bombs/new',
	pollingRate = 1000,
	bombMarkupStart = '<li class="bomb">Bomb: ',
	bombMarkupEnd = ' seconds until detonation</li>';
	
	function BombFeed(elementSelector) {
		this.$element = $(elementSelector);

		this.initialise();
	}

	var p = BombFeed.prototype = {};

	p.initialise = function () {
		this.beginPoll();
	};

	p.beginPoll = function () {
		var self = this;
		setInterval(function () {
			self.poll();
		}, pollingRate);
	};

	p.poll = function () {
		var self = this;
		$.get(newBombsUrl, function (newBombs){
			self.appendBombs(newBombs);
		});
	};

	p.appendBombs = function (bombs) {
		for (var i = bombs.length - 1; i >= 0; i--) {
			this.$element.append($(this.renderBomb(bombs[i])))
		};		
	};

	p.renderBomb = function (bomb) {
		return bombMarkupStart + Math.round(bomb.timeLeft/1000) + bombMarkupEnd;
	};

	return BombFeed;
});