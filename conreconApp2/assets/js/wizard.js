function onFinish() {
	alert('Finish Clicked');
}

function onCancel() {
	$('#smartwizard').smartWizard("reset");
}
$(function() {
	// Step show event
	$("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection, stepPosition) {
		$("#prev-btn").removeClass('disabled').prop('disabled', false);
		$("#next-btn").removeClass('disabled').prop('disabled', false);
		if (stepPosition === 'first') {
			$("#prev-btn").addClass('disabled').prop('disabled', true);
            $("#btnSubmit").hide();
		} else if (stepPosition === 'last') {
            $("#btnSubmit").show();
			$("#next-btn").addClass('disabled').prop('disabled', true);
		} else {
			$("#prev-btn").removeClass('disabled').prop('disabled', false);
			$("#next-btn").removeClass('disabled').prop('disabled', false);
            $("#btnSubmit").hide();
		}
		// Get step info from Smart Wizard
		let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
		$("#sw-current-step").text(stepInfo.currentStep + 1);
		$("#sw-total-step").text(stepInfo.totalSteps);
	});
	$("#smartwizard").on("initialized", function(e) {
		console.log("initialized");
	});
	$("#smartwizard").on("loaded", function(e) {
		console.log("loaded");
	});
	// Smart Wizard
	$('#smartwizard').smartWizard({
		selected: 0,
		autoAdjustHeight: false,
		theme: 'basic', // basic, arrows, square, round, dots
        enableUrlHash: false,
		transition: {
			animation: 'slideSwing' // none|fade|slideHorizontal|slideVertical|slideSwing|css
		},
		toolbar: {
			showNextButton: true, // show/hide a Next button
			showPreviousButton: true, // show/hide a Previous button
			position: 'bottom', // none/ top/ both bottom
			extraHtml: `<button class="btn btn-success float-start me-1" id="btnSave"">Save</button>
						<button class="btn btn-danger float-start" id="btnSubmit" onclick="onFinish()">Submit</button>`
		},
		anchor: {
			enableNavigation: true, // Enable/Disable anchor navigation 
			enableNavigationAlways: true, // Activates all anchors clickable always
			enableDoneState: true, // Add done state on visited steps
			markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
			unDoneOnBackNavigation: false, // While navigate back, done state will be cleared
			enableDoneStateNavigation: true // Enable/Disable the done state navigation
		},
		disabledSteps: [], // Array Steps disabled
		errorSteps: [], // Highlight step with errors
		hiddenSteps: [], // Hidden steps
		// getContent: (idx, stepDirection, selStep, callback) => {
		//   console.log('getContent',selStep, idx, stepDirection);
		//   callback('<h1>'+idx+'</h1>');
		// }
	});
	$.fn.smartWizard.transitions.myFade = (elmToShow, elmToHide, stepDirection, wizardObj, callback) => {
		if (!$.isFunction(elmToShow.fadeOut)) {
			callback(false);
			return;
		}
		if (elmToHide) {
			elmToHide.fadeOut(wizardObj.options.transition.speed, wizardObj.options.transition.easing, () => {
				elmToShow.fadeIn(wizardObj.options.transition.speed, wizardObj.options.transition.easing, () => {
					callback();
				});
			});
		} else {
			elmToShow.fadeIn(wizardObj.options.transition.speed, wizardObj.options.transition.easing, () => {
				callback();
			});
		}
	}
	$("#state_selector").on("change", function() {
		$('#smartwizard').smartWizard("setState", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
		return true;
	});
	$("#style_selector").on("change", function() {
		$('#smartwizard').smartWizard("setStyle", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
		return true;
	});
});