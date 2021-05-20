FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /apps
EXPOSE 300
CMD ["npm", "run", "start"]