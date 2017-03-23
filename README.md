# Grid Composer
Grid Composer is a layer on top of [Docker-Selenium](https://github.com/SeleniumHQ/docker-selenium) and [Docker-Compose](https://docs.docker.com/compose/) to provide API endpoints for commonly used commands for your Selenium Nodes.


## API
_All API methods are public by default. Passing in `{token: 'secretToken'}` will confirm request by checking the token parameter in the request. IE `/status?token=secretToken`._

| Method | Endpoint | Docker-Compose equivalent | Description |
| ---- | ----------- | ----------- | ----------- |
| POST | `/start` | `$ docker-compose up -d` | boot up docker containers. |
| POST | `/stop` | `$ docker-compose down` | shutdown docker containers. |
| PUT | `/scale/:browserName/:numberOfNodes` | `$ docker-compose scale <browser>=<numberOfNodes>` | Scale up a specific browser node. |
| GET | `/status` | `$ docker-compose ps` | get info on node containers. |

## How to use
1. cd into the location of `docker-compose.yml`.
2. clone repo: `$ git clone https://github.com/DonPage/grid-composer.git .` (the `.` is so it clones everything _within_ in the repo.)
3. (_optional_) create `config.json`.
4. run `$ npm install`.
5. run `$ npm start`.

## Config options
_These options should be a json format inside config.json_

| Option | Type | Default | Description |
| ---- | ----------- | ----------- | ----------- |
| maxNodes | `number` | `20` | Max number of nodes that should be idle/up at any given time. |
| token | `string|boolean` | `false` | token to confirm against before executing docker-compose commands. If `false`, all API endpoints will be open  |
| port | `number` | `8080` | The open port you want the API to listen on. |






