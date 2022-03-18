import { Checkbox } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import EditForm from '../EditForm'

const Container = styled.div`
	border-radius: 8px;
	min-width: 300px;
	width: 100%;
	overflow: auto;

	flex: 10;
`

const CustomCheckBox = withStyles({
	root: {
		color: '#f50057',
	},
	checked: {},
	disabled: {},
})(Checkbox)

const AdminTable = ({
	data,
	columns,
	page,
	rowsPerPage,
	selectedAll,
	...props
}) => {
	const onDelete = (id) => {
		props.handleDelete(id)
	}
	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>
							<CustomCheckBox
								checked={
									selectedAll === true
										? true
										: props.selected.length === rowsPerPage
								}
								disabled={data.length === 0}
								indeterminate={
									props.selected.length > 0 &&
									props.selected.length < rowsPerPage
								}
								onChange={(e) => props.handleSelectAll(e)}
							/>
						</th>
						{columns.map((header) => (
							<th
								align='center'
								style={{
									fontWeight: 'bold',
								}}
								key={header.headerName}>
								{header.headerName}
							</th>
						))}
					</tr>
				</thead>

				{data.length > 0 ? (
					<tbody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								if (row.isEditable) {
									return (
										<EditForm
											row={row}
											key={row.id}
											handleSave={props.handleSave}
											handleCancelEdit={props.handleCancelEdit}
										/>
									)
								}
								return (
									<tr key={row.id} className={row.isChecked ? 'selected ' : ''}>
										<td>
											<CustomCheckBox
												checked={row.isChecked}
												onChange={(e) => props.handleChecked(e, row)}
											/>
										</td>

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
												<div
													style={{ cursor: 'pointer' }}
													onClick={() => props.handleEdit(row)}>
													<i
														style={{
															marginRight: '10px',
															color: '#1976d2',
															fontSize: '1rem',
														}}
														className='fa-solid fa-pen-to-square'></i>
												</div>
												<div
													style={{ cursor: 'pointer' }}
													onClick={() => onDelete(row.id)}>
													<i
														style={{
															marginRight: '10px',
															color: '#ff5171',
															fontSize: '1rem',
														}}
														className='fa-solid fa-trash'></i>
												</div>
											</div>
										</td>
									</tr>
								)
							})}
					</tbody>
				) : (
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						No Matching Search Results Found
					</div>
				)}
			</table>
		</Container>
	)
}

export default AdminTable
