let generating

const elements = {
    groupId: id('group-id'),
    artifactId: id('artifact-id'),
    version: id('version'),
    description: id('description'),
    discord: id('discord'),
    generate: id('generate')
}

elements.generate.addEventListener('click', () => {
    if (generating) return 
    generating = true
    generating = false

    axios.post('/generate', {
        groupId: elements.groupId.value,
        artifactId: elements.artifactId.value,
        version: elements.version.value,
        description: elements.description.value,
        discord: elements.discord.value
    }).then((res) => {
        if (res.data === 'OK') {
            window.open('/generate')
            generating = false
        }
    }).catch((err) => console.log(err))
})