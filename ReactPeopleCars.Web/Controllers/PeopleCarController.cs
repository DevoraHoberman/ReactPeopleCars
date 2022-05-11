using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleCars.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleCarController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PeopleCarRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return people;
        }

        [Route("addperson")]
        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarRepo(_connectionString);
            repo.AddPerson(person);
        }

        [Route("getpersonbyid")]
        [HttpGet]
        public Person GetPerson(int id)
        {
            var repo = new PeopleCarRepo(_connectionString);
            return repo.GetPersonById(id);
        }


        [Route("addcar")]
        [HttpPost]
        public void AddCar(Car car)
        {
            var repo = new PeopleCarRepo(_connectionString);
            repo.AddCar(car);
        }

        [Route("getcars")]
        [HttpGet]
        public List<Car> GetCars(int id)
        {
            var repo = new PeopleCarRepo(_connectionString);
            return repo.GetCars(id);
        }

        [Route("deletecars")]
        [HttpPost]
        public void DeleteCars(Person person)
        {
            var repo = new PeopleCarRepo(_connectionString);
            repo.DeleteCars(person.Id);
        }
    }
}
