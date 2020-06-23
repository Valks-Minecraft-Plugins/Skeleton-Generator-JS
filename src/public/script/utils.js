const id = (id) => document.getElementById(id)
const removeMessage = (id) => {
    const element = document.getElementById(id)
    if (element != null) element.parentNode.removeChild(element)
}