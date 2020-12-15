using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] // DataAnnotation
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}