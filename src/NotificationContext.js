import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'NEW':
			return `anecdote '${action.payload}' created`
		case 'VOTE':
			return `anecdote '${action.payload}' voted`
		case 'ERROR':
			return action.payload
		case 'RESET':
			return ''
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch] }>
			{props.children}
		</NotificationContext.Provider>
	)
}
export const useNotificationValue = () => {
	const counterAndDispatch = useContext(NotificationContext)
	return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const counterAndDispatch = useContext(NotificationContext)
	return counterAndDispatch[1]
}

export default NotificationContext