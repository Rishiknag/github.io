//
$(".major_details, .minor_details, .drilling_details, .all_details, .servicesConnection, .buildingDemolition").hide();
//Button Hide
$("#requestTypeBtn, #servicesConnectionBtn").hide();
//Table Hide
$("#ts_details, #ts_info").hide();
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
	//Major Table
	var majorTable = new DataTable('#majorTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'Major Permit Report',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'majorPermitReport',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'center',
							bold: true,
							text: 'Major Permit Report',
							fontSize: 16,
							margin: [10, 0]
						}, {
							alignment: 'right',
							fontSize: 14,
							text: ''
						}],
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
			title: 'Major Permit Report',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'majorPermitReport',
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
	$('#majorPdf').on('click', function () {
		majorTable.button(0).trigger();
	});
	$('#majorExcel').on('click', function () {
		majorTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		majorTable.button(1).trigger();
	});

	//Minor Table
	var minorTable = new DataTable('#minorTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'Minor Permit Report',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'minorPermitReport',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'left',
							bold: true,
							text: 'Minor Permit Report',
							fontSize: 16,
							margin: [10, 0]
						}, {
							alignment: 'right',
							fontSize: 14,
							text: ''
						}],
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
			title: 'Minor Permit Report',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'minorPermitReport',
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
	$('#minorPdf').on('click', function () {
		minorTable.button(0).trigger();
	});
	$('#minorExcel').on('click', function () {
		minorTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		minorTable.button(1).trigger();
	});

	// Drilling Table
	var drillingTable = new DataTable('#drillingTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'Drilling Permit Report',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'drillingPermitReport',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'left',
							bold: true,
							text: 'Drilling Permit Report',
							fontSize: 16,
							margin: [10, 0]
						}, {
							alignment: 'right',
							fontSize: 14,
							text: ''
						}],
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
			title: 'Drilling Permit Report',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'drillingPermitReport',
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
	$('#drillingPdf').on('click', function () {
		drillingTable.button(0).trigger();
	});
	$('#drillingExcel').on('click', function () {
		drillingTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		drillingTable.button(1).trigger();
	});

	// All Table
	var allTable = new DataTable('#allTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'All Permits Report',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'allPermitReport',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'center',
							bold: true,
							text: 'All Permits Report',
							fontSize: 16,
							margin: [10, 0]
						}, {
							alignment: 'right',
							fontSize: 14,
							text: ''
						}],
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
			title: 'All Permits Report',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'allTable',
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
	$('#allPdf').on('click', function () {
		allTable.button(0).trigger();
	});
	$('#allExcel').on('click', function () {
		allTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		allTable.button(1).trigger();
	});
	
	//Services Connection Table
	var servicesConnectionTable = new DataTable('#servicesConnectionTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'Services Connection / WCC',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'servicesConnection',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'center',
							bold: true,
							text: 'Services Connection / WCC',
							fontSize: 16,
							margin: [10, 0]
						}, {
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
			title: 'Services Connection / WCC',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'servicesConnection',
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
	$('#servicePdf').on('click', function () {
		servicesConnectionTable.button(0).trigger();
	});
	$('#serviceExcel').on('click', function () {
		servicesConnectionTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		servicesConnectionTable.button(1).trigger();
	});

	//Building Demolition Table
	var buildingDemolitionTable = new DataTable('#buildingDemolitionTable', {
		dom: '<"top"f>rt<"bottom"ilp>',
		info: false,
		ordering: false,
		paging: false,
		"buttons": [{
			extend: 'pdfHtml5',
			title: 'Building Demolition',
			text: '<i class="fal fa-file-pdf fa-lg fa-fw text-danger"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'buildingDemolition',
			orientation: 'landscape', //portrait
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
				// It's important to create enough space at the top for a header !!!
				doc.pageMargins = [20, 60, 20, 30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				doc['header'] = (function () {
					return {
						columns: [{
							alignment: 'center',
							bold: true,
							text: 'Building Demolition',
							fontSize: 16,
							margin: [10, 0]
						}, {
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
			title: 'Building Demolition',
			text: '<i class="fal fa-file-xls fa-lg fa-fw text-success"></i>',
			className: 'btn btn-danger btn-md px-2 mr-1',
			filename: 'buildingDemolition',
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
	$('#buildingDemolitionPdf').on('click', function () {
		buildingDemolitionTable.button(0).trigger();
	});
	$('#buildingDemolitionExcel').on('click', function () {
		buildingDemolitionTable.button(1).trigger();
	});
	$('#print').on('click', function () {
		buildingDemolitionTable.button(1).trigger();
	});
});
$("#caseSubTypeId").change(function () {
	var caseSubType = $(this).val();
	var caseSubType_txt = $("#caseSubTypeId option:selected").text();
	$(".txtSelect").text(caseSubType_txt);
	// if (caseSubType == 10369 || caseSubType == 10370) {
	// 	$("#requestTypeBtn, #ts_details1, #generateReportBtn").show();
	// 	$("#servicesConnectionBtn, #ts_info, #export, #exportBtn, #generateReportServiceBtn").hide();
	// } else if (caseSubType == 11890) {
	// 	$("#requestTypeBtn, #ts_details, #export, #exportBtn, #generateReportBtn").hide();
	// 	$("#servicesConnectionBtn, #ts_info1, #generateReportServiceBtn").show()
	// } else {
	// 	$("#requestTypeBtn, #servicesConnectionBtn, #ts_details, #ts_info, #export, #exportBtn").hide();
	// }
	if (caseSubType == 10369) { // Major
		$(".major_details").show();
		$(".minor_details, .drilling_details, .all_details, .servicesConnection, .buildingDemolition").hide();
	} else if (caseSubType == 10370) { // Minor
		$(".minor_details").show();
		$(".major_details, .drilling_details, .all_details, .servicesConnection, .buildingDemolition").hide();
	} else if (caseSubType == 11891) { // Drilling
		$(".drilling_details").show();
		$(".major_details, .minor_details, .all_details, .servicesConnection, .buildingDemolition").hide();
	} else if (caseSubType == 11890) { // Services Connection / WCC
		$(".servicesConnection").show();
		$(".major_details, .minor_details, .drilling_details, .all_details, .buildingDemolition").hide();
	} else if (caseSubType == 11892) { // All
		$(".all_details").show();
		$(".major_details, .minor_details, .drilling_details, .servicesConnection, .buildingDemolition").hide();
	} else if (caseSubType == 11893) { // Building Demolition
		$(".buildingDemolition").show();
		$(".major_details, .minor_details, .drilling_details, .all_details, .servicesConnection").hide();
	} else {
		$(".major_details, .minor_details, .drilling_details, .all_details, .servicesConnection, .buildingDemolition").hide();
	}
});

$("#generateReportBtn").click(function () {
	$(this).hide();
	$("#ts_details, #export").show();
	$("#ts_info").hide();
});

$("#generateReportServiceBtn").click(function () {
	$(this).hide();
	$("#ts_details").hide();
	$("#ts_info, #exportBtn").show();
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