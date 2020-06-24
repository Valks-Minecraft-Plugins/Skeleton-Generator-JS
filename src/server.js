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

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (text) {
    const args = text.trim().split(' ').slice(1)
    const cmd = text.trim().toLowerCase().split(' ')[0]
    if (cmd === 'groupid') {
        if (args.length < 1) {
            console.log('Please specify a groupId')
            return
        }

        groupId = args[0]
        console.log(`Set groupId to ${args[0]}`)
    }

    if (cmd === 'artifactid') {
        if (args.length < 1) {
            console.log('Please specify a artifactId')
            return
        }

        artifactId = args[0]
        console.log(`Set artifactId to ${args[0]}`)
    }

    if (cmd === 'description') {
        if (args.length < 1) {
            console.log('Please specify a description')
            return
        }

        description = args[0]
        console.log(`Set description to ${args[0]}`)
    }

    if (cmd === 'discord') {
        if (args.length < 1) {
            console.log('Please specify a discord invite link')
            return
        }

        discord = args[0]
        console.log(`Set discord to ${args[0]}`)
    }
})

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

    await Utils.prepareTemplate('template', groupId)
    await Utils.copyTemplate('template', `../dist/${artifactId}`, { groupId, artifactId, description, discord })

    console.log('Finished generating skeleton')

    // Zip it (we zip it twice to include root files)
    await zip(`../dist/${artifactId}`, `../dist/${artifactId}.zip`)
    await zip(`../dist/${artifactId}`, `../dist/${artifactId}.zip`)

    res.sendStatus(200) // 'OK'
})

app.get('/generate', (req, res) => {
    res.download(`../dist/${artifactId}.zip`)

    rimraf(`../dist`, () => {})
    rimraf(`template/src/main/java/${groupId.split('.')[0]}`, () => {})

    console.log('Cleaned up files, standing by to generate another skeleton!')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    console.log()
    console.log('The following values can be set manually via console: groupid, artifactid, description, discord')
    console.log('')
})