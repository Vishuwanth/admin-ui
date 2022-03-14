import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../deviceConstants'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { Delete } from '@material-ui/icons'

import { GridActionsCellItem } from '@mui/x-data-grid'
import { Rowing } from '@mui/icons-material'
const Container = styled.div`
	width: 100%;
	height: 100%;

	border: 1px solid red;

	@media ${device.laptop} {
		width: 80%;
	}
`

const AdminApp = ({ row, columns }) => {
	const [page, setPage] = React.useState(0)

	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const [checked, setChecked] = React.useState(false)

	const [selected, setSelected] = React.useState([])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleSelectAll = (event) => {
		// setChecked(event.target.checked)
		if (event.target.checked) {
			const newSelecteds = row
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((n) => n.id)
			setSelected(newSelecteds)
			return
		}
		setChecked(!checked)
		setSelected([])
		console.log(' all checked', selected)
	}
	const handleClick = (event, id) => {
		// setChecked(event.target.checked)
		const selectedIndex = selected.indexOf(id)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
		console.log(' single checked', id)
	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - row.length) : 0

	const isSelected = (id) => selected.indexOf(id) !== -1
	return (
		<TableContainer
			sx={{
				bgcolor: 'background.paper',
				boxShadow: 1,
				borderRadius: 2,
				p: 2,
				width: '100%',
				minWidth: 300,
			}}
			component={'div'}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Checkbox
								color='primary'
								indeterminate={
									selected.length > 0 && selected.length < row.length
								}
								checked={row.length > 0 && selected.length === row.length}
								onChange={handleSelectAll}
								inputProps={{
									'aria-label': 'select all desserts',
								}}
							/>
						</TableCell>
						{columns.map((col) => (
							<TableCell key={col.headerName}>{col.headerName}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: row
					).map((row) => {
						const isItemSelected = isSelected(row.id)
						const labelId = `enhanced-table-checkbox-${row.id}`
						return (
							<TableRow
								key={row.id}
								hover
								onClick={(event) => handleClick(event, row.id)}
								role='checkbox'
								aria-checked={isItemSelected}
								tabIndex={-1}
								selected={isItemSelected}>
								<TableCell component='th' scope='row'>
									<Checkbox
										checked={checked}
										onChange={(event) => handleClick(event, row.id)}
										inputProps={{ 'aria-label': 'controlled' }}
									/>
								</TableCell>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>{row.role}</TableCell>
								<TableCell style={{ display: 'flex' }}>
									<GridActionsCellItem
										icon={<EditIcon />}
										label='Toggle Admin'
										// onClick={() => toggleAdmin(params.id)}
									/>
									<GridActionsCellItem
										icon={<Delete color='error' />}
										label='Delete'
										// onClick={() => deleteUser(params.id)}
									/>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component={TableHead}
					count={row.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Table>
		</TableContainer>
	)
}

export default AdminApp

{
	/* <GridActionsCellItem
				icon={<EditIcon />}
				label='Toggle Admin'
				// onClick={() => toggleAdmin(params.id)}
			/>
			<GridActionsCellItem
				icon={<Delete color='error' />}
				label='Delete'
				// onClick={() => deleteUser(params.id)}
			/> */
}
