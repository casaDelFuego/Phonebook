using Microsoft.AspNetCore.Mvc;
using Phonebook.ViewModels;

namespace Phonebook.Controllers.Pages
{
    public class AddPersonController : Controller
    {
        [HttpGet]
        [Route("/add-person")]
        public IActionResult Index()
        {
            return View(new PageViewModel()
            {
                Title = "Add person"
            });
        }
    }
}