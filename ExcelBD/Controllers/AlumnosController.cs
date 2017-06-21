using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ExcelBD.Models;

namespace ExcelBD.Controllers
{
    public class AlumnosController : ApiController
    {
        private ExcelDBEntities db = new ExcelDBEntities();

        // GET: api/Alumnos
        public IQueryable<Alumnos> GetAlumnos()
        {
            return db.Alumnos;
        }

        [HttpPost]
        [ResponseType(typeof(Alumnos))]
        public IHttpActionResult PostAlumnos([FromBody] List<Alumnos> ListaAlumnos)
        {
            try
            {
                List<Alumnos> AlumnosFallidos = new List<Alumnos>();
                ListaAlumnos.ForEach(alumno =>
                {
                    if (db.Alumnos.Where(al => al.AlumnoId == alumno.AlumnoId).FirstOrDefault() == null)
                    {
                        db.Alumnos.Add(new Alumnos
                        {
                            AlumnoId = alumno.AlumnoId,
                            FechaRegistro = DateTime.Now,
                            HoraRegistro = DateTime.Now.TimeOfDay,
                            Materno = alumno.Materno,
                            Nombre = alumno.Nombre,
                            Paterno = alumno.Paterno
                        });
                    }
                    else
                    {
                        AlumnosFallidos.Add(alumno);
                    }                 
                });
                db.SaveChanges();
                return Ok(AlumnosFallidos);
            }
            catch
            {
                return (null);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AlumnosExists(string id)
        {
            return db.Alumnos.Count(e => e.AlumnoId == id) > 0;
        }
    }
}