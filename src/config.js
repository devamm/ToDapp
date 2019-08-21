export const TODO_LIST_ADDRESS = '0xF0AbdD39Fe698e4813bD029CfFe68B2d70EB8871';

export const TODO_LIST_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tasks",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "content",
        "type": "string"
      },
      {
        "name": "completed",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8d977672"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "taskCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb6cb58a5"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "completed",
        "type": "bool"
      }
    ],
    "name": "TaskCreatedEvent",
    "type": "event",
    "signature": "0x9ed086b5d4fb9d3a8bf98859b4cda46f2a9b74be2b3a906a94a8e5765f51cb5f"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "completed",
        "type": "bool"
      }
    ],
    "name": "TaskCompletedEvent",
    "type": "event",
    "signature": "0x454b18ae5ac58c728902fd5db4902cec64048b300fe4b00b3e79edca7f145fa9"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "createTask",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x111002aa"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "toggleCompleted",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x455f5024"
  }
];