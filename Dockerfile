FROM node:15.13.0-alpine
WORKDIR /app
COPY package.json package.lock ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]