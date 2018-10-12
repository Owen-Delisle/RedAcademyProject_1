# Boomtown 🏙

## Server

Commands must be run from the `server` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm run start:dev
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run Jest tests:

```
npm run jest
```

Run Jest tests, and watch for changes:

```bash
npm run jest:watch
```

Run all tests:

```bash
npm run test
```

## Client

Commands must be run from the `client` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Build

```bash
npm run build
```

### Tests

Just linting:

```bash
npm run lint
```

Run linting, and fix any errors:

```bash
npm run lint:fix
```

Run all tests:

```bash
npm run test
```

# RedAcademyProject_1

<----List of Querys---->

1. Get User by ID:

query ($id : ID!){
user(id:$id) {
fullname
}
}

2. Get Items by ID:

query($filter : ID!){
items(filter:$filter) {
title
}
}

3. Get Tags

query{
tags{
title
}
}

4. Get items owned by user

query user($id: ID!){
user(id:$id){
items {
title
}
}
}

5. Get items borrowed by user

query user($id: ID!){
user(id:$id){
borrowed {
title
}
}
}

6. Get user that owns item

query item($filter : ID!){
items(filter:$filter) {
id
title
itemowner{
fullname
}
}
}

7. Get tags on an item

query item($filter : ID!){
items(filter:$filter) {
id
title
tags {
title
}
}
}

8. Users that borrow an item

query item($filter : ID!){
items(filter:$filter) {
id
title
itemowner{
fullname
}
borrower {
fullname
}
}
}
