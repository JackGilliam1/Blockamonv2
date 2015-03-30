# Blockamonv2
Me Messing around with a bunch of different APIs including ReactJS, Jest, Webpack, Supervisor and MongoDb


# To compile this:

- Installs the node packages
npm install

- Create the bundle.js
webpack

*Note: if you don't have webpack installed globally this one won't work*
(npm install webpack -g)

- Starts the mongo db server
startmongo.sh

*Note: change the path listed in the .sh script to the path where you installed Mongodb (the path with the "mongod.exe" file)*

- Starts the node server
npm start

- The website starts at url
localhost:10001

- debugger for the node server
node-inspector

- the node inspector url
localhost:8080/debug?port=5858
