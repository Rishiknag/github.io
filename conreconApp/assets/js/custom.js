window.onload = function () {
    $('.sw-theme-basic, #himSelf_li, #POA_li, #guardian_li, #company_li').hide();
    // Complaint Registration
    $('#husbands_li, #divorce_li, #custody_li, #selling_li, #land_li, #well_li, .others1_li').hide();
}
// Flat picker
$("[data-provider]").flatpickr({
    dateFormat: "d/m/Y",
    //"locale": "ar"
});
//Create new user form validation
$("#applicantType").on('change', function () {
    if (this.value == '1') {
        $('.nav-tabs-custom a[href="#himSelf"]').tab('show');
        $('.sw-theme-basic, #himSelf_li').show();
        $('#POA_li, #guardian_li, #company_li').hide();
    } else if (this.value == '2') {
        $('.nav-tabs-custom a[href="#POA"]').tab('show');
        $('.sw-theme-basic, #POA_li').show();
        $('#himSelf_li, #guardian_li, #company_li').hide();
    } else if (this.value == '3') {
        $('.nav-tabs-custom a[href="#guardian"]').tab('show');
        $('.sw-theme-basic, #guardian_li').show();
        $('#himSelf_li, #POA_li, #company_li').hide();
    } else if (this.value = '4') {
        $('.nav-tabs-custom a[href="#company"]').tab('show');
        $('.sw-theme-basic, #company_li').show();
        $('#himSelf_li, #POA_li, #guardian_li').hide();
    } else {
        $('.sw-theme-basic, #himSelf_li, #POA_li, #guardian_li, #company_li').hide();
    }
});

// Against Registration
$("#againstApplicantType").on('change', function () {
    if (this.value == '1') {
        $('.nav-tabs-custom a[href="#himSelf"]').tab('show');
        $('.sw-theme-basic, #himSelf_li').show();
        $('#company_li').hide();
    } else if (this.value = '4') {
        $('.nav-tabs-custom a[href="#company"]').tab('show');
        $('.sw-theme-basic, #company_li').show();
        $('#himSelf_li').hide();
    } else {
        $('.sw-theme-basic, #himSelf_li, #POA_li, #guardian_li, #company_li').hide();
    }
});

// Complaint Registration
$("#compliantSubType").on('change', function () {
    if (this.value == '1') {
        $('.nav-tabs-custom a[href="#husbands"]').tab('show');
        $('.sw-theme-basic, #husbands_li').show();
        $('#divorce_li, #custody_li, #selling_li, #land_li, #well_li, .others1_li').hide();
    } else if (this.value == '2') {
        $('.nav-tabs-custom a[href="#divorce"]').tab('show');
        $('.sw-theme-basic, #divorce_li').show();
        $('#husbands_li, #custody_li, #selling_li, #land_li, #well_li, .others1_li').hide();
    } else if (this.value == '3') {
        $('.nav-tabs-custom a[href="#custody"]').tab('show');
        $('.sw-theme-basic, #custody_li').show();
        $('#husbands_li, #divorce_li, #selling_li, #land_li, #well_li, .others1_li').hide();
    } else if (this.value == '4') {
        $('.nav-tabs-custom a[href="#selling"]').tab('show');
        $('.sw-theme-basic, #selling_li').show();
        $('#husbands_li, #divorce_li, #custody_li, #land_li, #well_li, .others1_li').hide();
    } else if (this.value == '5') {
        $('.nav-tabs-custom a[href="#land"]').tab('show');
        $('.sw-theme-basic, #land_li').show();
        $('#husbands_li, #divorce_li, #custody_li, #selling_li, #well_li, .others1_li').hide();
    } else if (this.value == '6') {
        $('.nav-tabs-custom a[href="#well"]').tab('show');
        $('.sw-theme-basic, #well_li').show();
        $('#husbands_li, #divorce_li, #custody_li, #selling_li, #land_li, .others1_li').hide();
    } else {
        $('.sw-theme-basic ,#husbands_li, #divorce_li, #custody_li, #selling_li, #land_li, #well_li, .others1_li').hide();
    }
});