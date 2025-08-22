import React, { useState } from 'react'
import Input from '../../../components/ui/Input'
import Dropdown from '../../../components/ui/Dropdown'
import * as Yup from 'yup'
import { statusOptions, countryOptions } from './ProjectDetailsTabOptions'
import { useFormikContext } from 'formik'

const createPorjectSchema = Yup.object().shape({
  projectname: Yup.string().required('Required'),
  description: Yup.string(),
  country: Yup.string().test(
    'country-selected',
    'country must be selected',
    (value, ctx) => !(ctx.parent.projectionType === 'MANUAL' && !countries.find(el => el.code === ctx.parent.country))
  ),
  unitSystem: Yup.string().required(),
  deadline: Yup.date(),
  projectionType: Yup.string().required(),
  projectionName: Yup.string(),
  resampleStart: Yup.number(),
  resampleStop: Yup.number(),
  resampleStep: Yup.number(),
  interpolation: Yup.string(),
})

// .post('projects/createproject/', data)

function ProjectDetailsTab({ project, isCreating }) {
  // Handle project save

  // State for form fields
  // const [formData, setFormData] = useState({
  //   projectname: project?.name || '',
  //   description: project?.description || '',
  //   country: project?.country || '',
  //   status: project?.status
  //     ? {
  //         value: project.status,
  //         label: project.status.charAt(0).toUpperCase() + project.status.slice(1),
  //       }
  //     : { value: 'planning', label: 'Planning' },
  //   type: project?.type
  //     ? {
  //         value: project.type,
  //         label: project.type.charAt(0).toUpperCase() + project.type.slice(1),
  //       }
  //     : { value: 'exploration', label: 'Exploration' },
  //   startDate: project?.startDate || '',
  //   deadline: project?.deadline || project?.endDate || '',
  //   budget: project?.budget || '',
  //   currency: project?.currency
  //     ? {
  //         value: project.currency,
  //         label: project.currency,
  //       }
  //     : { value: 'USD', label: 'USD' },
  //   client: project?.client || '',
  //   operator: project?.operator || '',
  //   tags: project?.tags || [],
  // })

  // // Handle input change
  // const handleInputChange = e => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })
  // }

  // // Handle dropdown change
  // const handleDropdownChange = (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })
  // }

  const { values, handleChange, setValues } = useFormikContext()

  return (
    <>
      {/* Form */}
      {/* Section title */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-neutral-900'>
          {isCreating ? 'Create New Project' : 'Edit Project Details'}
        </h2>
        <p className='mt-1 text-sm text-neutral-500'>
          {isCreating
            ? 'Enter the basic information to set up your new project.'
            : 'Update the project details and metadata.'}
        </p>
      </div>
      <div className='space-y-6'>
        {/* Basic Information */}
        <div className='bg-neutral-50 p-4 rounded-md'>
          <h3 className='text-md font-medium text-neutral-900 mb-4'>Basic Information</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              label='Project Name'
              name='projectname'
              value={values.name}
              onChange={handleChange}
              placeholder='Enter project name'
              required
            />
            <Dropdown
              label='Project Status'
              name='projectStatus'
              options={statusOptions}
              value={values.projectStatus}
              onChange={statObj => setValues(() => ({ ...values, projectStatus: statObj }))}
              required
            />
            <div className='md:col-span-2'>
              <Input
                label='Description'
                name='description'
                value={values.description}
                onChange={handleChange}
                placeholder='Enter project description'
              />
            </div>
            {/* <Dropdown
              label='Project Type'
              options={typeOptions}
              value={formData.type}
              onChange={value => handleDropdownChange('type', value)}
            /> */}
            {/* <Dropdown
              label='Tags'
              options={tagOptions}
              value={formData.tags}
              onChange={value => handleDropdownChange('tags', value)}
              multiple
              searchable
            /> */}
            <Dropdown
              label='Country'
              name='country'
              options={countryOptions}
              value={values.country}
              onChange={countryObject => setValues(() => ({ ...values, country: countryObject }))}
            />
          </div>
        </div>

        {/* Timeline and Budget */}
        <div className='bg-neutral-50 p-4 rounded-md'>
          <h3 className='text-md font-medium text-neutral-900 mb-4'>Timeline and Budget</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* <Input
              label='Start Date'
              name='startDate'
              type='date'
              value={formData.startDate}
              onChange={handleInputChange}
            /> */}
            <Input label='End Date' name='deadline' type='date' value={values.deadline} onChange={handleChange} />
            <div className='flex space-x-4'>
              <div className='flex-1'>
                {/* <Input
                  label='Budget'
                  name='budget'
                  type='number'
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder='Enter budget amount'
                /> */}
              </div>
              <div className='w-24'>
                {/* <Dropdown
                  label='Currency'
                  options={currencyOptions}
                  value={formData.currency}
                  onChange={value => handleDropdownChange('currency', value)}
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Organization */}
        {/* <div className='bg-neutral-50 p-4 rounded-md'>
          <h3 className='text-md font-medium text-neutral-900 mb-4'>Organization</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              label='Client'
              name='client'
              value={formData.client}
              onChange={handleInputChange}
              placeholder='Enter client name'
            />
            <Input
              label='Operator'
              name='operator'
              value={formData.operator}
              onChange={handleInputChange}
              placeholder='Enter operator name'
            />
          </div>
        </div> */}

        {/* Action buttons (only show when not in wizard mode) */}
      </div>
    </>
  )
}

export { ProjectDetailsTab }
