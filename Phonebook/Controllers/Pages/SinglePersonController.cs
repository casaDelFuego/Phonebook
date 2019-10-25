using Microsoft.AspNetCore.Mvc;
using Phonebook.ViewModels;

namespace Phonebook.Controllers.Pages
{
    public class SinglePersonController : Controller
    {
        [HttpGet]
        [Route("/single-person/{id}")]
        public IActionResult Index([FromRoute] string id)
        {
            return View(new PageViewModel()
            {
                Title = "A person"
            });
        }
    }
}