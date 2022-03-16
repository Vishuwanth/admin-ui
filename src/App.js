import { useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchBar from './components/SearchBar/SearchBar'

import axios from 'axios'

import { device } from './deviceConstants'
import AdminTable from './components/AdminTable.js'
import CustomPagination from './components/Pagination/Pagination'
import './table.css'

const Container = styled.div`
	/* border: 1px solid red; */
	min-height: 100vh;
	width: 100vw;
	padding: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: flex-start;
`
const Wrapper = styled.div`
	/* border: 1px solid green; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	height: 100%;

	@media ${device.laptop} {
		width: 80%;
		padding: 2rem;
	}
`

const Container1 = styled.div`
	flex: 1;
	background-color: red;
`
const Container2 = styled.div`
	flex: 10;
	background-color: yellow;
`
const Container3 = styled.div`
	flex: 1;
	background-color: green;
`

function App() {
	const [data, setData] = useState([])
	const [input, setInput] = useState('')
	const [selected, setSelected] = useState([])
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [page, setPage] = useState(0)
	const [selectedAll, setSelectedAll] = useState(false)
	// const [rowsToDisplay, setRowsToDisplay] = useState([])

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			icons: null,
		},
		{
			field: 'name',
			headerName: 'Name',
			icons: (
				<i
					style={{ marginRight: '10px', fontSize: '1.5rem' }}
					className='fa-regular fa-user'></i>
			),
		},
		{
			field: 'email',
			headerName: 'Email',
			icons: (
				<i
					style={{ marginRight: '10px', fontSize: '1.5rem' }}
					className='fa-solid fa-at'></i>
			),
		},
		{
			field: 'role',
			headerName: 'Role',
			icons: (
				<i
					style={{ marginRight: '10px', fontSize: '1.5rem' }}
					className='fa-regular fa-id-badge'></i>
			),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			icons: (
				<i
					style={{ marginRight: '10px', fontSize: '1.5rem' }}
					className='fa-solid fa-user-pen'></i>
			),
		},
	]

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await axios.get(
			'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
		)
		const rowData = await response.data
		const formattedData = rowData.map((each) => ({
			...each,
			isChecked: false,
		}))
		setData(formattedData)
		// setRowsToDisplay([...formattedData.slice(page * 10, page * 10 + 10)])
	}

	const handleChecked = (e, row) => {
		console.log(e.target.checked)
		if (e.target.checked) {
			setSelected([...selected, row])
		} else {
			const filteredRows = selected.filter((each) => each.id !== row.id)
			setSelected(filteredRows)
		}
		const updatedData = data.map((each) => {
			if (each.id === row.id) {
				return {
					...each,
					isChecked: !each.isChecked,
				}
			}

			return each
		})

		setData(updatedData)

		// if (selected.length === rowsPerPage - 1) {
		// 	setSelectedAll(true)
		// } else if (selected.length === 0) {
		// 	setSelected(false)
		// } else {
		// 	setSelected(null)
		// }
	}

	const handleSelectAll = (e) => {
		console.log('select al', data)
		const selectedAllIds = data
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((each) => each.id)
		if (e.target.checked) {
			const formatSelectedData = data.map((each) => {
				if (selectedAllIds.includes(each.id)) {
					return {
						...each,
						isChecked: true,
					}
				}
				return each
			})
			setSelected(
				formatSelectedData.slice(
					page * rowsPerPage,
					page * rowsPerPage + rowsPerPage
				)
			)

			setData(formatSelectedData)
			setSelectedAll(!selectedAll)
		} else {
			const formatSelectedData = data.map((each) => {
				if (selectedAllIds.includes(each.id)) {
					return {
						...each,
						isChecked: false,
					}
				}
				return each
			})
			setSelected([])

			setData(formatSelectedData)
			setSelectedAll(!selectedAll)
		}
	}

	const handlePagination = (e, value) => {
		setPage(value - 1)
		setSelected([])
		setSelectedAll(false)
	}

	const handleDelete = (id) => {
		console.log(id)
		const updatedData = data.filter((each) => each.id !== id)

		setData(updatedData)
	}

	const handleDeleteMany = () => {
		const selectedAllIds = selected.map((each) => each.id)

		const updatedData = data.filter((each) => {
			if (!selectedAllIds.includes(each.id)) {
				return each
			}
		})

		setData(updatedData)
		setSelectedAll(false)
	}

	const searchTerm = (input) => {
		setInput(input)
		const filteredData = data.filter((each) => {
			if (each.name.toLowerCase().includes(input.toLowerCase())) {
				return each
			} else if (each.role.toLowerCase().includes(input.toLowerCase())) {
				return each
			} else if (each.email.toLowerCase().includes(input.toLowerCase())) {
				return each
			}
		})

		console.log('filteredData', filteredData)

		setData(filteredData)
	}
	console.log('selected', selected)

	return (
		<Container>
			<Wrapper>
				<SearchBar input={input} setInput={searchTerm} />
				<AdminTable
					data={data}
					columns={columns}
					handleChecked={handleChecked}
					handleSelectAll={handleSelectAll}
					handleDelete={handleDelete}
					rowsPerPage={rowsPerPage}
					page={page}
					selectedAll={selectedAll}
					selected={selected}
				/>
				<CustomPagination
					page={page}
					count={Math.ceil(data.length / rowsPerPage)}
					rowsPerPage={rowsPerPage}
					handlePagination={handlePagination}
					handleDeleteMany={handleDeleteMany}
				/>
			</Wrapper>
		</Container>
	)
}

export default App
