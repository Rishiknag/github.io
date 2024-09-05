$("#requestTypeBtn, #hs_details").hide();
for (var i = new Date().getFullYear(); i > 1999; i--) {
	$('#selectYear').append($('<option />').val(i).html(i));
}
// Flat picker
$("[data-provider]").flatpickr({
	dateFormat: "d/m/Y",
	//mode: "range",
	//"locale": "ar"
});
$(document).ready(function () {
	$('.multiSelect').multiselect({
		enableFiltering: true,
		includeSelectAllOption: true,
		maxHeight: 400,
		dropUp: true,
		nonSelectedText: 'Please select',
	});
	new DataTable('#dataTableMajor', {
		"dom": '<"top"f>rt<"bottom"ilp>',
	});
	new DataTable('#municipalLicenseTable1', {
		"dom": '<"top"f>rt<"bottom"ilp>',
	})
	var municipalLicenseTable = new DataTable('#municipalLicenseTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: caseSubType_txt,
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: caseSubType_txt,
			orientation: 'portrait', //portrait
			pageSize: 'A4', //A3 , A5 , A6 , legal , letter
			exportOptions: {
				//columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				columns: ":not(.noExport)",
				rows: ':visible',
				search: 'applied',
				order: 'applied'
			},
			customize: function (doc) {
				//Remove the title created by datatTables
				doc.content.splice(0, 1);
				//Create a date string that we use in the footer. Format is dd-mm-yyyy
				var now = new Date();
				var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
				// So we use a online converter and paste the string in.
				// Done on http://codebeautify.org/image-to-base64-converter
				// It's a LONG string scroll down to see the rest of the code !!!
				var logo = '';
				// A documentation reference can be found at
				// https://github.com/bpampuch/pdfmake#getting-started
				// Set page margins [left,top,right,bottom] or [horizontal,vertical]
				// or one number for equal spread
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 11;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 11;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'left',
							bold: true,
							text: caseSubType_txt,
							fontSize: 16,
							margin: [10, 0]
						},
						//  {
						// 	image: logo,
						// 	width: 35,
						// 	height: 35,
						// 	margin: [10, 0],
						// 	alignment: 'center',
						// }, 
						{
							alignment: 'right',
							fontSize: 14,
							text: ''
						}
						],
						margin: 20
					}
				});
				// Create a footer object with 2 columns
				// Left side: report creation date
				// Right side: current page and total pages
				doc['footer'] = (function (page, pages) {
					return {
						columns: [{
							alignment: 'left',
							text: ['Printed By: ', {
								text: jsDate.toString()
							}]
						}, {
							alignment: 'right',
							text: ['page ', {
								text: page.toString()
							}, ' of ', {
									text: pages.toString()
								}]
						}],
						margin: 20
					}
				});
				// Change dataTable layout (Table styling)
				// To use predefined layouts uncomment the line below and comment the custom lines below
				//doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
				var objLayout = {};
				objLayout['hLineWidth'] = function (i) {
					return .5;
				};
				objLayout['vLineWidth'] = function (i) {
					return .5;
				};
				objLayout['hLineColor'] = function (i) {
					return '#000';
				};
				objLayout['vLineColor'] = function (i) {
					return '#000';
				};
				objLayout['paddingLeft'] = function (i) {
					return 4;
				};
				objLayout['paddingRight'] = function (i) {
					return 4;
				};
				doc.content[0].layout = objLayout;
			}
		}, {
			extend: 'excel',
			title: 'Service Activities Report',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'ServiceActivities',
			orientation: 'landscape', //portrait
			pageSize: 'A4', //A3 , A5 , A6 , legal , letter
			exportOptions: {
				//columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				columns: ":not(.noExport)",
				rows: ':visible',
				search: 'applied',
				order: 'applied'
			}
		}, {
			extend: 'print',
			orientation: 'landscape', //portrait
			pageSize: 'A4', //A3 , A5 , A6 , legal , letter
			text: '<i class="fa fa-print fa-lg fa-fw text-primary" aria-hidden="true"></i>',
			titleAttr: 'Print',
			className: 'btn btn-primary',
			messageTop: function () {
				printCounter++;
				if (printCounter === 1) {
					return 'This is the first time you have printed this document.';
				} else {
					return ('You have printed this document ' + printCounter + ' times');
				}
			},
			messageBottom: null,
			exportOptions: {
				//columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				columns: ":not(.noExport)",
				rows: ':visible',
				search: 'applied',
				order: 'applied'
			},
		}]
	});
	$('#export').on('click', function () {
		municipalLicenseTable.button(0).trigger();
	});
	$('#excel').on('click', function () {
		municipalLicenseTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		municipalLicenseTable.button(1).trigger();
	});
});
var caseSubType_txt;
$("#caseSubTypeId").change(function () {
	var caseSubType = $(this).val();
	caseSubType_txt = $("#caseSubTypeId option:selected").text();
	$(".txtSelect").text(caseSubType_txt);
	if (caseSubType == '') {
		$("#requestTypeBtn, #hs_details, #export").hide();
	} else {
		$("#requestTypeBtn, #generateReportBtn").show();
		$("#export, #hs_details").hide();
	}
});

$("#generateReportBtn").click(function () {
	$(this).hide();
	$("#hs_details, #export").show();
});


$(document).ready(function() {
	$('#governorateID').on('change', function() {
        //alert($(this).find(":selected").val());
        $('#incidentLocation').find('option').remove().end().append('<option value="">Please select</option>').val('').trigger('change');
        //$('#incidentLocation').multiselect('refresh');
        var storedata;
        if ($(this).find(":selected").val() == "1") {
            //alert("1");
            storedata = [{
                value: '1',
                text: 'Muscat'
            }, {
                value: '2',
                text: 'Bosher'

            }, {
                value: '3',
                text: 'Qurayyat'
            }, {
                value: '4',
                text: 'Seeb'

            }, {
                value: '5',
                text: 'Al-Amirat'

            }, {
                value: '6',
                text: 'Muttarah'

            }];
            $.each(storedata, function(index, value) {
                $('#incidentLocation').append($('<option>', {
                    value: value.value,
                    text: value.text
                })).trigger('change');
            });
        } else if ($(this).find(":selected").val() == "2") {
            //alert("2");
            storedata = [{
                value: '7',
                text: 'Al-Rustaq'
            }, {
                value: '8',
                text: 'Al-Awabi'
            }, {
                value: '9',
                text: 'AL-Mansna'
            }, {
                value: '10',
                text: 'Barka'
            }, {
                value: '11',
                text: 'Nakahl'
            }, {
                value: '12',
                text: 'Wadi Al-Muwawal'
            }];
            $.each(storedata, function(index, value) {
                $('#incidentLocation').append($('<option>', {
                    value: value.value,
                    text: value.text
                })).trigger('change');
            });
        } else if ($(this).find(":selected").val() == "3") {
            //alert("3");
            storedata = [{
                value: '13',
                text: 'Al-Khaboura'
            }, {
                value: '14',
                text: 'Al-Suwaiq'
            }, {
                value: '15',
                text: 'Lewa'
            }, {
                value: '16',
                text: 'Saham'
            }, {
                value: '17',
                text: 'Shinas'
            }, {
                value: '18',
                text: 'Sohar'
            }];
            $.each(storedata, function(index, value) {
                $('#incidentLocation').append($('<option>', {
                    value: value.value,
                    text: value.text
                })).trigger('change');
            });
        } 
    });
});