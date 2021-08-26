using System;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SendMail.Controllers
{
    [Route("api/[controller]")]
    public class SendMailController : Controller
    {
        public class datos
        {
            public string smtpServer { get; set; }
            public int puerto { get; set; }
            public string remitente { get; set; }
            public string password { get; set; }
            public bool encriptacion { get; set; }
            public bool formato { get; set; }
            public string destinatario { get; set; }
            public string asunto { get; set; }
            public string mensaje { get; set; }
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]datos objeto)
        {
            var destinatarios = objeto.destinatario.Split(';');
            try
            {
                SmtpClient smtp = new SmtpClient();
                smtp.Host = objeto.smtpServer;
                smtp.Port = objeto.puerto;
                smtp.UseDefaultCredentials = false;
                smtp.EnableSsl = objeto.encriptacion;
                smtp.Credentials = new NetworkCredential(objeto.remitente, objeto.password);
                MailMessage message = new MailMessage();
                message.From = new MailAddress(objeto.remitente);
                foreach (string destinatario in destinatarios)
                {
                    message.To.Add(new MailAddress(destinatario));
                }
                // message.ReplyToList.Add(new MailAddress(objeto.remitente));
                message.Subject = objeto.asunto;
                message.IsBodyHtml = objeto.formato;
                message.Body = objeto.mensaje;
                smtp.Send(message);
                return Ok(
                    new
                    {
                        status = "success",
                        mensaje = "El mensaje fue enviado correctamente"
                    });
            }
            catch (Exception ex)
            {
                return Ok(
                    new
                    {
                        status = "error",
                        mensaje = ex.Message
                    });
            }
        }
    }
}
