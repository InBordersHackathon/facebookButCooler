const fs = require('fs');
const mockData = require('./mock-docker-data.json');

const generateDockerFiles = (dockerServices) => {
  for (dockerService of dockerServices) {
    let fileName = `generatedFiles/DockerFile-${dockerService['app-name']}`
    let content = "";
    content += `FROM ${dockerService['node-version']}\n\n`;

    dockerService.setup.map(instruction => {
      content += `RUN ${instruction}\n\n`
    });
  
    content += `RUN git clone --branch ${dockerService.branch} ${dockerService.url}\n\n`;
    content += `WORKDIR ${dockerService['app-path']}\n\n`;
    content += `RUN npm i\n\n`;

    content += `EXPOSE ${dockerService['expose-port']}\n\n`;
    content += `ENTRYPOINT ${JSON.stringify(dockerService['entry-point'])}\n`;

    fs.writeFile(fileName, content, (err) => {
      if (err) console.log(err);
    })
  }
}

const generateDockerCompose = (dockerServices) => {
  let fileName = `generatedFiles/docker-compose.yml`;
  let content = "";
  let tabCount = 0;

  const pushContent = (instruction) => {
    for(let i = 0; i < tabCount; i++){
      content += `\t`;
    }
    content += `${instruction}\n`;
  }

  pushContent(`version: "3.9"`);

  pushContent(`services:`);
  for (dockerService of dockerServices) {
    let dockerFileName = `DockerFile-${dockerService['app-name']}`
    tabCount++;
    pushContent(`${dockerService['app-name']}:`);
    tabCount++;
    pushContent(`build:`);
    tabCount++;
    pushContent(`context: .`)
    pushContent(`dockerfile: ${dockerFileName}`)
    tabCount--;
    pushContent(`ports:`)
    tabCount++;
    pushContent(`- ${dockerService['expose-port']}:${dockerService['expose-port']}`)
    tabCount--;
    tabCount--;
    tabCount--;
  }

  fs.writeFile(fileName, content, (err) => {
    if (err) console.log(err);
  })
}

const fileGenerator = (dockerServices) => {
  const dir = './generatedFiles'; 
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  generateDockerFiles(dockerServices);
  generateDockerCompose(dockerServices);

}

fileGenerator(mockData);