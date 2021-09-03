const addApp = (setShowModal) => {
    setShowModal(true)
}
const addAppHref = (clickEvent, setShowModal) => {
    clickEvent.preventDefault()
    addApp(setShowModal)
}
const closeModal = (setShowModal) => {
    setShowModal(false);
}
const addCloseModalListener = (setShowModal) => {
    window.addEventListener('message', (messageEvent) => {
        if (messageEvent.data.action === 'close') {
            closeModal(setShowModal);
        }
    });
}
export {addApp, addAppHref, closeModal, addCloseModalListener}