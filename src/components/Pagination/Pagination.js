import React from 'react'
import { Pagination } from '@mui/material'
import styled from 'styled-components'
import { makeStyles, useMediaQuery } from '@material-ui/core'

import { device } from '../../deviceConstants'
const Container = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	@media (min-width: 479px) {
		flex-direction: row;
		align-items: center;
	}
`

const DeleteAllButton = styled.button`
	/* small screeens */
	background-color: #ff5171;
	border: none;
	color: #f6f6f6;

	padding: 0.5rem 0.5rem;
	border-radius: 0.5rem;
	font-size: 12px;
	margin-bottom: 16px;

	align-self: flex-start;
	justify-self: flex-start;
	display: flex;

	@media (min-width: 479px) {
		align-self: center;
		justify-self: flex-start;
		padding: 0.5rem 1rem;
		margin-bottom: 0;
	}
`

const PaginationContainer = styled.div`
	align-self: center;

	@media (min-width: 479px) {
		justify-self: flex-start;
	}
`

const DeleteTypo = styled.p`
	align-self: flex-end;
	font-size: 1rem;
`

const DeleteIcon = styled.i`
	margin-right: 5px;
	font-size: 1.25rem;
`

const useStyles = makeStyles((theme) => ({
	ul: {
		'& .MuiPaginationItem-root': {
			backgroundColor: '#fff',
			color: '#f50057',
			border: '0.5px solid #f50057',
		},
		'& .MuiPaginationItem-root.Mui-selected': {
			backgroundColor: '#f50057',
			color: '#fff',
		},
		'& .MuiPaginationItem-root.Mui-disabled': {
			backgroundColor: 'gray',
			color: '#fff',
			border: 'none',
		},
	},
}))

function CustomPagination({ page, count, rowsPerPage, ...props }) {
	const matches = useMediaQuery('(min-width:469px)')
	const classes = useStyles()
	return (
		<Container>
			<DeleteAllButton onClick={() => props.handleDeleteMany()}>
				<DeleteIcon className='fa-solid fa-trash-can'></DeleteIcon>
				<DeleteTypo>Delete All</DeleteTypo>
			</DeleteAllButton>
			<PaginationContainer>
				{matches ? (
					<Pagination
						// color='standard'
						classes={{ ul: classes.ul }}
						defaultPage={1}
						page={page + 1}
						count={count}
						showFirstButton
						showLastButton
						onChange={(event, value) => props.handlePagination(event, value)}
					/>
				) : (
					<Pagination
						classes={{ ul: classes.ul }}
						defaultPage={1}
						page={page + 1}
						count={count}
						siblingCount={0}
						boundaryCount={0}
						showLastButton
						showFirstButton
						onChange={(event, value) => props.handlePagination(event, value)}
					/>
				)}
			</PaginationContainer>

			{/*  */}
		</Container>
	)
}

export default CustomPagination
