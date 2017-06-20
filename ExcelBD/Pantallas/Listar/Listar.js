$(function init() {
    tblAlumnos;
    traerAlumnos();
    function traerAlumnos() {
        $.ajax({
            type: "GET",
            url: "/Api/Alumnos",
            data: "",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    PintarTabla(data);
                }
            }
        });
    }

    function PintarTabla(tabla) {
        tblAlumnos = $('#tblAlumno').dataTable({
            "aaData": tabla,
            "aoColumns": [
                { "mDataProp": "AlumnoId" },
                { "mDataProp": "Nombre" },
                { "mDataProp": "Paterno" },
                { "mDataProp": "Materno" },
                { "mDataProp": "FechaRegistro" },
            ],
            "lengthMenu": [[10, 50, 100, -1], [10, 50, 100, 'Todos']],
            "searching": true,
            "ordering": true,
            "info": false,
            "async": true,
            "bDestroy": true,
            "language": {
                "lengthMenu": "_MENU_  Registros",
                "paginate": {
                    "previous": "Anterior",
                    "next": "Siguiente"
                },
                "search": "Buscar Alumnos ",
            },
            "order": [[1, "desc"]]
        });
    }

    $('#btnActualizar').on('click', function () {
        traerAlumnos();
    });
});