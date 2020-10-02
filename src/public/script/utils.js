const id = (id) => document.getElementById(id)
const removeMessage = (id) => {
    const element = document.getElementById(id)
    if (element != null) element.parentNode.removeChild(element)
}

// Determine if the groupId matches valid regex
const valid_gid = gid => /(?:^\w+|\w+\.\w+)+$/.test(gid)

// Determine if the artifactId matches valid regex
const valid_aid = aid => /^[A-Za-z0-9_\-.]+$/.test(aid)

// Determine if the version matches valid regex
const valid_version = v => /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(v)