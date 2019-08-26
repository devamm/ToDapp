pragma solidity ^0.5.0;

contract TodoList{
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
        bool deleted;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("default task");
    }

    event TaskCreatedEvent(
        uint id,
        string content,
        bool completed
    );

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreatedEvent(taskCount, _content, false);
    }

    event TaskCompletedEvent(
        uint id,
        bool completed
    );

    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompletedEvent(_id, _task.completed);
    }

    event TaskDeletedEvent(
        uint id
    );

    function deleteTask(uint _id) public {
        delete tasks[_id].deleted = true;
        emit TaskDeletedEvent(_id);
    }   
}