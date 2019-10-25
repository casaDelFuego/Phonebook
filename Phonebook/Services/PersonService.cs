using System.Collections.Generic;
using Phonebook.Models;

namespace Phonebook.Services
{
    public class PersonService : IPersonService
    {
        private readonly List<PersonModel> _listOfPeople = new List<PersonModel>();

        public PersonService()
        {
            _listOfPeople.Add(new PersonModel()
            {
                Id = "test",
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = 0707111111,
                Address = "Kungsgatan 50",
                Email = "hello@ourstudio.se"
            });
        }
        
        public List<PersonModel> GetItems()
        {
            return _listOfPeople;
        }

        public PersonModel GetItem(string id)
        {
            return _listOfPeople.Find(p => p.Id == id);
        }
        
        public void AddItem(PersonModel model)
        {
            _listOfPeople.Add(model);
        }

        public PersonModel UpdateItem(string id, PersonModel model)
        {
            /*var element = GetItem(id);
            model.Id = element.Id;
            
            RemoveItem(id);
            AddItem(model);*/
            var element = GetItem(id);
             element.Address = model.Address;
             element.Email = model.Email;
             element.FirstName = model.FirstName;
             element.LastName = model.LastName;
             element.PhoneNumber = model.PhoneNumber;
             return element;
        }
        
        public void RemoveItem(string id)
        {
            _listOfPeople.Remove(GetItem(id));
            
        }
    }
}