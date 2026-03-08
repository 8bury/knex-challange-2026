FROM node:20-slim
WORKDIR /
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]