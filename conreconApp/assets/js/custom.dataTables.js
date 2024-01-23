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