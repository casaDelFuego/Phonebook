using Microsoft.AspNetCore.Mvc;
using Phonebook.ViewModels;

namespace Phonebook.Controllers.Pages
{
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View(new PageViewModel()
            {
                Title = "Phonebook"
            });
        }
                
    }
}