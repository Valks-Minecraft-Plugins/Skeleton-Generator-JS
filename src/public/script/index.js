const elements = {
    groupId: id('group-id'),
    artifactId: id('artifact-id'),
    description: id('description'),
    discord: id('discord'),
    generate: id('generate')
}

elements.generate.addEventListener('click', () => {
    axios.post('/generate', {
        groupId: elements.groupId.value,
        artifactId: elements.artifactId.value,
        description: elements.description.value,
        discord: elements.discord.value
    }).then((res) => {
        const data = res.data
    }).catch((err) => {
        console.log(err)
    })
})