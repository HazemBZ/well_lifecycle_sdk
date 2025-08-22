import React, { useState } from 'react'
import Input from '../../../components/ui/Input'
import InputWithUnit from '../../../components/ui/InputWithUnit'
import Dropdown from '../../../components/ui/Dropdown'
import Button from '../../../components/ui/Button'

const AdvancedSettings = ({ project }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    // Units of Measurement
    depthUnit: project?.depthUnit || { value: 'm', label: 'meters (m)' },
    temperatureUnit: project?.temperatureUnit || { value: 'C', label: 'Celsius (°C)' },
    pressureUnit: project?.pressureUnit || { value: 'bar', label: 'bar' },
    volumeUnit: project?.volumeUnit || { value: 'm3', label: 'cubic meters (m³)' },
    flowRateUnit: project?.flowRateUnit || { value: 'm3/d', label: 'cubic meters per day (m³/d)' },

    // Reference Data
    datumReference: project?.datumReference || { value: 'msl', label: 'Mean Sea Level (MSL)' },
    coordinateSystem: project?.coordinateSystem || { value: 'wgs84', label: 'WGS 84' },

    // Data Retention
    dataRetentionPolicy: project?.dataRetentionPolicy || { value: 'indefinite', label: 'Indefinite' },
    archiveAfter: project?.archiveAfter || 365,
    deleteAfter: project?.deleteAfter || 730,

    // Access Control
    accessRestriction: project?.accessRestriction || { value: 'team', label: 'Team Members Only' },
    externalSharing: project?.externalSharing || false,
    requireApproval: project?.requireApproval || true,

    // Custom Fields
    customFields: project?.customFields || [
      { id: 1, name: 'Client ID', type: 'text', required: true },
      { id: 2, name: 'Contract Number', type: 'text', required: false },
      { id: 3, name: 'Project Code', type: 'text', required: true },
    ],
    newFieldName: '',
    newFieldType: { value: 'text', label: 'Text' },
    newFieldRequired: false,
  })

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle dropdown change
  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle checkbox change
  const handleCheckboxChange = name => {
    setFormData({
      ...formData,
      [name]: !formData[name],
    })
  }

  // Handle adding a new custom field
  const handleAddCustomField = () => {
    if (!formData.newFieldName) return

    const newField = {
      id: Date.now(),
      name: formData.newFieldName,
      type: formData.newFieldType.value,
      required: formData.newFieldRequired,
    }

    setFormData({
      ...formData,
      customFields: [...formData.customFields, newField],
      newFieldName: '',
      newFieldType: { value: 'text', label: 'Text' },
      newFieldRequired: false,
    })
  }

  // Handle removing a custom field
  const handleRemoveCustomField = id => {
    setFormData({
      ...formData,
      customFields: formData.customFields.filter(field => field.id !== id),
    })
  }

  // Unit options
  const depthUnitOptions = [
    { value: 'm', label: 'meters (m)' },
    { value: 'ft', label: 'feet (ft)' },
  ]

  const temperatureUnitOptions = [
    { value: 'C', label: 'Celsius (°C)' },
    { value: 'F', label: 'Fahrenheit (°F)' },
    { value: 'K', label: 'Kelvin (K)' },
  ]

  const pressureUnitOptions = [
    { value: 'bar', label: 'bar' },
    { value: 'psi', label: 'psi' },
    { value: 'kPa', label: 'kPa' },
  ]

  const volumeUnitOptions = [
    { value: 'm3', label: 'cubic meters (m³)' },
    { value: 'bbl', label: 'barrels (bbl)' },
    { value: 'ft3', label: 'cubic feet (ft³)' },
  ]

  const flowRateUnitOptions = [
    { value: 'm3/d', label: 'cubic meters per day (m³/d)' },
    { value: 'bbl/d', label: 'barrels per day (bbl/d)' },
    { value: 'MMscf/d', label: 'million standard cubic feet per day (MMscf/d)' },
  ]

  // Reference data options
  const datumReferenceOptions = [
    { value: 'msl', label: 'Mean Sea Level (MSL)' },
    { value: 'kb', label: 'Kelly Bushing (KB)' },
    { value: 'gl', label: 'Ground Level (GL)' },
    { value: 'wgs84', label: 'WGS 84 Ellipsoid' },
  ]

  const coordinateSystemOptions = [
    { value: 'wgs84', label: 'WGS 84' },
    { value: 'nad83', label: 'NAD 83' },
    { value: 'utm', label: 'UTM' },
    { value: 'osgb', label: 'OSGB 36' },
  ]

  // Data retention options
  const dataRetentionOptions = [
    { value: 'indefinite', label: 'Indefinite' },
    { value: 'custom', label: 'Custom Policy' },
  ]

  // Access restriction options
  const accessRestrictionOptions = [
    { value: 'team', label: 'Team Members Only' },
    { value: 'organization', label: 'Organization Wide' },
    { value: 'public', label: 'Public' },
  ]

  // Field type options
  const fieldTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
  ]

  return (
    <div>
      {/* Section title */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-neutral-900'>Advanced Settings</h2>
        <p className='mt-1 text-sm text-neutral-500'>
          Configure project-specific parameters, units of measurement, and reference data.
        </p>
      </div>

      <div className='space-y-8'>
        {/* Units of Measurement */}
        <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm'>
          <div className='px-6 py-4 border-b border-neutral-200'>
            <h3 className='text-lg font-medium text-neutral-900'>Units of Measurement</h3>
            <p className='mt-1 text-sm text-neutral-500'>Set the default units of measurement for this project.</p>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Dropdown
                label='Depth Unit'
                options={depthUnitOptions}
                value={formData.depthUnit}
                onChange={value => handleDropdownChange('depthUnit', value)}
              />
              <Dropdown
                label='Temperature Unit'
                options={temperatureUnitOptions}
                value={formData.temperatureUnit}
                onChange={value => handleDropdownChange('temperatureUnit', value)}
              />
              <Dropdown
                label='Pressure Unit'
                options={pressureUnitOptions}
                value={formData.pressureUnit}
                onChange={value => handleDropdownChange('pressureUnit', value)}
              />
              <Dropdown
                label='Volume Unit'
                options={volumeUnitOptions}
                value={formData.volumeUnit}
                onChange={value => handleDropdownChange('volumeUnit', value)}
              />
              <Dropdown
                label='Flow Rate Unit'
                options={flowRateUnitOptions}
                value={formData.flowRateUnit}
                onChange={value => handleDropdownChange('flowRateUnit', value)}
              />
            </div>
          </div>
        </div>

        {/* Reference Data */}
        <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm'>
          <div className='px-6 py-4 border-b border-neutral-200'>
            <h3 className='text-lg font-medium text-neutral-900'>Reference Data</h3>
            <p className='mt-1 text-sm text-neutral-500'>Configure reference data and coordinate systems.</p>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Dropdown
                label='Datum Reference'
                options={datumReferenceOptions}
                value={formData.datumReference}
                onChange={value => handleDropdownChange('datumReference', value)}
              />
              <Dropdown
                label='Coordinate System'
                options={coordinateSystemOptions}
                value={formData.coordinateSystem}
                onChange={value => handleDropdownChange('coordinateSystem', value)}
              />
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm'>
          <div className='px-6 py-4 border-b border-neutral-200'>
            <h3 className='text-lg font-medium text-neutral-900'>Data Retention</h3>
            <p className='mt-1 text-sm text-neutral-500'>Configure data retention policies for this project.</p>
          </div>
          <div className='p-6'>
            <div className='space-y-6'>
              <Dropdown
                label='Data Retention Policy'
                options={dataRetentionOptions}
                value={formData.dataRetentionPolicy}
                onChange={value => handleDropdownChange('dataRetentionPolicy', value)}
              />

              {formData.dataRetentionPolicy.value === 'custom' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <InputWithUnit
                    label='Archive Data After'
                    name='archiveAfter'
                    type='number'
                    value={formData.archiveAfter}
                    onChange={handleInputChange}
                    unit='days'
                  />
                  <InputWithUnit
                    label='Delete Data After'
                    name='deleteAfter'
                    type='number'
                    value={formData.deleteAfter}
                    onChange={handleInputChange}
                    unit='days'
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Access Control */}
        <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm'>
          <div className='px-6 py-4 border-b border-neutral-200'>
            <h3 className='text-lg font-medium text-neutral-900'>Access Control</h3>
            <p className='mt-1 text-sm text-neutral-500'>Configure access control and sharing settings.</p>
          </div>
          <div className='p-6'>
            <div className='space-y-6'>
              <Dropdown
                label='Access Restriction'
                options={accessRestrictionOptions}
                value={formData.accessRestriction}
                onChange={value => handleDropdownChange('accessRestriction', value)}
              />

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <input
                    id='externalSharing'
                    name='externalSharing'
                    type='checkbox'
                    className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded'
                    checked={formData.externalSharing}
                    onChange={() => handleCheckboxChange('externalSharing')}
                  />
                  <label htmlFor='externalSharing' className='ml-2 block text-sm text-neutral-900'>
                    Allow external sharing with specific users
                  </label>
                </div>

                <div className='flex items-center'>
                  <input
                    id='requireApproval'
                    name='requireApproval'
                    type='checkbox'
                    className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded'
                    checked={formData.requireApproval}
                    onChange={() => handleCheckboxChange('requireApproval')}
                  />
                  <label htmlFor='requireApproval' className='ml-2 block text-sm text-neutral-900'>
                    Require approval for new team members
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Fields */}
        <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm'>
          <div className='px-6 py-4 border-b border-neutral-200'>
            <h3 className='text-lg font-medium text-neutral-900'>Custom Fields</h3>
            <p className='mt-1 text-sm text-neutral-500'>Add custom fields to capture additional project metadata.</p>
          </div>
          <div className='p-6'>
            <div className='space-y-6'>
              {/* Existing custom fields */}
              {formData.customFields.length > 0 ? (
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-neutral-200'>
                    <thead className='bg-neutral-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                        >
                          Field Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                        >
                          Type
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider'
                        >
                          Required
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
                      {formData.customFields.map(field => (
                        <tr key={field.id}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-900'>{field.name}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500'>
                            {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500'>
                            {field.required ? (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800'>
                                Yes
                              </span>
                            ) : (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800'>
                                No
                              </span>
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <button
                              className='text-error-600 hover:text-error-900'
                              onClick={() => handleRemoveCustomField(field.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='text-center py-4 bg-neutral-50 rounded-md'>
                  <p className='text-neutral-500'>No custom fields defined yet.</p>
                </div>
              )}

              {/* Add new custom field */}
              <div className='mt-4 pt-4 border-t border-neutral-200'>
                <h4 className='text-md font-medium text-neutral-900 mb-4'>Add New Field</h4>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
                  <Input
                    label='Field Name'
                    name='newFieldName'
                    value={formData.newFieldName}
                    onChange={handleInputChange}
                    placeholder='Enter field name'
                  />
                  <Dropdown
                    label='Field Type'
                    options={fieldTypeOptions}
                    value={formData.newFieldType}
                    onChange={value => handleDropdownChange('newFieldType', value)}
                  />
                  <div className='flex items-center mb-2'>
                    <input
                      id='newFieldRequired'
                      name='newFieldRequired'
                      type='checkbox'
                      className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded'
                      checked={formData.newFieldRequired}
                      onChange={() => handleCheckboxChange('newFieldRequired')}
                    />
                    <label htmlFor='newFieldRequired' className='ml-2 block text-sm text-neutral-900'>
                      Required Field
                    </label>
                  </div>
                </div>
                <div className='mt-4'>
                  <Button
                    variant='secondary'
                    icon='Plus'
                    onClick={handleAddCustomField}
                    disabled={!formData.newFieldName}
                  >
                    Add Field
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {/* <div className="flex justify-end space-x-3">
          <Button variant="tertiary">
            Cancel
          </Button>
          <Button variant="primary" icon="Save">
            Save Settings
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default AdvancedSettings
