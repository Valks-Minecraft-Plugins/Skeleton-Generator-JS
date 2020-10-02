let generating

const elements = {
    groupId: id('group-id'),
    artifactId: id('artifact-id'),
    version: id('version'),
    description: id('description'),
    discord: id('discord'),
    generate: id('generate')
}

// Validate groupID on blur
elements.groupId.addEventListener('blur', function () {

    this.style.borderBottom = this.value === '' || valid_gid(this.value.trim()) ? '' : '1px solid #850900';

})

// Validate artifactId on blur
elements.artifactId.addEventListener('blur', function () {

    this.style.borderBottom = this.value === '' || valid_aid(this.value.trim()) ? '' : '1px solid #850900';

})

// Validate version on blur
elements.version.addEventListener('blur', function () {

    this.style.borderBottom = this.value === '' || valid_version(this.value.trim()) ? '' : '1px solid #850900';

})

elements.generate.addEventListener('click', () => {

    if (generating) return

    let gid = elements.groupId.value.trim(),
        aid = elements.artifactId.value.trim(),
        version = elements.version.value.trim();
    
    // Validate values while allowing empty inputs for default values
    if (gid !== '' && !valid_gid(gid)) return
    if (aid !== '' && !valid_aid(aid)) return
    if (version !== '' && !valid_version(version)) return

    axios.post('/generate', {
        groupId: gid,
        artifactId: aid,
        version: version,
        description: elements.description.value,
        discord: elements.discord.value
    }).then((res) => {
        if (res.data === 'OK') {
            window.open('/generate')
            generating = false
        }
    }).catch((err) => console.log(err))
})