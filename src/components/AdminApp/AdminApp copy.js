import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

import styled from 'styled-components'

import { device } from '../../deviceConstants'
import { DataGridPro } from '@mui/x-data-grid-pro'

const Container = styled.div`
	width: 80%;
	height: 100%;

	@media ${device.mobileS} {
		width: 100%;
	}
`

const AdminApp = ({ row, columns }) => {
	const [editRowsModel, setEditRowsModel] = React.useState({})

	const handleEditRowsModelChange = React.useCallback((model) => {
		console.log('model', model)
		setEditRowsModel(model)
	}, [])
	const handleEdit = (props) => {
		console.log('handle click', props)
	}
	return (
		<Container>
			<DataGridPro
				autoHeight
				rows={row}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10, 25]}
				checkboxSelection
				// onCellClick={(props) => handleEdit(props)}
				editRowsModel={editRowsModel}
				onEditRowsModelChange={handleEditRowsModelChange}
			/>
		</Container>
	)
}

export default AdminApp
