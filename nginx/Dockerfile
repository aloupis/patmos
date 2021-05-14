FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD /bin/bash -c "envsubst '\$PORT \$HEROKU_APP_SITE_URL \$HEROKU_APP_GATEWAY_URL \$HEROKU_APP_MEDIA_URL \$ADMIN_HOST \$NGINX_HOST \$USE_SSL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'