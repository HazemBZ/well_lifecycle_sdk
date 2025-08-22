import React, { useState } from 'react'
import Icon from '../../../../components/AppIcon'
import Button from '../../../../components/ui/Button'

import Dropdown from '../../../../components/ui/Dropdown'

import { roleOptions } from '../TeamManagementTabOptions'
import { MemberSelectionModal } from './MemberSelectionModal'

const TeamManagementTab = ({ project, isCreating, wizardStep }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState(project?.team || [])

  // Remove user from team
  const handleRemoveUser = userId => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId))
  }

  return (
    <div>
      {/* Section title */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-neutral-900'>
          {isCreating ? 'Team Management' : 'Manage Project Team'}
        </h2>
        <p className='mt-1 text-sm text-neutral-500'>Assign team members to this project and set their permissions.</p>
      </div>

      {/* Team members list */}
      <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden mb-6'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-200'>
          <h3 className='text-lg font-medium text-neutral-900'>Team Members</h3>
          <Button variant='primary' icon='UserPlus' size='sm' onClick={() => setShowAddUserModal(true)}>
            Add Team Member
          </Button>
        </div>

        {selectedUsers.length === 0 ? (
          <div className='text-center py-12'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 mb-4'>
              <Icon name='Users' size={24} />
            </div>
            <h3 className='text-md font-medium text-neutral-900 mb-2'>No team members assigned</h3>
            <p className='text-neutral-500 max-w-md mx-auto mb-6'>
              This project doesn't have any team members assigned yet. Add team members to collaborate on this project.
            </p>
            <Button variant='primary' icon='UserPlus' onClick={() => setShowAddUserModal(true)}>
              Add Team Member
            </Button>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-neutral-200'>
              <thead className='bg-neutral-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    User
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Role
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Department
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Project Role
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-neutral-200'>
                {selectedUsers.map(user => (
                  <tr key={user.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='h-10 w-10 flex-shrink-0'>
                          <img className='h-10 w-10 rounded-full' src={user.avatar} alt={user.name} />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-neutral-900'>{user.name}</div>
                          <div className='text-sm text-neutral-500'>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500'>{user.role}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500'>{user.department}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Dropdown
                        options={roleOptions}
                        value={user.projectRole}
                        onChange={value => handleRoleChange(user.id, value)}
                      />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button className='text-error-600 hover:text-error-900' onClick={() => handleRemoveUser(user.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role descriptions */}
      <div className='bg-neutral-50 p-4 rounded-md mb-6'>
        <h3 className='text-md font-medium text-neutral-900 mb-4'>Role Permissions</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-white p-3 rounded border border-neutral-200'>
            <div className='flex items-center mb-2'>
              <Icon name='Eye' size={16} className='text-neutral-500 mr-2' />
              <h4 className='text-sm font-medium text-neutral-900'>Viewer</h4>
            </div>
            <p className='text-sm text-neutral-600'>Can view project data but cannot make any changes.</p>
          </div>
          <div className='bg-white p-3 rounded border border-neutral-200'>
            <div className='flex items-center mb-2'>
              <Icon name='Edit2' size={16} className='text-neutral-500 mr-2' />
              <h4 className='text-sm font-medium text-neutral-900'>Editor</h4>
            </div>
            <p className='text-sm text-neutral-600'>
              Can view and edit project data but cannot change project settings.
            </p>
          </div>
          <div className='bg-white p-3 rounded border border-neutral-200'>
            <div className='flex items-center mb-2'>
              <Icon name='UserPlus' size={16} className='text-neutral-500 mr-2' />
              <h4 className='text-sm font-medium text-neutral-900'>Contributor</h4>
            </div>
            <p className='text-sm text-neutral-600'>Can view, edit, and add new data to the project.</p>
          </div>
          <div className='bg-white p-3 rounded border border-neutral-200'>
            <div className='flex items-center mb-2'>
              <Icon name='Shield' size={16} className='text-neutral-500 mr-2' />
              <h4 className='text-sm font-medium text-neutral-900'>Administrator</h4>
            </div>
            <p className='text-sm text-neutral-600'>
              Full access to project data and settings, including team management.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons (only show when not in wizard mode) */}
      {!isCreating && (
        <div className='flex justify-end space-x-3'>
          <Button variant='tertiary'>Cancel</Button>
          <Button variant='primary' icon='Save'>
            Save Changes
          </Button>
        </div>
      )}

      {/* Wizard progress indicator */}
      {/* {isCreating && (
        <div className='mt-8 pt-6 border-t border-neutral-200'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex items-center relative'>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    wizardStep >= 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  1
                </div>
                <div
                  className={`ml-2 text-sm font-medium ${wizardStep >= 1 ? 'text-primary-600' : 'text-neutral-500'}`}
                >
                  Project Details
                </div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${wizardStep >= 1 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
              <div className='flex items-center relative'>
                <div className='rounded-full h-8 w-8 flex items-center justify-center bg-primary-600 text-white'>2</div>
                <div className='ml-2 text-sm font-medium text-primary-600'>Team Management</div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${wizardStep >= 3 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
              <div className='flex items-center relative'>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    wizardStep >= 3 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  3
                </div>
                <div
                  className={`ml-2 text-sm font-medium ${wizardStep >= 3 ? 'text-primary-600' : 'text-neutral-500'}`}
                >
                  Plugins
                </div>
              </div>
              <div className={`flex-grow mx-4 h-0.5 ${wizardStep >= 3 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
              <div className='flex items-center relative'>
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    wizardStep >= 4 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  4
                </div>
                <div
                  className={`ml-2 text-sm font-medium ${wizardStep >= 4 ? 'text-primary-600' : 'text-neutral-500'}`}
                >
                  Location
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Add User Modal */}
      {showAddUserModal && (
        <MemberSelectionModal
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          showAddUserModal={showAddUserModal}
          setShowAddUserModal={setShowAddUserModal}
        />
      )}
    </div>
  )
}

export default TeamManagementTab
