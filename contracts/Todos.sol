// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todos {
    // Write a todo smart Contract that makes use of struct and arrays.
    // This contract has nothing to do with mapping.
    // A user can create a todo see all todos they create.
    // Add a status of isDone using a boolean.
    // One function should toggle the isDone status.
    // Users should be able to update title, description, isdone status and delete todo.

    uint index;

    struct Todo {
        string title;
        string description;
        bool isDone;
        uint id;
    }

    Todo[] public todos;

    function createTodo(string memory _title, string memory _desc) external {
        todos.push(Todo(_title, _desc, false, index++));
    }

    function toggleTodo(uint _index) external {
        require(_index < todos.length, "Index out of bounds");
        todos[_index].isDone = !todos[_index].isDone;
    }

    function updateTodo(
        uint _index,
        string memory _title,
        string memory _desc
    ) external returns (Todo memory) {
        require(_index < todos.length, "Index out of bounds");
        return
            todos[_index] = Todo({
                title: _title,
                description: _desc,
                isDone: false,
                id: _index
            });
    }

    // The number from the array is not removed when using the delete function. The value of that index is removed and replaced with 0. Using pop is the a proper method

    function deleteTodo(uint _index) external {
        require(_index < todos.length, "Index out of bounds");
        // delete todos[_index];
        todos[_index] = todos[todos.length - 1];
        todos.pop();
    }
}
