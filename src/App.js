import { useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchBar from './components/SearchBar/SearchBar'

import axios from 'axios'

import { device } from './deviceConstants'
import AdminTable from './components/AdminTable.js'
import CustomPagination from './components/Pagination/Pagination'
import './table.css'
import { CircularProgress } from '@mui/material'

const Container = styled.div`
	min-height: 100vh;
	width: 100vw;
	padding: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: flex-start;
`
const Wrapper = styled.div`
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
const LoadingContainer = styled.div`
	border-radius: 8px;
	min-width: 300px;
	width: 100%;

	flex: 10;
	display: flex;
	justify-content: center;
	align-items: center;
`

function App() {
	const [data, setData] = useState([])
	const [input, setInput] = useState('')
	const [selected, setSelected] = useState([])
	const rowsPerPage = 10
	const [page, setPage] = useState(0)
	const [selectedAll, setSelectedAll] = useState(false)
	const [filteredData, setFilteredData] = useState(data)

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
		setFilteredData(formattedData)
	}

	const handleChecked = (e, row) => {
		if (e.target.checked) {
			setSelected([...selected, row])
		} else {
			const filteredRows = selected.filter((each) => each.id !== row.id)
			setSelected(filteredRows)
		}
		const updatedData = filteredData.map((each) => {
			if (each.id === row.id) {
				return {
					...each,
					isChecked: !each.isChecked,
				}
			}

			return each
		})

		setFilteredData(updatedData)
	}

	const handleSelectAll = (e) => {
		const selectedAllIds = filteredData
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((each) => each.id)

		if (e.target.checked) {
			const formatSelectedData = filteredData.map((each) => {
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

			setFilteredData(formatSelectedData)
			setSelectedAll(!selectedAll)
		} else {
			const formatSelectedData = filteredData.map((each) => {
				if (selectedAllIds.includes(each.id)) {
					return {
						...each,
						isChecked: false,
					}
				}
				return each
			})
			setSelected([])

			setFilteredData(formatSelectedData)
			setSelectedAll(!selectedAll)
		}
	}

	const handlePagination = (e, value) => {
		const selectedAllIds = filteredData
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((each) => each.id)
		const formatSelectedData = filteredData.map((each) => {
			if (selectedAllIds.includes(each.id)) {
				return {
					...each,
					isChecked: false,
				}
			}
			return each
		})
		setFilteredData(formatSelectedData)
		setPage(value - 1)
		setSelected([])
		setSelectedAll(false)
	}

	const handleDelete = (id) => {
		const updatedData = filteredData.filter((each) => each.id !== id)

		setFilteredData(updatedData)
	}

	const handleDeleteMany = () => {
		setSelectedAll(false)
		const selectedAllIds = selected.map((each) => each.id)

		const updatedData = filteredData.filter((each) => {
			if (!selectedAllIds.includes(each.id)) {
				return each
			}
			return null
		})

		setFilteredData(updatedData)
		setSelectedAll(false)
		setSelected([])
	}

	const searchTerm = (value) => {
		setInput(value)
		setSelectedAll(false)
		const filterData = data.filter((each) => {
			if (each.name.toLowerCase().includes(value.toLowerCase())) {
				return each
			} else if (each.role.toLowerCase().includes(value.toLowerCase())) {
				return each
			} else if (each.email.toLowerCase().includes(value.toLowerCase())) {
				return each
			}
			return null
		})

		setFilteredData(filterData)
	}

	return (
		<Container>
			<Wrapper>
				<SearchBar input={input} searchTerm={searchTerm} />
				{filteredData !== [] ? (
					<>
						<AdminTable
							data={filteredData}
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
							count={Math.ceil(filteredData.length / rowsPerPage)}
							rowsPerPage={rowsPerPage}
							handlePagination={handlePagination}
							handleDeleteMany={handleDeleteMany}
						/>
					</>
				) : (
					<LoadingContainer>
						<CircularProgress />
					</LoadingContainer>
				)}
			</Wrapper>
		</Container>
	)
}

export default App
