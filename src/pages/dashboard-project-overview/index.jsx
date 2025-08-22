import React, { useState, useEffect, useMemo } from 'react'
import Button from '../../components/ui/Button'
import InputSearch from '../../components/ui/InputSearch'
import Icon from '../../components/AppIcon'
import ProjectCard from './components/ProjectCard'
import MetricsOverview from './components/MetricsOverview'
import RecentActivity from './components/RecentActivity'
import FavoriteWorkspaces from './components/FavoriteWorkspaces'
import { favoriteWorkspaces, metrics, projects, recentActivities, user } from '../../mockData/dashboardMockData'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const projectSample = {
  id: 1,
  name: 'Eagle Ford Shale Development',
  description:
    'Multi-well development project in the Eagle Ford shale formation focusing on horizontal drilling and hydraulic fracturing optimization.',
  status: 'active',
  progress: 68,
  location: 'Texas, USA',
  lastUpdated: '2023-05-15T14:30:00Z',
  tags: ['Shale', 'Horizontal', 'Fracturing'],
  team: [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Aisha Patel',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ],
  metrics: {
    wells: 12,
    completions: 8,
    production: '4,500 BOE/d',
  },
}

const transformProject = ({
  id,
  name,
  description,
  status = 'active',
  progress = 69,
  location = 'Texas, USA',
  lastUpdated = '2023-05-15T14:30:00Z',
  tags = [],
  team = [],
  metrics = {
    wells: 12,
    completions: 8,
    production: '4,500 BOE/d',
  },
}) => ({
  id,
  name,
  description,
  status,
  progress,
  location,
  lastUpdated,
  tags,
  team,
  metrics,
})

const DashboardProjectOverview = () => {
  const navigate = useNavigate()

  const { data = [], isLoading } = useQuery({
    queryKey: ['dashboardProjects'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/projects/').then(res => res.data)
      console.log('Fetched projects:', response)
      return response
    },
  })

  const [searchQuery, setSearchQuery] = useState('')

  // const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    let filtered = [...projects]
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = projects.filter(
        project =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.status === activeFilter)
    }

    return filtered
  })

  // Handle search
  const handleSearch = query => {
    setSearchQuery(query)
  }

  // Handle filter change
  const handleFilterChange = filter => {
    setActiveFilter(filter)
  }

  return (
    <>
      <main className='flex-1 overflow-y-auto p-4 md:p-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Dashboard header */}
          <div className='flex flex-col md:flex-row md:items-center justify-between mb-6'>
            <div>
              <h1 className='text-2xl font-bold text-neutral-900'>Dashboard</h1>
              <p className='text-neutral-500 mt-1'>Welcome back, {user.name}</p>
            </div>
            <div className='mt-4 md:mt-0 flex items-center space-x-3'>
              <InputSearch placeholder='Search projects...' onSearch={handleSearch} className='w-full md:w-64' />
              <Button icon='Plus' variant='primary' onClick={() => navigate('/dashboard/projects/new')}>
                Create New Project
              </Button>
            </div>
          </div>

          {/* Metrics overview */}
          <MetricsOverview metrics={metrics} />

          {/* Projects section */}
          <div className='mt-8'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold text-neutral-900'>Projects</h2>
              <div className='mt-3 md:mt-0 flex flex-wrap items-center space-x-2'>
                <Button
                  size='sm'
                  variant={activeFilter === 'all' ? 'primary' : 'secondary'}
                  onClick={() => handleFilterChange('all')}
                >
                  All
                </Button>
                <Button
                  size='sm'
                  variant={activeFilter === 'active' ? 'primary' : 'secondary'}
                  onClick={() => handleFilterChange('active')}
                >
                  Active
                </Button>
                <Button
                  size='sm'
                  variant={activeFilter === 'planning' ? 'primary' : 'secondary'}
                  onClick={() => handleFilterChange('planning')}
                >
                  Planning
                </Button>
                <Button
                  size='sm'
                  variant={activeFilter === 'completed' ? 'primary' : 'secondary'}
                  onClick={() => handleFilterChange('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Projects grid */}
            {
              (filteredProjects.length > 0 && !isLoading,
              data.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {[...data.slice(0, 5).map(p => transformProject(p)), ...filteredProjects].map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className='bg-white rounded-lg border border-neutral-200 p-8 text-center'>
                  <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-100'>
                    <Icon name='Search' size={24} className='text-neutral-500' />
                  </div>
                  <h3 className='mt-2 text-lg font-medium text-neutral-900'>No projects found</h3>
                  <p className='mt-1 text-neutral-500'>
                    {searchQuery
                      ? `No projects matching "${searchQuery}"`
                      : 'No projects available for the selected filter'}
                  </p>
                  <div className='mt-6'>
                    <Button variant='primary' icon='Plus' onClick={() => navigate('/dashboard/projects/new')}>
                      Create New Project
                    </Button>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Activity and workspaces section */}
          <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Recent activity */}
            <div className='lg:col-span-2'>
              <RecentActivity activities={recentActivities} />
            </div>

            {/* Favorite workspaces */}
            <div>
              <FavoriteWorkspaces workspaces={favoriteWorkspaces} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default DashboardProjectOverview
