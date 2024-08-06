/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);

!function(e){e.fn.checkAll=function(c){var c=e.extend({scope:".group-allcheck-wrap",onMasterClick:null,onScopeChange:null},c);return this.each(function(){var n=e(this),o=c.scope instanceof jQuery?c.scope:n.closest(c.scope);n.on("click",function(e){n.is(":checked")?o.find('input[type="checkbox"]').not(n).prop("checked",!0).trigger("change"):o.find('input[type="checkbox"]').not(n).prop("checked",!1).trigger("change"),"function"==typeof c.onMasterClick&&c.onMasterClick(n,o)}),o.on("change",'input[type="checkbox"]',function(t){var i=e(this);if(!i.is(n))return"function"==typeof c.onScopeChange&&c.onScopeChange(n,i,o),i.is(":checked")?void(0===o.find('input[type="checkbox"]').not(n).not(":checked").length&&n.prop("checked",!0)):void n.prop("checked",!1)})})}}(jQuery);

$(document).ready(function() {
	var scr = '';
	$(window).scrollTop(0);

	$('button.btn_menu').on('click',function(e){
		$('.nav_menu').removeClass('off').addClass('on');
		src = $('body,html').scrollTop();
		$('body,html').addClass('lockscroll').animate({ scrollTop: 0 }, 0);
	});

	$('button.btn_close').on('click',function(e){
		$('.nav_menu').removeClass('on').addClass('off');
		$('body,html').removeClass('lockscroll').animate({ scrollTop: src }, 0);
	});
	
	$(".menu_wrap button").on('click',function() {
		let isOpen = $(this).next(".sub_menu").is(":visible");

		$(".menu_wrap li").removeClass('on');
		$(".menu_wrap .sub_menu").hide();

		if(isOpen){
			$(this).next(".sub_menu").slideUp("fast").parent().removeClass('on');
		} else {
			$(this).next(".sub_menu").slideToggle("fast").parent().addClass('on');
		}
	});
	if ($('#t2').length > 0 ){
		$('#t2').animate({ scrollLeft: $('#t2').find('.on').offset().left }, 0);
	}

	/*
	if ($('#t1').length > 0 ){
		$('#t1').animate({ scrollLeft: $('#t1').find('.on').offset().left }, 0);
	}
	*/

	animateElementInScreen();
	window.addEventListener('scroll', function(){
		animateElementInScreen();
	})

});

function animateElementInScreen() {
	let view_top = $(window).scrollTop();
	let view_height = $(window).height();

	$('.effect_in-screen').each(function(_, el){
		let _el = $(el);
		if(_el.hasClass('animate__animated') || _el.hasClass('animate__animating')) return true;

		let parent = _el.data('parent');
		let delay = _el.data('delay');
		let animation = _el.data('animation');
		if(parent) {
			parent = $(parent);
		} else {
			parent = _el;
		}
		
		let top = parent.offset().top;
		let height = parent.height();

		if(view_top + view_height < top + height / 2) return true;
		
		if(delay) {
			_el.addClass('animate__animating');
			setTimeout(() => {
				_el.addClass(animation || '');
				_el.addClass('animate__animated');	
			}, delay);
		} else {
			_el.addClass(animation || '');
			_el.addClass('animate__animated');
		}
	});
}

function lyClose(el){
	$(el).hide();
}
function lyOpen(el){
	$(el).show();
}
