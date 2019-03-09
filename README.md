MongoDB + Node
==============

# About

Notes on setting up a micro service with Node and Mongo

To get started, I worked through this [tutorial](https://zellwk.com/blog/crud-express-mongodb/) and thought it was straight forward. Then I refactored things a little bit and added sugar

I have used the Node Express package in the past for building micro services and thought it did a great job.

# Getting Started

I'm assuming a MacOS environment

## Node

Install node from brew or the MacOS installer.

Verify Node version:

```bash
~/Projects/botch $ node -v
v11.10.1
```

If you have node installed, make sure it is up to date

## MongoDB

You're going to need a MongoDB instance. There are free cloud services available or you can host your own instance for local development.

For this exercise, I hosted my own instance. I installed it with brew. See: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ 

Note that with the local instance, I didn't bother with setting up a username / password.

Install MongoDB and start it up:

```
brew tap mongodb/brew
brew install mongodb-community@4.0
mongod --config /usr/local/etc/mongod.conf
```

Mongo has a bunch of sugar for creating entities when you first try to use them. We don't need to explicitly create a database or a collection.

# Steps

Steps to get the project started:

```bash
mkdir -p ~/Projects/botch
cd ~/Projects/botch
npm init
# answer npm init questions - defaults are fine
npm install express --save
npm install body-parser --save
npm install mongodb --save
npm install node-cleanup --save
npm install uuid --save
npm install ejs --save
npm install nodemon --save-dev
cat package.json
```

Edit package.json and add sugar for starting nodemon:

```json
{
  "script": {
    "dev": "nodemon server.js"
  }
}
```

Note: if starting with this source, just run `npm install`

Running the app with `nodemon`

```bash
npm run dev
```

# References

* https://zellwk.com/blog/crud-express-mongodb/
* https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/ 
* http://mongodb.github.io/node-mongodb-native/2.0/tutorials/connecting/

----
