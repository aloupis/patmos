FROM node:14.14.0-alpine
WORKDIR "/app"
COPY package.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'