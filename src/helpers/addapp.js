const addAppUrl = "https://apps.shopify.com/withfriends"

const addApp = (setShowModal) => {
    // setShowModal(true)
    window.location.href = addAppUrl
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
export {addApp, addAppHref, addAppUrl, closeModal, addCloseModalListener}