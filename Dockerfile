FROM node:20

# Copy app files
COPY . /express
WORKDIR /express

# Install app dependencies
RUN npm install

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "/express/dist/index.js"]
