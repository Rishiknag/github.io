new DataTable('#userTable, #userPowerAttorneyTable, #guardianTable', {
    processing: true,
    "destroy": true,
	"dom": '<"top"f>rt<"bottom"ilp>',
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		//"visible": false,
		"targets": [12]
	}],
});

new DataTable('#againstRegistrationViewTable', {
    processing: true,
    "destroy": true,
	"dom": '<"top"f>rt<"bottom"ilp>',
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		//"visible": false,
		"targets": [9]
	}],
});
new DataTable('#personDataTable', {
    processing: true,
    "destroy": true,
	"dom": '<"top"f>rt<"bottom"ilp>',
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		//"visible": false,
		"targets": [7]
	}],
});
new DataTable('#companyDataTable', {
	processing: true,
    "destroy": true,
	"dom": '<"top"f>rt<"bottom"ilp>',
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		//"visible": false,
		//"targets": [7]
	}],
});
new DataTable('#compliantRegViewTable', {
	processing: true,
    "destroy": true,
	"dom": '<"top"f>rt<"bottom"ilp>',
	"columnDefs": [{
		"searchable": false,
		"orderable": false,
		//"visible": false,
		"targets": [10]
	}],
});