FROM node:12.2.0-alpine
WORKDIR app
COPY backend/* /
RUN npm install
COPY ./backend .
EXPOSE 3001
CMD ["node","index.js"]
