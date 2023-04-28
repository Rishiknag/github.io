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
/*---------------------------------------------------------------------
	Sticky Header Animation & Height
----------------------------------------------------------------------- */
function headerHeight() {
	var height = $(".navbar-sticky").height();
	$('.iq-height').css('height', height + 'px');
}
$(function() {
	var header = $(".navbar-sticky"),
		yOffset = 0,
		triggerPoint = 200;

	//headerHeight();

	$(window).resize(headerHeight);
	$(window).on('scroll', function() {

		yOffset = $(window).scrollTop();

		if (yOffset >= triggerPoint) {
			header.addClass("ct-header-elementor-sticky animated slideInDown").removeClass("ct-header-elementor-main");
		} else {
			header.removeClass("ct-header-elementor-sticky animated slideInDown").addClass("ct-header-elementor-main animated slideInUp");
		}

	});
});