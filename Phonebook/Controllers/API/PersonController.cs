using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Phonebook.Models;
using Phonebook.Services;

namespace Phonebook.Controllers.API
{
    public class PersonController : Controller
    {
        private readonly IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        [Route("/api/list-of-people")]
        public async Task<IActionResult> ShowListOfPeople ()
        {
            var items = _personService.GetItems();
            
            return new OkObjectResult(items);           
        }
        
        [HttpGet]
        [Route("/api/single-person/{id}")]
        public async Task<IActionResult> ShowSinglePerson([FromRoute] string id) //http://localhost:5000/api/single-person?id=foobar  http://localhost:5000/api/single-person/23123123
        {
            var item = _personService.GetItem(id);
            
            return new OkObjectResult(item);           
        }

        [HttpPost]
        [Route("/api/add-person")]
        public async Task<IActionResult> AddPerson([FromBody] PersonModel model)
        {
            _personService.AddItem(model);
            return new ObjectResult(model);
        }
        
        [HttpPut]
        [Route("/api/edit-person/{id}")]
        public async Task<IActionResult> UpdatePerson([FromBody] PersonModel model, [FromRoute] string id)
        {
            var newPerson = _personService.UpdateItem(id, model);
            return new ObjectResult(model);
        }
        
        [HttpDelete]
        [Route("/api/delete-person/{id}")]
        public async Task<IActionResult> RemovePerson ([FromRoute] string id)
        {
             _personService.RemoveItem(id);
             return Ok();
        }
    }
}