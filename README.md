# CI deployment strategy for Yarn Workspace

WIP deployment strategy I hope will streamline deployment of future Yarn Workspace projects

### Core testing/deployment technologies

- Lerna
- GitHub Actions
- Jest
- Commitizen

### Workspace Deploy

Regardling server deployment, manually create/update env file - yet to find a way for GitHub Actions to ensure this is updated (ignored in .gitignore) but changes infrequently so not a priority right now

1. Make sure all local changes have been published to remote (using Commitizen)
2. Run `yarn deploy`
   - This will kick off `lerna version` in independent mode, which will individually push versioned package (api, web) changes to remote
   - GitHub Action workflow is then kicked off depending on the package pushed

#### API (Server) Deploy Steps - found in api-deploy.yml

1. Run package tests (unit/integration)
2. Build image and publish to Docker repo with version tag
3. SCP via SSH core production files (nginx, pg-scripts, docker-compose.yml, deploy.sh) to DigitalOcean - in the rare instance something is updated here
4. SSH into DO droplet and run deploy.sh (docker-compose up) using current tag

Deploy time is ~6 mins - will work to reduce this

![API Deploy](https://user-images.githubusercontent.com/8736328/81483556-1ef7ae00-920d-11ea-9068-1e62601d6ef7.png)
