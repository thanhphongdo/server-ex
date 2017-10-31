FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# For npm@5 or later, copy src as well
# COPY src ./
COPY . .

# Install pm2
RUN npm install pm2 -g

# Install packages
RUN npm install

# Bundle app source
COPY . .

# Make port 3778, 3779 available to the world outside this container
EXPOSE 3778 3779

# Define environment variable
ENV ENV=dev

# Run app when the container launches

# CMD [ "node", "index.js" ]
CMD ["pm2-docker", "process.yml"]
