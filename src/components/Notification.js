const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}
export const clearNotification = (dispatch, timeout = 5000) => {
  setTimeout(() => dispatch({ type: 'RESET' }), timeout)
}

export default Notification
