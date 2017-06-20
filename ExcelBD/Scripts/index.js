$(function init() {
    $('#btnAgregar').on('click', function (a,s) {
        $('#Load').empty();
        var url = $(this).attr("href");
        $('#Load').load(url);
        return false;
    });
    $('#btnLista').on('click', function () {
        $('#Load').empty();
        var url = $(this).attr("href");
        $('#Load').load(url);
        return false;
    });
});