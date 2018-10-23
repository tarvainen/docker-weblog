# Docker WebLog

Send your `docker logs` to your web browser!

# Usage

Use this as a Docker [logging driver](https://docs.docker.com/config/containers/logging/gelf/). 
See `example` for fully working example.

With `docker-compose`
```
version: '3'

services:
  weblog:
    build:
      context: ../
    ports:
      - 12201:12201/udp  # for logs
      - 3456:3456        # for app
      
  my-app:
    image: node:10
    volumes:
      - ./my-awesome-app:/usr/src/app
    working_dir: /usr/src/app
    entrypoint: node index.js
    logging:
      driver: gelf
      options:
        gelf-address: udp://localhost:12201
        tag: my-awesome-worker-1
```

or using the `docker run`

```
docker run  --log-driver gelf –-log-opt gelf-address=udp://localhost:12201 ubuntu:latest echo hello world
```

# License

MIT