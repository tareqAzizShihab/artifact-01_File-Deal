# FileDeal

A tiny CLI-based file manager built with raw Node.js.

This artifact is part of the **CodeWithoutCloud** repository, where the goal is to learn by building small software artifacts without using AI to write the implementation.

## Features

Currently supports:

- Create a file
- Read a file
- Edit a file
- Copy a file
- Rename a file
- Move a file
- Delete a file
- Create a folder
- Exit the application

## Requirements

- Node.js
- No external dependencies

## Run

```bash
node index.js
```

Then use commands such as:

```text
fileDeal> create a file hello.txt
fileDeal> read hello.txt
fileDeal> edit hello.txt content Hello World
fileDeal> copy hello.txt to copy.txt
fileDeal> rename copy.txt to renamed.txt
fileDeal> move renamed.txt to ./some-folder/renamed.txt
fileDeal> delete hello.txt
fileDeal> create a folder some-folder
fileDeal> exit
```

## Node.js APIs Used

This artifact currently uses:

- `fs/promises`
- `readline/promises`
- `process`
- `util.styleText`

## Learning Focus

The main purpose of this artifact is to practice:

- CLI input handling
- Asynchronous programming
- File system operations
- File system error handling
- Command parsing
- Node.js built-in modules

## Status

Basic implementation complete.

Future improvements will be tracked separately rather than adding features prematurely.
