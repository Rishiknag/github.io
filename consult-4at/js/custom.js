function setREVStartSize(e) {
	//window.requestAnimationFrame(function() {
	window.RSIW = window.RSIW === undefined ? window.innerWidth : window.RSIW;
	window.RSIH = window.RSIH === undefined ? window.innerHeight : window.RSIH;
	try {
		var pw = document.getElementById(e.c).parentNode.offsetWidth,
			newh;
		pw = pw === 0 || isNaN(pw) ? window.RSIW : pw;
		e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
		e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
		e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
		e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
		e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
		e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
		e.mh = e.mh === undefined || e.mh == "" || e.mh === "auto" ? 0 : parseInt(e.mh, 0);
		if (e.layout === "fullscreen" || e.l === "fullscreen") newh = Math.max(e.mh, window.RSIH);
		else {
			e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
			for (var i in e.rl)
				if (e.gw[i] === undefined || e.gw[i] === 0) e.gw[i] = e.gw[i - 1];
			e.gh = e.el === undefined || e.el === "" || (Array.isArray(e.el) && e.el.length == 0) ? e.gh : e.el;
			e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
			for (var i in e.rl)
				if (e.gh[i] === undefined || e.gh[i] === 0) e.gh[i] = e.gh[i - 1];
			var nl = new Array(e.rl.length),
				ix = 0,
				sl;
			e.tabw = e.tabhide >= pw ? 0 : e.tabw;
			e.thumbw = e.thumbhide >= pw ? 0 : e.thumbw;
			e.tabh = e.tabhide >= pw ? 0 : e.tabh;
			e.thumbh = e.thumbhide >= pw ? 0 : e.thumbh;
			for (var i in e.rl) nl[i] = e.rl[i] < window.RSIW ? 0 : e.rl[i];
			sl = nl[0];
			for (var i in nl)
				if (sl > nl[i] && nl[i] > 0) {
					sl = nl[i];
					ix = i;
				}
			var m = pw > (e.gw[ix] + e.tabw + e.thumbw) ? 1 : (pw - (e.tabw + e.thumbw)) / (e.gw[ix]);
			newh = (e.gh[ix] * m) + (e.tabh + e.thumbh);
		}
		var el = document.getElementById(e.c);
		if (el !== null && el) el.style.height = newh + "px";
		el = document.getElementById(e.c + "_wrapper");
		if (el !== null && el) {
			el.style.height = newh + "px";
			el.style.display = "block";
		}
	} catch (e) {
		console.log("Failure at Presize of Slider:" + e)
	}
	//});
};
var elementorFrontendConfig = {
	"environmentMode": {
		"edit": false,
		"wpPreview": false,
		"isScriptDebug": false
	},
	"breakpoints": {
		"xs": 0,
		"sm": 480,
		"md": 768,
		"lg": 1025,
		"xl": 1440,
		"xxl": 1600
	},
	"responsive": {
		"breakpoints": {
			"mobile": {
				"label": "Mobile",
				"value": 767,
				"default_value": 767,
				"direction": "max",
				"is_enabled": true
			},
			"mobile_extra": {
				"label": "Mobile Extra",
				"value": 880,
				"default_value": 880,
				"direction": "max",
				"is_enabled": false
			},
			"tablet": {
				"label": "Tablet",
				"value": 1024,
				"default_value": 1024,
				"direction": "max",
				"is_enabled": true
			},
			"tablet_extra": {
				"label": "Tablet Extra",
				"value": 1200,
				"default_value": 1200,
				"direction": "max",
				"is_enabled": false
			},
			"laptop": {
				"label": "Laptop",
				"value": 1366,
				"default_value": 1366,
				"direction": "max",
				"is_enabled": false
			},
			"widescreen": {
				"label": "Widescreen",
				"value": 2400,
				"default_value": 2400,
				"direction": "min",
				"is_enabled": false
			}
		}
	},
	"is_static": false,
	"experimentalFeatures": {
		"e_dom_optimization": true,
		"e_optimized_assets_loading": true,
		"e_optimized_css_loading": true,
		"a11y_improvements": true,
		"additional_custom_breakpoints": true,
		"e_import_export": true,
		"e_hidden_wordpress_widgets": true,
		"landing-pages": true,
		"elements-color-picker": true,
		"favorite-widgets": true,
		"admin-top-bar": true
	},
	"urls": {},
	"settings": {
		"page": [],
		"editorPreferences": []
	},
	"kit": {
		"active_breakpoints": ["viewport_mobile", "viewport_tablet"],
		"global_image_lightbox": "yes",
		"lightbox_enable_counter": "yes",
		"lightbox_enable_fullscreen": "yes",
		"lightbox_enable_zoom": "yes",
		"lightbox_enable_share": "yes",
		"lightbox_title_src": "title",
		"lightbox_description_src": "description"
	}
};
var tpj = jQuery;
var revapi2;
if (window.RS_MODULES === undefined) window.RS_MODULES = {};
if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};
RS_MODULES.modules["revslider21"] = {
	once: RS_MODULES.modules["revslider21"] !== undefined ? RS_MODULES.modules["revslider21"].once : undefined,
	init: function() {
		window.revapi2 = window.revapi2 === undefined || window.revapi2 === null || window.revapi2.length === 0 ? document.getElementById("rev_slider_2_1") : window.revapi2;
		if (window.revapi2 === null || window.revapi2 === undefined || window.revapi2.length == 0) {
			window.revapi2initTry = window.revapi2initTry === undefined ? 0 : window.revapi2initTry + 1;
			if (window.revapi2initTry < 20) requestAnimationFrame(function() {
				RS_MODULES.modules["revslider21"].init()
			});
			return;
		}
		window.revapi2 = jQuery(window.revapi2);
		if (window.revapi2.revolution == undefined) {
			revslider_showDoubleJqueryError("rev_slider_2_1");
			return;
		}
		revapi2.revolutionInit({
			revapi: "revapi2",
			DPR: "dpr",
			sliderLayout: "fullwidth",
			visibilityLevels: "1240,1024,778,480",
			gridwidth: "1230,1024,778,480",
			gridheight: "760,760,700,700",
			lazyType: "smart",
			perspective: 600,
			perspectiveType: "global",
			editorheight: "760,760,700,700",
			responsiveLevels: "1240,1024,778,480",
			progressBar: {
				disableProgressBar: true
			},
			navigation: {
				wheelCallDelay: 1000,
				onHoverStop: false,
				arrows: {
					enable: true,
					style: "hesperiden",
					hide_onleave: true,
					left: {
						h_offset: 30
					},
					right: {
						h_offset: 30
					}
				}
			},
			parallax: {
				levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 30],
				type: "scroll",
				origo: "slidercenter",
				speed: 0
			},
			viewPort: {
				global: true,
				globalDist: "-200px",
				enable: false
			},
			fallbacks: {
				allowHTML5AutoPlayOnAndroid: true
			},
		});
	}
} // End of RevInitScript
NavbarSticky = function() {
	var t = $(".navbar-sticky"),
		o = 0,
		e = !1;
	t.length && (o = t.offset().top, $(window).on({
		scroll: function() {
			e = !0, setInterval(function() {
				e && (e = !1, function(t) {
					var e = $(window).scrollTop(),
						a = t.outerHeight();
					o + 200 < e ? (t.addClass("ct-header-elementor-sticky").removeClass("ct-header-elementor-main"), $("body").css("padding-top", a + "px")) : (t.removeClass("ct-header-elementor-sticky").addClass("ct-header-elementor-main"), $("body").css("padding-top", "0"))
				}(t))
			}, 250)
		}
	}))
}();