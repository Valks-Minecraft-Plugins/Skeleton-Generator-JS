const fs = require('fs')
const readline = require('readline')

exports.dir = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

exports.createPomXML = async (groupId, artifactId) => {
    let data = []
    const reader = fs.createReadStream('template/pom.xml');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        if (line.includes('<groupId>')) {
            line = line.replace('%s', groupId)
        }

        if (line.includes('<artifactId>')) {
            line = line.replace('%s', artifactId)
        }

        data.push(line)
    }

    writeFile(`../dist/${artifactId}/pom.xml`, data)
}

exports.createPluginYML = async (artifactId) => {
    let data = []
    const reader = fs.createReadStream('template/plugin.yml');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        if (line.includes('name:')) {
            line = line.replace('%s', artifactId)
        }

        if (line.includes('main:')) {
            line = line.replace('%s1', artifactId.toLowerCase())
            line = line.replace('%s2', artifactId)
        }

        data.push(line)
    }

    writeFile(`../dist/${artifactId}/src/main/resources/plugin.yml`, data)
}

exports.createTemplateJava = async (groupId, artifactId) => {
    let data = []
    const reader = fs.createReadStream('template/Template.java');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        if (line.includes('package')) {
            line = line.replace('%s', artifactId.toLowerCase())
        }

        if (line.includes('class')) {
            line = line.replace('%s', artifactId)
        }

        data.push(line)
    }

    writeFile(`../dist/${artifactId}/src/main/java/${groupId.replace(/\./g, '/')}/${artifactId.toLowerCase()}/${artifactId}.java`, data)
}

exports.createTemplateIML = async (artifactId) => {
    let data = []
    const reader = fs.createReadStream('template/Template.iml');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        data.push(line)
    }

    writeFile(`../dist/${artifactId}/${artifactId}.iml`, data)
}

exports.createReadme = async (artifactId, description, discord) => {
    let data = []
    const reader = fs.createReadStream('template/README.md');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        if (line.includes('<!--Title-->')) {
            line = line.replace('%s', artifactId)
        }

        if (line.includes('<!--Description-->')) {
            line = line.replace('%s', description)
        }

        if (line.includes('<!--Discord-->')) {
            line = line.replace('%s', discord)
        }

        data.push(line)
    }

    writeFile(`../dist/${artifactId}/.github/README.md`, data)
}

exports.createContributing = async (artifactId) => {
    let data = []
    const reader = fs.createReadStream('template/CONTRIBUTING.md');

    const rl = readline.createInterface({
        input: reader,
        crlfDelay: Infinity
    })

    for await (let line of rl) {
        data.push(line)
    }

    writeFile(`../dist/${artifactId}/.github/CONTRIBUTING.md`, data)
}

const writeFile = (name, data) => {
    const writer = fs.createWriteStream(name)

    for (const line of data) {
        writer.write(line + '\n')
    }

    writer.close()
}