const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }

    if (type === 'error') {

        return (
            <div className='error notification'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='success notification'>
                {message}
            </div>
        )

    }
}
export default Notification;