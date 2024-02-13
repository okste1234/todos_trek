import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { title } from "process";
import { todo } from "node:test";


describe("ToDoTrek", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTodosFixture() {
    const Todos = await ethers.getContractFactory("Todos");
    const {createTodo, deleteTodo, getAllTodos, todos,updateTodo, toggleTodo,} = await Todos.deploy();

    return { createTodo, deleteTodo, getAllTodos, todos,updateTodo, toggleTodo};
  }

  describe("Create an instance of todos Array", function () {
    it("Should create todo with name, and desc, and check if the name & description are properly set in our array struct", async function () {
      const { createTodo, todos, getAllTodos } = await loadFixture(deployTodosFixture);

      const tx = await createTodo("game", "I will play game by morning");
      const list = await getAllTodos()
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        
        expect(element.title).to.equal("game");
        expect(element.description).to.equal("I will play game by morning");

      }
      // const newTodoName = todos[todos.length -1].title;
      // expect(newTodoName).to.equal("game");
    });

    it("Should revert with an error if todos[index] to delete > than todos.lenght", async function () {
      const { deleteTodo, createTodo } = await loadFixture(deployTodosFixture);
      const setValue = await createTodo("eat", "I will eat rice later today")
      const index = 2
      const deleteVal = deleteTodo(index);
        
      await expect(deleteVal).to.be.revertedWith("Index out of bounds");
    });

    //   it("Should set the right owner", async function () {
    //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

    //     expect(await lock.owner()).to.equal(owner.address);
    //   });

    //   it("Should receive and store the funds to lock", async function () {
    //     const { lock, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );

    //     expect(await ethers.provider.getBalance(lock.target)).to.equal(
    //       lockedAmount
    //     );
    //   });

    //   it("Should fail if the unlockTime is not in the future", async function () {
    //     // We don't use the fixture here because we want a different deployment
    //     const latestTime = await time.latest();
    //     const Lock = await ethers.getContractFactory("Lock");
    //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //       "Unlock time should be in the future"
    //     );
    //   });
    // });

    // describe("Withdrawals", function () {
    //   describe("Validations", function () {
    //     it("Should revert with the right error if called too soon", async function () {
    //       const { lock } = await loadFixture(deployOneYearLockFixture);

    //       await expect(lock.withdraw()).to.be.revertedWith(
    //         "You can't withdraw yet"
    //       );
    //     });

    //     it("Should revert with the right error if called from another account", async function () {
    //       const { lock, unlockTime, otherAccount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );

    //       // We can increase the time in Hardhat Network
    //       await time.increaseTo(unlockTime);

    //       // We use lock.connect() to send a transaction from another account
    //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
    //         "You aren't the owner"
    //       );
    //     });

    //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //       const { lock, unlockTime } = await loadFixture(
    //         deployOneYearLockFixture
    //       );

    //       // Transactions are sent using the first signer by default
    //       await time.increaseTo(unlockTime);

    //       await expect(lock.withdraw()).not.to.be.reverted;
    //     });
    //   });

    //   describe("Events", function () {
    //     it("Should emit an event on withdrawals", async function () {
    //       const { lock, unlockTime, lockedAmount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );

    //       await time.increaseTo(unlockTime);

    //       await expect(lock.withdraw())
    //         .to.emit(lock, "Withdrawal")
    //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //     });
    //   });

    //   describe("Transfers", function () {
    //     it("Should transfer the funds to the owner", async function () {
    //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //         deployOneYearLockFixture
    //       );

    //       await time.increaseTo(unlockTime);

    //       await expect(lock.withdraw()).to.changeEtherBalances(
    //         [owner, lock],
    //         [lockedAmount, -lockedAmount]
    //       );
    //     });
    //   });
    });
  })

