# Grid Composer
Grid Composer is a layer on top of [Docker-Selenium](https://github.com/SeleniumHQ/docker-selenium) and [Docker-Compose](https://docs.docker.com/compose/) to provide API endpoints for commonly used commands for your Selenium Nodes.


## API
_All API methods are private by default and need a API token to be accepted._

| Method | Endpoint | Docker-Compose equivalent | Description |
| ---- | ----------- | ----------- | ----------- |
| POST | `/start` | `$ docker-compose up -d` | boot up docker containers. |
| POST | `/stop` | `$ docker-compose down` | shutdown docker containers. |
| PUT | `/scale/:browserName/:numberOfNodes` | `$ docker-compose scale <browser>=<numberOfNodes>` | Scale up a specific browser node. |
| GET | `/status` | `$ docker-compose ps` | get info on node containers. |

## Config options
_These options should be a json format inside config.json_

| Option | Type | Default | Description |
| ---- | ----------- | ----------- | ----------- |
| maxNodes | `number` | `20` | Max number of nodes that should be idle/up at any given time. |
| getsPublic | `boolean` | `false` | Allow `GET` methods to be accessible without api token. |





