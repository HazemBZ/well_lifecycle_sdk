import { useMemo, useState } from 'react'
import InputSearch from '../../../../components/ui/InputSearch'

import Button from 'components/ui/Button'
import { useFormikContext } from 'formik'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { targetServer } from 'settings'
import Card from 'components/ui/Card'

// TODO: Assume logged in user is selected by default after implementing auth
function MemberSelectionModal({ selectedUsers, setSelectedUsers, setShowAddUserModal, showAddUserModal }) {
  const [searchQuery, setSearchQuery] = useState('')

  const { values, setValues } = useFormikContext()

  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['fetch-users'],
    queryFn: async () => {
      const resp = await axios.get(`http://${targetServer}/api/users/`).then(res => res.data)
      console.log('Fetched users:', resp)
      return resp
    },
    enabled: showAddUserModal,
    refetchOnMount: true,
  })

  const users = data

  const usersLoading = isLoading || isFetching

  const toggleMemberSelection = user => {
    const isSelected = selectedUsers.some(selectedUser => selectedUser.id === user.id)
    if (isSelected) {
      // Remove user from selectedUsers
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.id !== user.id))
      // Update formik
      setValues(prev => ({
        ...prev,
        members: prev.members.filter(member => member.id !== user.id),
      }))
    } else {
      // Add user to selectedUsers with default role 'viewer'
      const newUser = {
        ...user,
        role: user.role || 'viewer',
        projectRole: { value: 'viewer', label: 'Viewer', icon: 'Eye' },
      }
      setSelectedUsers([...selectedUsers, newUser])
      // Update formik
      setValues(prev => ({
        ...prev,
        members: [...prev.members, newUser],
      }))
      setShowAddUserModal(false)
    }
  }

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (usersLoading || users.length === 0) return []
    else {
      const found = users.filter(
        user =>
          !selectedUsers.some(selectedUser => selectedUser.id === user.id) &&
          (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()))
        // user.department.toLowerCase().includes(searchQuery.toLowerCase())
      )

      console.log('filteredUsers', found)

      return found
    }
  }, [users, selectedUsers, searchQuery, usersLoading])

  // Add user to team
  const handleAddUser = user => {
    const newUser = {
      ...user,
      projectRole: { value: 'viewer', label: 'Viewer', icon: 'Eye' },
    }
    setSelectedUsers([...selectedUsers, newUser])
    setShowAddUserModal(false)
  }

  // Update user role
  const handleRoleChange = (userId, newRole) => {
    setSelectedUsers(selectedUsers.map(user => (user.id === userId ? { ...user, projectRole: newRole } : user)))
  }

  // Handle search
  const handleSearch = query => {
    setSearchQuery(query)
  }

  // if (usersLoading)
  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-neutral-500 opacity-75'></div>
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                <h3 className='text-lg leading-6 font-medium text-neutral-900 mb-4'>Add Team Member</h3>
                {usersLoading ? (
                  <Card loading={true}>
                    <div className='h-40 flex items-center justify-center'>
                      <p className='text-neutral-500'>Loading users...</p>
                    </div>
                  </Card>
                ) : (
                  <>
                    <div className='mb-4'>
                      <InputSearch
                        isForm={false}
                        placeholder='Search users...'
                        value={searchQuery}
                        onSearch={handleSearch}
                        name='search'
                      />
                    </div>
                    <div className='max-h-60 overflow-y-auto'>
                      {!usersLoading && filteredUsers.length === 0 ? (
                        <div className='text-center py-4'>
                          <p className='text-neutral-500'>No users found matching your search.</p>
                        </div>
                      ) : (
                        <ul className='divide-y divide-neutral-200'>
                          {filteredUsers.map(user => (
                            <li
                              key={user.id}
                              className='py-3 flex items-center justify-between hover:bg-neutral-50 cursor-pointer px-2 rounded'
                              // onClick={() => handleAddUser(user)}
                            >
                              <div className='flex items-center'>
                                <img className='h-10 w-10 rounded-full' src={user.avatar} alt={user.name} />
                                <div className='ml-3'>
                                  <p className='text-sm font-medium text-neutral-900'>{user.name}</p>
                                  <p className='text-sm text-neutral-500'>{user.email}</p>
                                  <p className='text-xs text-neutral-500'>
                                    {user.role} • {user.department}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant='tertiary'
                                icon='Plus'
                                size='sm'
                                onClick={() => toggleMemberSelection(user)}
                              >
                                Add
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <Button variant='tertiary' onClick={() => setShowAddUserModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MemberSelectionModal }
