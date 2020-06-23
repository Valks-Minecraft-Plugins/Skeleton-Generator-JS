const express = require('express')
const bodyParser = require('body-parser')
const { zip } = require('zip-a-folder')
const rimraf = require("rimraf")
const Utils = require('./utils')
const config = require('./config')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))

console.clear()

let groupId, artifactId, description, discord

app.post('/generate', async (req, res) => {
    // Inputs
    const data = req.body
    groupId = data.groupId
    artifactId = data.artifactId
    description = data.description
    discord = data.discord

    // Defaults
    if (groupId === '') groupId = config.defaults.groupId
    if (artifactId === '') artifactId = config.defaults.artifactId
    if (description === '') description = config.defaults.description
    if (discord === '') discord = config.defaults.discord

    const groupIdArr = groupId.split('.')

    // Generate skeleton
    console.log('Generating skeleton..')

    // root
    Utils.dir(`../dist`)
    Utils.dir(`../dist/${artifactId}`)
    Utils.dir(`../dist/${artifactId}/.github`)
    Utils.createPomXML(groupId, artifactId)
    Utils.createTemplateIML(artifactId)

    // git
    Utils.createReadme(artifactId, description, discord)
    Utils.createContributing(artifactId)

    // src
    Utils.dir(`../dist/${artifactId}/src`)
    Utils.dir(`../dist/${artifactId}/src/main`)
    Utils.dir(`../dist/${artifactId}/src/main/java`)
    Utils.dir(`../dist/${artifactId}/src/main/java/${groupIdArr[0]}`)
    Utils.dir(`../dist/${artifactId}/src/main/java/${groupIdArr[0]}/${groupIdArr[1]}`)
    Utils.dir(`../dist/${artifactId}/src/main/java/${groupIdArr[0]}/${groupIdArr[1]}/${groupIdArr[2]}`)
    Utils.dir(`../dist/${artifactId}/src/main/java/${groupIdArr[0]}/${groupIdArr[1]}/${groupIdArr[2]}/${artifactId.toLowerCase()}`)
    Utils.createTemplateJava(groupId, artifactId);

    // Resources
    Utils.dir(`../dist/${artifactId}/src/main/resources`)
    Utils.createPluginYML(artifactId);

    console.log('Finished generating skeleton')

    // Zip it
    await zip(`../dist/${artifactId}`, `../dist/${artifactId}.zip`)
    // Zip it again to zip root files in root dir
    await zip(`../dist/${artifactId}`, `../dist/${artifactId}.zip`)

    res.sendStatus(200) // 'OK'
})

app.get('/generate', (req, res) => {
    res.download(`../dist/${artifactId}.zip`)

    // Clean up (delete dist)
    rimraf("../dist", () => {
        console.log("Cleaned up")
    })
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))