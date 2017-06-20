$(function init() {
    //Alumnos
    var tblAlumnos;
    var tmpExcel = {};

    document.querySelector('input').addEventListener('change', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files;
        var i, f;
        //Poner Nombre y opcion de eliminar 
        var file = $('#fileArchivo');
        var tex = $('#txtNombreArchivo').html();
        if (this.files.length > 0) {
            $('#txtNombreArchivo').text(this.files[0].name);
            file.addClass('fileinput-exists').removeClass('fileinput-new');
            $('#fileArchivo span span').text('Cambiar');
            $('#btnclose').show();
        }
        else {
            $('#txtNombreArchivo').text('');
            file.removeClass('fileinput-exists').addClass('fileinput-new');
            $('#fileArchivo span span').text('Selecciona tu archivo de Excel a Subir');
            $('#btnclose').hide();
        }
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;

                /* if binary string, read with type 'binary' */
                var workbook = XLSX.read(data, { type: 'binary' });

                /* DO SOMETHING WITH workbook HERE */
                to_json(workbook);
            };
            reader.readAsBinaryString(f);
        }
    }, false);

    $('#fileArchivo a').click(function () {
        var file = $('#fileAlumnos');
        $('#txtNombreArchivo').text('');
        file.removeClass('fileinput-exists').addClass('fileinput-new');
        File[0] = null;
        $('#fileArchivo span span').text('Selecciona tu archivo de Excel a Subir');
        if (tblRegistros != null) { tblRegistros.fnClearTable(); tmpExcel = null; }
        $('#btnclose').hide();
    });

    function to_json(workbook) {
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                tmpExcel = roa;
            }
        });
        CrearTabla();
    }

    function CrearTabla() {
        if (tmpExcel.length > 0) {
            $('#divGuardar').show();
        } else { $('#divGuardar').hide(); }
        tblAlumnos = $('#tblAlumno').dataTable({
            "aaData": tmpExcel,
            "aoColumns": [
                { "mDataProp": "AlumnoId" },
                { "mDataProp": "Nombre" },
                { "mDataProp": "Paterno" },
                { "mDataProp": "Materno" },
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
    $('#btnGuardar').on('click', function () {
        if (tmpExcel.length > 0) {

        }
    });
});