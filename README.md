### CodeMemory Server sample

### Installation

`npm install || yarn`

### Running

This example requires docker or a local mongodb installation. If using a local mongodb, see `app.module.ts` for connection options, and make sure there are matching options for the mongodb installation and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`

#### Make module

`npm i -g @nestjs/cli`

`nest g module models/work && nest g service models/work && nest g resolver models/work`
