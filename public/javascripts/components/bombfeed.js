define(['jquery'], 

function ($) {
	var newBombsUrl = '/api/bombs/new',
	bombsUrl = '/api/bombs',
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
		$.get(bombsUrl, function (bombs){
			self.redrawBombs(bombs);
		});
	};

	p.redrawBombs = function (bombs) {
		this.$element.html('');
		for (var i = bombs.length - 1; i >= 0; i--) {
			this.$element.append($(this.renderBomb(bombs[i])))
		};		
	};

	p.appendBombs = function (bombs) {
		for (var i = bombs.length - 1; i >= 0; i--) {
			this.$element.append($(this.renderBomb(bombs[i])))
		};		
	};

	p.renderBomb = function (bomb) {
		if(new Date(bomb.detonation) < new Date()){
			return '<li class="bomb exploded">Boom!</li>';
		}else{
			return bombMarkupStart + Math.round((new Date(bomb.detonation)-new Date())/1000) + bombMarkupEnd;
		}
	};

	return BombFeed;
});