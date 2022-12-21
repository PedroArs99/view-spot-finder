# View Spot Fidner

## Usage

### NodeJs CLI

```sh
# Install dependencies
npm install
# Create the artifact
npm run build
# Run
node dist/main.js <pathToMeshFile> <n>
```

### Npm

```sh
# Install dependencies
npm install
# Run
npm run start -- <pathToMeshFile> <n>
```

### Serverless

```sh
# Install dependencies
npm install

# Run
# Note: the file should contain the following structure { n: number, mesh: {nodes: [], elements: [], values: []}}
serverless invoke local -f viewSpotFinder --path <pathToMeshFile>
```

### Unit Tests

```sh
#Install dependencies
npm install

# Run
npm run test
```
