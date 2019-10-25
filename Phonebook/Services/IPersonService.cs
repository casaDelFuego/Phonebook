using System.Collections.Generic;
using Phonebook.Models;

namespace Phonebook.Services
{
    public interface IPersonService
    {
        List<PersonModel> GetItems();

        void AddItem(PersonModel model);
        PersonModel GetItem(string id);
        void RemoveItem(string id);
        PersonModel UpdateItem(string id, PersonModel model);
    }
}