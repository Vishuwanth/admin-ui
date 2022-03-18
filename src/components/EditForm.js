import React, { useState } from 'react'
import { MenuItem, Select, TextField } from '@material-ui/core'

const EditForm = ({ row, ...props }) => {
	const [name, setName] = useState(row.name)
	const [email, setEmail] = useState(row.email)
	const [role, setRole] = useState(row.role)

	const onSave = () => {
		props.handleSave({
			id: row.id,
			name,
			email,
			role,
			isChecked: row.isChecked,
			isEditable: false,
		})
	}

	const onCancel = () => {
		props.handleCancelEdit({
			...row,
			isEditable: false,
		})
	}

	return (
		<tr key={row.id}>
			<td align='center'>{row.id}</td>
			<td>
				<TextField
					color='secondary'
					id='standard-basic'
					label='Name'
					variant='standard'
					value={name}
					type='text'
					onChange={(e) => setName(e.target.value)}
				/>
			</td>
			<td>
				<TextField
					color='secondary'
					id='standard-basic'
					label='Email'
					variant='standard'
					value={email}
					type='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</td>
			<td>
				<Select
					color='secondary'
					value={role}
					label='Role'
					autoWidth
					onChange={(e) => setRole(e.target.value)}>
					<MenuItem value={'member'}>member</MenuItem>
					<MenuItem value={'admin'}>admin</MenuItem>
				</Select>
			</td>
			<td>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}>
					<div onClick={onSave} style={{ cursor: 'pointer' }}>
						<i
							style={{
								marginRight: '10px',
								color: '#1976d2',
								fontSize: '20px',
							}}
							className='fa-solid fa-check'></i>
					</div>
					<div onClick={onCancel} style={{ cursor: 'pointer' }}>
						<i
							style={{
								marginRight: '10px',
								color: '#ff5171',
								fontSize: '20px',
							}}
							className='fa-solid fa-xmark'></i>
					</div>
				</div>
			</td>
		</tr>
	)
}

export default EditForm
