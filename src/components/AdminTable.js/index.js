import {
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	border-radius: 8px;
	min-width: 300px;
	width: 100%;

	flex: 10;
`

const tableRowStyles = {
	// backgroundColor: 'yellow',
	borderRadius: '7px',
}

const AdminTable = ({
	data,
	columns,
	page,
	rowsPerPage,
	selectedAll,
	...props
}) => {
	const handleSelectAll = () => {
		console.log('selectAll')
	}

	return (
		<Container>
			<table>
				<thead>
					<tr
					// style={{ backgroundColor: 'red' }}
					>
						<th>
							<Checkbox
								checked={
									selectedAll
										? selectedAll
										: props.selected.length === rowsPerPage
								}
								indeterminate={
									props.selected.length > 0 &&
									props.selected.length < rowsPerPage
								}
								onChange={(e) => props.handleSelectAll(e)}
								// indeterminate={}
							/>
						</th>
						{columns.map((header) => (
							<th
								align='center'
								style={{
									fontWeight: 'bold',
								}}
								key={header.headerName}>
								{header.icons !== null && header.icons}
								<span>{header.headerName}</span>
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row) => (
							<tr key={row.id} style={tableRowStyles}>
								<td>
									<Checkbox
										checked={row.isChecked}
										onChange={(e) => props.handleChecked(e, row)}
									/>
								</td>
								<td align='center'>{row.id}</td>
								<td align='center'>{row.name}</td>
								<td align='center'>{row.email}</td>
								<td align='center'>{row.role}</td>
								<td align='center'>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<div>
											<i
												style={{
													marginRight: '10px',
													color: '#1976d2',
													fontSize: '1rem',
												}}
												className='fa-solid fa-pen-to-square'></i>
										</div>
										<div onClick={() => props.handleDelete(row.id)}>
											<i
												style={{
													marginRight: '10px',
													color: '#ff5171',
													fontSize: '1rem',
												}}
												className='fa-solid fa-trash'></i>
										</div>
									</div>
									{/* <Delete color='secondary' /> */}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</Container>
	)
}

export default AdminTable
