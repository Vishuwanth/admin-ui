import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GridActionsCellItem } from '@mui/x-data-grid'
import AdminApp from './components/AdminApp/AdminApp'
import SearchBar from './components/SearchBar/SearchBar'
import EditIcon from '@material-ui/icons/Edit'
import axios from 'axios'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { device } from './deviceConstants'

const Container = styled.div`
	border: 1px solid red;
	height: 100vh;
	width: 100vw;
	padding: 0.5rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media ${device.laptop} {
		width: 80%;
		padding: 2rem;
	}
`

function App() {
	const [row, setRow] = useState([])

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
		},
		{
			field: 'name',
			headerName: 'Name',
		},
		{
			field: 'email',
			headerName: 'Email',
		},
		{
			field: 'role',
			headerName: 'Role',
		},
		{
			field: 'actions',
			headerName: 'Actions',
		},
	]

	const deleteUser = (params) => {
		const updatedRows = row.filter((each) => each.id !== params)
		setRow(updatedRows)
	}

	useEffect(() => {
		fetchData()

		return () => {}
	}, [])

	const fetchData = async () => {
		const response = await axios.get(
			'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
		)
		const rowData = await response.data
		setRow(rowData)
	}

	return (
		<Container>
			<SearchBar />
			<AdminApp row={row} columns={columns} />
		</Container>
	)
}

export default App
