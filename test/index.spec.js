import app from "../src/app.js";
import request from "supertest";

describe("[GET] /task", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/task").send();
    expect(response.statusCode).toBe(200);
  });

  test("should response with an array ", async () => {
    const response = await request(app).get("/task").send({ title: "" });

    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("[POST] /task", () => {
  
  // *** first describe ***
  describe("given an array and description", () => {
    const newTask = {
      title: "Test task",
      description: "Test description",
    };

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/task").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    test("should response with a cotent-type: application/json in the header", async () => {
      const response = await request(app).post("/task").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with a task ID ", async () => {
      const response = await request(app).post("/task").send(newTask);

      expect(response.body.id).toBeDefined();
    });
  });


  // *** second describe *** 

  describe('when title and description is missing', ()=>{
    
   

  
    test('should response with a 400 status code', async()=>{

      const fields = [
        {},
        {title: 'Test Task'},
        {description: 'Test Description'}
      ]


      for(let body of fields){
    const response = await request(app).post('/task').send(body);
    expect(response.statusCode).toBe(400)
      }
  
  })

  })
});
