const request = require("supertest");
const { Habit } = require("../../models/habit")

let server; 

describe("/api/habit", () => {
  beforeEach(() => { server = require("../../../index"); })
  afterEach(async () => { 
    server.close(); 
    await Habit.remove({});
  });

  describe("GET /", () => {
    it("Should return all habits", async () => {
      await Habit.collection.insertMany([
        { action: "habit1" },
        { action: "habit2" },
      ])
      const res = await request(server).get("/api/habit")

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(h => h.action === "habit1")).toBeTruthy();
      expect(res.body.some(h => h.action === "habit2")).toBeTruthy();
    })
  })

  describe("GET /:id", () => {
    it("Should return a habit if valid id is passed", async () => {
      const habit = new Habit({ action: "habit1" });
      await habit.save();

      const res = await request(server).get("/api/habit/" + habit._id)

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("action", habit.action);
    })

    it("Should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/habit/1")

      expect(res.status).toBe(404);
    })

    it("Should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/habit/1")

      expect(res.status).toBe(404);
    })
  })

})