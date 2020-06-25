const fs = require('fs')
const readline = require('readline')
const ncp = require('ncp').ncp;
const { promisify } = require('util')

exports.prepareTemplate = async (src, dest, values) => {
    const groupLabels = values.groupId.split('.')
    let groupDest = `${src}/src/main/java/`
    groupLabels.forEach(element => {
        groupDest += `${element}/`
        this.dir(groupDest)
    })

    groupDest += 'template'
    this.dir(groupDest)

    await promisify(ncp)(`template/src/main/java/com/github/valkyrienyanko/template`, groupDest)
    this.copyTemplate(src, dest, values)
}

exports.copyTemplate = async (src, dest, values) => {
    this.dir(`../dist`)
    this.dir(dest)

    const files = fs.readdirSync(src)
    files.forEach(async file => {
        const stats = fs.lstatSync(`${src}/${file}`)
        if (stats.isDirectory()) {
            let name = file
            name = this.setPlaceholder(name, 'template', values.artifactId.toLowerCase())
            if (file === 'valkyrienyanko') return
            this.dir(`${dest}/${name}`)

            this.copyTemplate(`${src}/${file}`, `${dest}/${name}`, values)
        } else {
            const reader = fs.createReadStream(`${src}/${file}`)
            const rl = readline.createInterface({
                input: reader,
                crlfDelay: Infinity
            })

            let data = []

            for await (let line of rl) {
                line = this.placeholder(line, 'com.github.valkyrienyanko', values.groupId)
                line = this.placeholder(line, 'Template', values.artifactId)
                line = this.placeholder(line, 'template', values.artifactId.toLowerCase())
                line = this.placeholder(line, '%version%', values.version)
                line = this.placeholder(line, '%description%', values.description)
                line = this.placeholder(line, '%discord%', values.discord)

                data.push(line)
            }

            file = this.placeholder(file, 'Template', values.artifactId)
            writeFile(`${dest}/${file}`, data)
        }
    })
}

exports.setPlaceholder = (string, placeholder, value) => {
    if (string === placeholder) {
        return string.replace(placeholder, value)
    }

    return string
}

exports.placeholder = (string, placeholder, value) => {
    if (string.includes(placeholder)) {
        return string.replace(placeholder, value)
    }

    return string
}

exports.dir = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

const writeFile = (name, data) => {
    const writer = fs.createWriteStream(name)

    for (const line of data) {
        writer.write(line + '\n')
    }

    writer.close()
}