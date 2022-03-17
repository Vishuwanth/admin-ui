import React from 'react'
import { Pagination, Stack, TablePagination } from '@mui/material'
import styled from 'styled-components'
import { DeleteForever, DeleteForeverOutlined } from '@material-ui/icons'
import Chip from '@mui/material/Chip'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import { createTheme } from '@material-ui/core'

const Container = styled.div`
	position: relative;
	width: 100%;
	flex: 1;
	min-height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border: 1px solid red; */
`

const DeleteAllButton = styled.button`
	background-color: #ff5171;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1rem;

	color: #f6f6f6;

	position: absolute;
	left: 0;
`

const theme = createTheme({
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					fontSize: '1rem',
				},
			},
		},
	},
})

const CustomPagination = ({ page, count, rowsPerPage, ...props }) => {
	return (
		<Container>
			<DeleteAllButton onClick={() => props.handleDeleteMany()}>
				<i
					style={{ marginRight: '10px', fontSize: '1.5rem' }}
					className='fa-solid fa-trash-can'></i>
				{/* <IconButton color={'secondary'}>
					<Delete />
				</IconButton> */}
				<p style={{ alignSelf: 'flex-end', fontSize: '1rem' }}>Delete All</p>
			</DeleteAllButton>

			<Pagination
				color='standard'
				page={page + 1}
				count={count}
				showFirstButton
				showLastButton
				onChange={(event, value) => props.handlePagination(event, value)}
				style={{}}
			/>
			{/* <DeleteButton>
				<DeleteForever color='secondary' />
			</DeleteButton> */}
		</Container>
	)
}

export default CustomPagination
