import { useMutation, useQueryClient } from 'react-query'
import { create } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
import { clearNotification } from './Notification'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()
	const newAnecdoteMutation = useMutation(create, {
		onSuccess: (newAnecdote) => {
			let queryData = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', queryData.concat(newAnecdote))
		},
	})

	const onCreate = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		newAnecdoteMutation.mutate({ content, votes: 0, id: new Date().getMilliseconds() }, {
			onSuccess: () => {
				notificationDispatch({ type: 'NEW', payload: content })
				clearNotification(notificationDispatch)
			},
			onError: (error) => {
				notificationDispatch({ type: 'ERROR', payload: error.response.data.error })
				clearNotification(notificationDispatch)
			}
		})
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote"/>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
