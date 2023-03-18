import { useMutation, useQueryClient } from 'react-query'
import { create } from '../requests'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
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
		newAnecdoteMutation.mutate({ content, votes: 0, id: new Date().getMilliseconds() })
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
