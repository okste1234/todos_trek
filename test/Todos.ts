import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("ToDoTrek", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTodosFixture() {
    const Todos = await ethers.getContractFactory("Todos");
    const {createTodo, deleteTodo, getAllTodos, todos,updateTodo, toggleTodo} = await Todos.deploy();

    return { createTodo, deleteTodo, getAllTodos, todos,updateTodo, toggleTodo};
  }

  describe("Create an instance of todos Array", function () {
    it("Should create todo with name, and desc, and check if the name & description are properly set in our array struct", async function () {
      const { createTodo, todos, getAllTodos } = await loadFixture(deployTodosFixture);

      const tx = await createTodo("game", "I will play game by morning");
      const list = await getAllTodos();
      const todoTitle = list[list.length - 1][0];
      const todoDesc = list[list.length - 1][1];
      expect(todoTitle).to.equal("game");
      expect(todoDesc).to.equal("I will play game by morning");
    });

    it("Should pass on revertedWith if todos[index] to delete >= than todos.lenght", async function () {
      const { deleteTodo, createTodo, todos } = await loadFixture(deployTodosFixture);
      const setValue = await createTodo("eat", "I will eat rice later today")
      const index = 2;
      const deleteVal = deleteTodo(index);
        
      await expect(deleteVal).to.be.revertedWith("Index out of bounds");
    });

    it("Should pass on revertedWith if todos[index] to toggle >= than todos.lenght", async function () {
      const { toggleTodo, createTodo, todos } = await loadFixture(deployTodosFixture);
      const setValue = await createTodo("eat", "I will eat rice later today")
      const index = 1;
      const toggleVal = toggleTodo(index);
        
      await expect(toggleVal).to.be.revertedWith("Index out of bounds");
    });

    it("Should test that todo has completed; isDone has changed to true on toggle", async function () {
      const { toggleTodo, createTodo, getAllTodos, todos } = await loadFixture(deployTodosFixture);
      const setValue = await createTodo("eat", "I will eat rice later today");
      const toggle = await toggleTodo(todos.length);      
      const list = await getAllTodos();  
      const val = list[list.length - 1][2];
      expect(val).to.equal(true);
    });
  });
  
   it("Should check the length of the todos is equal to num of todos set", async function () {
      const { getAllTodos, createTodo } = await loadFixture(deployTodosFixture);
      const setValue = await createTodo("eat", "I will eat rice later today")
      const setValue2 = await createTodo("fishing", "I will go fishing on Saturday")

      const alltodo = await getAllTodos()
        
      expect(alltodo).to.lengthOf(2);
    });
  })
