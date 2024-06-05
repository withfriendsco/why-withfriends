const addAppUrl = "https://apps.shopify.com/withfriends"
const oldAddAppUrl = "https://withfriends.co/action/364/sign_up/modal"

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
export {addApp, addAppHref, addAppUrl, oldAddAppUrl, closeModal, addCloseModalListener}