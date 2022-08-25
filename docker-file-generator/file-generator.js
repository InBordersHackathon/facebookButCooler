const fs = require('fs');
const mockData = require('./mock-docker-data.json');


const fileGenerator = (dockerServices) => {
  
  for (dockerService of dockerServices) {
    let fileName = `generatedFiles/DockerImage-${dockerService['app-name']}`
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

fileGenerator(mockData);