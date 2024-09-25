FROM node

WORKDIR /www/app

COPY . /www/app

RUN npm install --legacy-peer-deps

RUN npx playwright install-deps 

RUN npx playwright install chromium

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]