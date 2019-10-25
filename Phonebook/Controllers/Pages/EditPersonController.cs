using Microsoft.AspNetCore.Mvc;
using Phonebook.ViewModels;

namespace Phonebook.Controllers.Pages
{
    public class EditPersonController : Controller
    {
        [HttpGet]
        [Route("/edit-person/{id}")]
        public IActionResult Index()
        {
            return View(new PageViewModel()
            {
                Title = "Edit person"
            });
        }
    }
}