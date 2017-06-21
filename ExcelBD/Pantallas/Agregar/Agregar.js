$(function init() {
    //Alumnos
    var tblAlumnos;
    // Variable en la cuar guadamos los datos del excel
    var tmpExcel = {};

    //Evento del Input
    document.querySelector('input').addEventListener('change', function (e) {
        tmpExcel = null;
        if (tblAlumnos !== undefined) {
            $(tblAlumnos[0]).dataTable().api().clear().draw();
        }
        e.stopPropagation();
        e.preventDefault();
        var files = e.target.files;
        var i, f;
        //Poner Nombre y opcion de eliminar 
        if (files.length ==0) {
            $('#lblNombre')[0].innerHTML = '';
            $('#divGuardar').hide();
        }
        //Ciclo para recorrer si hay mas archivos
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            $('#lblNombre')[0].innerHTML = name;
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

    //Funcion para convertir a Json 
    function to_json(workbook) {
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                tmpExcel = roa;
            }
        });
        CrearTabla();
    }

    //Cargamos los datos a la tabla
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