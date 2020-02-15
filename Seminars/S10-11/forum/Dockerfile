FROM node:10

ARG otherhost

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#puerto para foros
#EXPOSE 1000
#EXPOSE 1001
#EXPOSE 1002
#puertos para servers request
#EXPOSE 1013
#EXPOSE 1014
#EXPOSE 1015
#puertos para servers  publisher
#EXPOSE 1016
#EXPOSE 1017
#EXPOSE 1018

#ejecutar tod en uno solo
ENV otherhost=${otherhost}
CMD ["sh","-c","/usr/local/bin/node runnerdocker.js $otherhost"]

#just for dev proporses
#ENTRYPOINT ["tail", "-f", "/dev/null"]

