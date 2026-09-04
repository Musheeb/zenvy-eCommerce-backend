FROM node:24
# This tells the docker which version of node we should create an image with.

WORKDIR /app
# This tell which folder in the container will hold our source code.

COPY package*.json ./
# Copying package.json and other package containing files to the directory of our application in the container. Here "*" called wildcard.

RUN npm install 
# Installs all the dependencies from package.json.

COPY . .
# Copy entire files form my current directory to the container's current directory.

EXPOSE 3000
# Whenever our container will run, it will be running on this Port.

CMD [ "npm", "run" ,"dev" ]
# When we run our container, it will run this command.