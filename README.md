# Bad Days Counter API

This is a simple API that track helps the user to track "bad days". For each day the user has to score it ten and can add a comment.

The goal is to find if there are similarities in actions or events on bad days.

## Pre-requisites

- Node.js >=v16.17.1
- MariaDB
- ssh-keygen

## Installation

After cloning the repository, run the following commands:

```
pnpm run init
```

It will install all the dependencies and create a jwt folder with keys in it (used for authentication).

Then copy .env.example file and fill the variables.

## Usage

To start the server, run the following command:

```
pnpm run start
```

## Convention

This project use the following convention:

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
