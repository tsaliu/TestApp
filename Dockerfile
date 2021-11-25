FROM nginx:1.13.1

RUN mkdir -p ./usr/share/nginx

COPY ./start-nginx.sh ./start-nginx.sh

# Copy over frontend code
COPY ./dist/TestApp/. ./usr/share/nginx/html

# CMD ["bash", "./start-nginx.sh"]

EXPOSE 80
# Always apply the version label last since it causes cache misses during the build process on each version change.
ARG   version=1.0.9999
LABEL version="$version"
