import can from "can";
import $ from "jquery";
import initView from "./tv.stache!";
import BitModel from "models/bit";


import "./tv.less!";
import "bit/";

var RealBit = BitModel.extend({
	findAll: function(params){
		return $.ajax({
			url: 'http://bithub.com/api/v3/embeds/1/entities?view=public&tenant_name=radioactive_fern_9050&image_only=true&' + $.param(params)
		});
	},
}, {});


export default can.Component.extend({
	tag: "wb-tv",
	template: initView,
	scope : {
		nextBitIndex: 1,
		init : function(){
			var self = this;
			RealBit.findAll({}, function(data){
				self.attr('bits', new RealBit.List(data));
				self.attr('visibleBits', [self.attr('bits.0')]);
				self.nextSlide();
			});
		},
		state : {
			isAdmin: function(){ return false}
		},
		nextSlide : function(){
			var self = this;
			setTimeout(function(){
				var nextBitIndex = self.attr('nextBitIndex');
				self.attr('visibleBits').push(self.attr('bits').attr(nextBitIndex));
				if(nextBitIndex + 1 === self.attr('bits').attr('length')){
					nextBitIndex = 0;
				} else {
					nextBitIndex++;
				}
				self.attr('nextBitIndex', nextBitIndex);
			}, 10000);
		},
		shouldRender: true,
	},
	events : {
		"{scope.visibleBits} length" : function(visibleBits, ev, length){
			var self = this;
			var cards, leftCard, rightCard;
			if(length === 2){
				cards = this.element.find('.bit-wrap');
				leftCard = cards.eq(0);
				rightCard= cards.eq(1);
				(function(){
					var bit = visibleBits.attr(1);
					var mainImgUrl = bit.attr('images.0.url');
					var authorImgUrl = bit.attr('author.avatar_url');
					var mainImg = $('<img/>').attr('src', mainImgUrl)[0];
					var authorImg;
					var loaded = 0;
					var runSlide = function(){
						if((authorImg && loaded === 2) || (!authorImg && loaded)){
							leftCard.animate({left: '-150%'});
							rightCard.animate({left: '50%'}, function(){
								self.scope.attr('visibleBits').shift();
								self.scope.nextSlide();
							});
						}
					};

					var imgCb = function(){
						loaded++;
						runSlide();
					};
					
					if(authorImgUrl){
						authorImg = $('<img/>').attr('src', authorImgUrl)[0];
						authorImg.addEventListener('load', imgCb);
						authorImg.addEventListener('error', imgCb);
					}

					mainImg.addEventListener('load', imgCb);
					mainImg.addEventListener('error', imgCb);
					
					
				})();
			}
		}
	},
	helpers : {
		formattedTitle : function(title){
			title = can.isFunction(title) ? title() : title;
			if(title && title !== 'undefined'){
				return title;
			}
			return "";
		},
		addExplicitHeight : function(){
			return function(el){
				var $el = $(el);
				setTimeout(function(){
					console.log($el.height(), $el.innerHeight(), $el.outerHeight())

				})
			}
		}
		
	}
});



//var bitData = new Bit.List(fixtures.data.slice(0, 10));
/*



import template from "./carousel.stache!";
import "./carousel.less!";

var State = can.Map.extend({
	isAdmin(){
		return false;
	},
	assetRoot: "./",
	hubId: 1
});

$('body').on('cardExpanded', function(ev, height){
	var parent = window.parent;
	if(parent){
		parent.postMessage('cardExpanded:' + height, '*');
	}
});


var wrapCreate = function(data){
	data.tenant_name = 'radioactive_fern_9050';
	return {
		interaction: data
	};
};

var __scrollRecorded;

var InteractionEvent = can.Model.extend({
	create : 'POST http://bithub.com/api/v3/interactions',
	createScrollInteraction : function(hubId){
		return this.create(wrapCreate({
			primary_source_id: hubId,
			primary_source_type: 'Embed',
			event_type: 'carousel-scroll'
		}));
	},
	createLinkClickedInteraction : function(hubId, entityId){
		return this.create(wrapCreate({
			primary_source_id: hubId,
			primary_source_type: 'Embed',
			secondary_source_id: entityId,
			secondary_source_type: 'Entity',
			event_type: 'carousel-link'
		}));
	},
	createEntitySharedInteraction : function(hubId, entityId, target){
		return this.create(wrapCreate({
			primary_source_id: hubId,
			primary_source_type: 'Embed',
			secondary_source_id: entityId,
			secondary_source_type: 'Entity',
			event_type: 'carousel-share',
			event_subtype: target
		}));
	}
}, {});


$('body').on('interaction:carousel-scroll', function(ev, hubId){
	if(!__scrollRecorded){
		InteractionEvent.createScrollInteraction(hubId);
		__scrollRecorded = true;
	}
});
$('body').on('interaction:carousel-link', function(ev, hubId, entityId){
	InteractionEvent.createLinkClickedInteraction(hubId, entityId);
});
$('body').on('interaction:carousel-share', function(ev, hubId, entityId, target){
	InteractionEvent.createEntitySharedInteraction(hubId, entityId, target);
});


$('#app').html(template({
	bitModel: RealBit,
	state: new State()
}));
*/
