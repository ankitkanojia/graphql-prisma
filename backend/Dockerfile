# pull the official base image  
FROM node:10.11.0 
 
# set your working directory  
WORKDIR /api  

COPY prisma ./prisma/

# install application dependencies  
COPY package*.json ./

RUN npm install --silent  
RUN npm install -g @prisma/cli
RUN npx prisma generate

# add app  
COPY . ./  
 
# will start app  
CMD ["node", "src/index.js"] 