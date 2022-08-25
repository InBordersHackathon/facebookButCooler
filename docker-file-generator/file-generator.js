const fs = require('fs')
const mockData = require('./mock-docker-data.json')
const fileGenerator = (dockerData) => {
    let data = 
`FROM ${dockerData['node-version']}
RUN ${dockerData.instructions}\n`

for (object of dockerData.repository) {
    data += `RUN git clone --branch ${object.branch} ${object.url}
RUN cd ${object['app-path']}
RUN npm i
RUN npm ${object['app-start-command']}\n` 
}

    data += `EXPOSE ${dockerData['expose-port']}`
  
    fs.writeFile("Dockerfile", data, (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        // console.log(fs.readFileSync("books.txt", "utf8"));
      }
    })
}

fileGenerator(mockData);