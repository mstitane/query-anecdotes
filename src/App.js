import AnecdoteForm from './components/AnecdoteForm'
import Notification, { clearNotification } from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, update } from './requests'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'

const App = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()
	const notification = useNotificationValue()
	const updateAnecdoteMutation = useMutation(update, {
		onSuccess: (updateAnecdote) => {
			let queryData = queryClient.getQueryData('anecdotes')
			queryData = queryData.map(anc => anc.id === updateAnecdote.id ? updateAnecdote : anc)
			queryClient.setQueryData('anecdotes', queryData)
		}
	})

	const result = useQuery(
		'anecdotes',
		getAnecdotes,
		{
			retry: 1,
			refetchOnWindowFocus: false
		}
	)

	if (result.isLoading) {
		return <div>loading data...</div>
	} else if (result.isError) {
		return <div>anecdote service not available due to problems in server</div>
	}
	const anecdotes = result.data

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
		notificationDispatch({ type: 'VOTE', payload: anecdote.content })
		clearNotification(notificationDispatch)
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification notification={notification}/>
			<AnecdoteForm/>

			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
