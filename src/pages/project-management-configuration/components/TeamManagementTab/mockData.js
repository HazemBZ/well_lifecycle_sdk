// Import type options
export const importTypeOptions = [
  { value: 'wells', label: 'Wells', icon: 'Database' },
  { value: 'logs', label: 'Well Logs', icon: 'LineChart' },
  { value: 'production', label: 'Production Data', icon: 'BarChart3' },
  { value: 'surveys', label: 'Well Surveys', icon: 'Route' },
]

// Mock field mapping options
export const fieldMappingOptions = {
  wells: [
    { value: 'name', label: 'Well Name', required: true },
    { value: 'uwi', label: 'UWI/API', required: true },
    { value: 'latitude', label: 'Latitude', required: true },
    { value: 'longitude', label: 'Longitude', required: true },
    { value: 'elevation', label: 'Elevation', required: false },
    { value: 'total_depth', label: 'Total Depth', required: false },
    { value: 'spud_date', label: 'Spud Date', required: false },
    { value: 'completion_date', label: 'Completion Date', required: false },
    { value: 'status', label: 'Well Status', required: false },
    { value: 'type', label: 'Well Type', required: false },
  ],
  logs: [
    { value: 'uwi', label: 'UWI/API', required: true },
    { value: 'log_name', label: 'Log Name', required: true },
    { value: 'log_date', label: 'Log Date', required: false },
    { value: 'top_depth', label: 'Top Depth', required: true },
    { value: 'bottom_depth', label: 'Bottom Depth', required: true },
    { value: 'step', label: 'Step', required: false },
    { value: 'unit', label: 'Unit', required: false },
  ],
  production: [
    { value: 'uwi', label: 'UWI/API', required: true },
    { value: 'date', label: 'Production Date', required: true },
    { value: 'oil', label: 'Oil Production', required: false },
    { value: 'gas', label: 'Gas Production', required: false },
    { value: 'water', label: 'Water Production', required: false },
    { value: 'days', label: 'Days On', required: false },
  ],
  surveys: [
    { value: 'uwi', label: 'UWI/API', required: true },
    { value: 'md', label: 'Measured Depth', required: true },
    { value: 'inclination', label: 'Inclination', required: true },
    { value: 'azimuth', label: 'Azimuth', required: true },
    { value: 'tvd', label: 'TVD', required: false },
    { value: 'north', label: 'North/South', required: false },
    { value: 'east', label: 'East/West', required: false },
  ],
}

// Mock CSV header options based on file
export const mockFileHeaders = [
  { value: 'column1', label: 'Well Name' },
  { value: 'column2', label: 'API Number' },
  { value: 'column3', label: 'Latitude' },
  { value: 'column4', label: 'Longitude' },
  { value: 'column5', label: 'KB Elevation' },
  { value: 'column6', label: 'Total Depth' },
  { value: 'column7', label: 'Spud Date' },
  { value: 'column8', label: 'Completion Date' },
  { value: 'column9', label: 'Status' },
  { value: 'column10', label: 'Well Type' },
]

// Mock preview data
export const mockPreviewData = {
  headers: [
    'Well Name',
    'API Number',
    'Latitude',
    'Longitude',
    'KB Elevation',
    'Total Depth',
    'Spud Date',
    'Completion Date',
    'Status',
    'Well Type',
  ],
  rows: [
    [
      'Well A-1',
      '42-123-45678',
      '29.7604',
      '-95.3698',
      '50',
      '10500',
      '2023-01-15',
      '2023-03-20',
      'Producing',
      'Development',
    ],
    [
      'Well B-2',
      '42-123-45679',
      '29.7605',
      '-95.3699',
      '52',
      '10200',
      '2023-02-10',
      '2023-04-15',
      'Producing',
      'Development',
    ],
    [
      'Well C-3',
      '42-123-45680',
      '29.7606',
      '-95.3700',
      '48',
      '10800',
      '2023-03-05',
      '2023-05-10',
      'Drilling',
      'Exploration',
    ],
    [
      'Well D-4',
      '42-123-45681',
      '29.7607',
      '-95.3701',
      '51',
      '10300',
      '2023-04-20',
      '2023-06-25',
      'Completed',
      'Development',
    ],
    [
      'Well E-5',
      '42-123-45682',
      '29.7608',
      '-95.3702',
      '49',
      '11000',
      '2023-05-15',
      '2023-07-20',
      'Producing',
      'Development',
    ],
  ],
}

// Mock validation errors
export const mockValidationErrors = [
  { row: 3, column: 'Latitude', message: 'Invalid latitude value' },
  { row: 4, column: 'API Number', message: 'API number format is incorrect' },
  { row: 5, column: 'Spud Date', message: 'Date format should be YYYY-MM-DD' },
]
