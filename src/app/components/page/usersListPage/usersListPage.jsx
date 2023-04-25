import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/Pagination'
import GroupList from '../../common/GroupList'
import PropTypes from 'prop-types'
import api from '../../../api'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import _ from 'lodash'
import { useUser } from '../../../hooks/useUsers'

const UsersListPage = () => {
    const [currentPege, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [serchQuery, setSerchQuery] = useState('')
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

    const pageSize = 8

    const { users } = useUser()
    // console.log(users)

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // return newArray
        console.log(newArray)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data)
        })
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, serchQuery])

    const handleProfessionsSelect = (item) => {
        if (serchQuery !== '') setSerchQuery('')
        setSelectedProf(item)
    }

    const handleSerchQuery = ({ target }) => {
        setSelectedProf(undefined)
        setSerchQuery(target.value)
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = serchQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(serchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userGrop = paginate(sortedUsers, currentPege, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionsSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Сброс
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type={'text'}
                        name="serchQuery"
                        onChange={handleSerchQuery}
                        value={serchQuery}
                        placeholder="Search..."
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userGrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPege={currentPege}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'Loading...'
}
UsersListPage.propTypes = {
    users: PropTypes.array
}
export default UsersListPage
