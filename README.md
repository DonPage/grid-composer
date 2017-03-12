# Grid Composer
Grid Composer is a layer on top of [Docker-Selenium](https://github.com/SeleniumHQ/docker-selenium) and [Docker-Compose](https://docs.docker.com/compose/) to provide API endpoints for commonly used commands for your Selenium Nodes.


## API
| Method | Endpoint | Docker-Compose equivalent | Description |
| ---- | ----------- | ----------- | ----------- |
| POST | `/start` | `$ docker-compose up -d` | boot up docker containers. |
| POST | `/stop` | `$ docker-compose down` | shutdown docker containers. |
| PUT | `/scale/:browserName/:numberOfNodes` | `$ docker-compose scale <browser>=<numberOfNodes>` | Scale up a specific browser node. |
| GET | `/status` | `$ docker-compose ps` | get info on container containers. |

## Config



