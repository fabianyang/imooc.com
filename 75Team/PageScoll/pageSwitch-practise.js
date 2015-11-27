(function($) {
	/* 说明：获取浏览器前缀 */
	/* 实现：判断某个元素的css样式中是否存在transition属性 */
	/* 参数：dom元素 */
	/* 返回值：boolean 有则返回浏览器样式前缀，否则返回false */

	var _prefix = (function(temp) {
		var aPrefix = ["webkit", "ms", "moz", "o"],
			props = '';
		for (var i in aPrefix) {
			props = aPrefix[i] + 'Transition';
			if (temp.style[props] !== undefined) {
				return '-' + aPrefix[i].toLowerCase() + '-';
			}
		}
	})(document.createElement(pageScroll))

	var pageScroll = (function() {
		function pageScroll(element, options) {
			this.settings = $.extend(true, $.fn.pageScroll.defaults, options || {});
			this.element = element;
			this.init();
		}
		pageScroll.prototype = {
			/* 说明：初始化插件 */
			/* 实现：初始化dom结构，布局，分页及绑定事件 */
			init: function() {
				var me = this;
				me.selectors = me.settings.selectors;
				me.sections = me.element.find(me.selectors.sections);
				me.section = me.sections.find(me.selectors.section);

				me.direction = me.settings.direction == 'vertical' ? true : false;
				me.pagesCount = me.pagesCount();
				me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

				me.canScroll = true;

				if (!me.direction) {
					me._initLayout();
				}

				if (me.settings.paging) {
					me._initPaging();
				}

				me._initEvent();

				me._scrollPage();
				// console.log(me);
				console.log(me.section.eq(0).position());
				console.log(me.section.eq(1).position());
				console.log(me.section.eq(2).position());
				console.log(me.section.eq(3).position());
			},
			/* 说明：获取滑动页面数量 */
			pagesCount: function() {
				return this.section.length;
			},

			/* 说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动） */
			scrollLength: function() {
				return this.direction ? this.element.height() : this.element.width();
			},

			/* 说明：向前滑动即上一页 */
			prev: function() {
				var me = this;
				if (me.index > 0) {
					me.index--;
				} else if (me.settings.loop) {
					me.index = me.pagesCount - 1;
				}
				me._scrollPage();
			},

			/* 说明：向后滑动即下一页 */
			next: function() {
				var me = this;
				if (me.index < me.pagesCount - 1) {
					me.index++;
				} else if (me.settings.loop) {
					me.index = 0;
				}
				me._scrollPage();
			},

			/* 说明：主要针对横屏情况进行页面布局 */
			_initLayout: function() {
				var me = this;
				var width = (me.pagesCount * 100) + '%',
					cellWidth = (100 / me.pagesCount).toFixed(2) + '%';
				me.sections.width(width);
				me.section.width(cellWidth).css('float', 'left');
			},

			/* 说明：实现分页的dom结构及css样式 */
			_initPaging: function() {
				var me = this,
					pagesClass = me.selectors.pages.substring(1);
				me.activeClass = me.selectors.active.substring(1);

				var pageHtml = '<ul class="' + pagesClass + '">';
				for (var i = 0; i < me.pagesCount; i++) {
					pageHtml += '<li></li>';
				}
				pageHtml += '</ul>';
				me.element.append(pageHtml);

				var pages = me.element.find(me.selectors.pages);
				me.pageItem = pages.find('li');
				me.pageItem.eq(me.index).addClass(me.activeClass);
				// console.log(me.pageItem);

				if (me.direction) pages.addClass('vertical');
				else pages.addClass('horizontal');
			},

			/* 说明：初始化插件事件 */
			_initEvent: function() {
				var me = this;
				me.element.on('click', me.selectors.pages + ' li', function() {
					me.index = $(this).index();
					me._scrollPage();
				})

				me.element.on('mousewheel DOMMouseScroll', function(e) {
					if (me.canScroll) {
						var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
						if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
							me.prev();
						} else if (delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
							me.next();
						}
					}
				})

				if (me.settings.keyboard) {
					$(window).on('keydown', function(e) {
						var keyCode = e.keyCode;
						if (keyCode == 37 || keyCode == 38) {
							me.prev();
						} else if (keyCode == 39 || keyCode == 40) {
							me.next();
						}
					});
				}

				$(window).resize(function() {
					var currentLength = me.scrollLength(),
						offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
					if (Math.abs(offset) > currentLength / 2 && me.index < (me.pagesCount - 1)) {
						me.index++;
					}
					if (me.index) {
						me._scrollPage();
					}
				})

				me.sections.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function() {
					me.canScroll = true;
					if (me.settings.callback && $.type(me.settings.callback) == "function") {
						me.settings.callback();
					}
				});
			},
			/* 说明：滑动动画 */
			_scrollPage: function() {
				var me = this,
					dest = me.section.eq(me.index).position();
				if (!dest) return;
				console.log(me.index, dest);
				me.canScroll = false;

				if (_prefix) {
					me.sections.css(_prefix + 'transition', 'all ' + me.settings.duration + 'ms ' + me.settings.easing);
					var translate = me.direction ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
					me.sections.css(_prefix + 'transform', translate);
				} else {
					var animateCss = me.direction ? {
						top: -dest.top
					} : {
						left: -dest.left
					};
					me.sections.animate(animateCss, me.settings.duration, function() {
						me.canScroll = true;
						if (me.settings.callback && $.type(me.settings.callback) == "function") {
							me.settings.callback();
						}
					})
				}

				if (me.settings.paging) {
					me.pageItem.eq(me.index).addClass(me.activeClass).siblings('li').removeClass(me.activeClass);
				}
			}
		};
		return pageScroll;
	})();

	$.fn.pageScroll = function(options) {
		return this.each(function() {
			var me = $(this),
				instance = me.data("pageScroll");
			if (!instance) {
				instance = new pageScroll(me, options);
				me.data("pageScroll", instance);
			}

			if ($.type(options) === 'string') return instance[options]();
		});
	}

	$.fn.pageScroll.defaults = {
		selectors: {
			section: '.section',
			sections: '.sections',
			pages: '.pages',
			active: '.active'
		},
		paging: true,
		index: 0,
		easing: 'ease',
		duration: 500,
		loop: true,
		keyboard: true,
		direction: 'vertical',
		callback: null
	}
	$(function() {
		$("[data-pageScroll]").pageScroll({
			loop: true,
			direction: "horizontal",
			callback: function() {}
		});
	});
})(jQuery);