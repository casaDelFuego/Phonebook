using Microsoft.AspNetCore.Mvc;

namespace Phonebook.Controllers.Pages
{
    public class ListAllController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
                
    }
}