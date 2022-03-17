import { Checkbox } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	border-radius: 8px;
	min-width: 300px;
	width: 100%;

	flex: 10;
`

const AdminTable = ({
	data,
	columns,
	page,
	rowsPerPage,
	selectedAll,
	...props
}) => {
	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>
							<Checkbox
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
							.map((row) => (
								<tr key={row.id} className={row.isChecked ? 'selected' : ''}>
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
									</td>
								</tr>
							))}
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
