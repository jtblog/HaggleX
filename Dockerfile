# base image
FROM node:latest

WORKDIR /app
ADD package.json /app/package.json

RUN npm install
#RUN ["npm", "install"]

ADD . /app

COPY . .
RUN ["npm", "run", "build"]

#EXPOSE 3000

#CMD [ "/bin/ls", "-l" ]
CMD ["npm", "run", "start:prod"]