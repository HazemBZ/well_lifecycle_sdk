import React, { useState } from "react"
import Icon from "../../../components/AppIcon"
import Button from "../../../components/ui/Button"
import InputSearch from "../../../components/ui/InputSearch"
import Dropdown from "../../../components/ui/Dropdown"
import { mockProjects, sortOptions, statusOptions } from "../projectMockData"

const ProjectList = ({ onSelectProject, onCreateProject, searchQuery }) => {
  const [sortBy, setSortBy] = useState({ value: "updated", label: "Last Updated" })
  const [filterStatus, setFilterStatus] = useState(null)
  const [viewMode, setViewMode] = useState("grid")

  // Filter projects based on search query and status
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = searchQuery
      ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesStatus = filterStatus && filterStatus.value !== "all" ? project.status === filterStatus.value : true

    return matchesSearch && matchesStatus
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.name.localeCompare(b.name)
      case "nameDesc":
        return b.name.localeCompare(a.name)
      case "created":
        return new Date(b.created) - new Date(a.created)
      case "updated":
        return new Date(b.updated) - new Date(a.updated)
      case "wells":
        return b.wells - a.wells
      default:
        return 0
    }
  })

  // Format date
  const formatDate = dateString => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = status => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 bg-opacity-10 text-success-600">
            <Icon name="Activity" size={12} className="mr-1" />
            Active
          </span>
        )
      case "planning":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-500 bg-opacity-10 text-info-600">
            <Icon name="Calendar" size={12} className="mr-1" />
            Planning
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-500 bg-opacity-10 text-neutral-600">
            <Icon name="CheckCircle" size={12} className="mr-1" />
            Completed
          </span>
        )
      case "archived":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-300 bg-opacity-20 text-neutral-500">
            <Icon name="Archive" size={12} className="mr-1" />
            Archived
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-64">
          <InputSearch placeholder="Search projects..." value={searchQuery} onSearch={query => {}} />
        </div>
        <div className="flex items-center space-x-4">
          <Dropdown
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by Status"
            icon="Filter"
            clearable
          />
          <Dropdown options={sortOptions} value={sortBy} onChange={setSortBy} icon="ArrowUpDown" />
          <div className="flex border border-neutral-300 rounded-md">
            <button
              className={`p-2 ${
                viewMode === "grid" ? "bg-neutral-100 text-neutral-800" : "text-neutral-500 hover:text-neutral-700"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Icon name="Grid" size={18} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list" ? "bg-neutral-100 text-neutral-800" : "text-neutral-500 hover:text-neutral-700"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-500 mb-4">
            <Icon name="FolderOpen" size={32} />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects found</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-6">
            {searchQuery
              ? `No projects match your search "${searchQuery}". Try adjusting your search or filters.`
              : "You haven't created any projects yet. Get started by creating your first project."}
          </p>
          <Button variant="primary" icon="Plus" onClick={onCreateProject}>
            Create New Project
          </Button>
        </div>
      )}

      {/* Grid view */}
      {sortedProjects.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map(project => (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              <div className="h-40 overflow-hidden">
                <img
                  //src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-neutral-900 truncate">{project.name}</h3>
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex items-center text-neutral-500 text-sm mb-3">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-neutral-500">
                    <Icon name="Database" size={14} className="mr-1" />
                    <span>{project.wells} Wells</span>
                  </div>
                  <div className="flex items-center text-neutral-500">
                    <Icon name="Users" size={14} className="mr-1" />
                    <span>{project.team} Team Members</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-500">
                  Updated {formatDate(project.updated)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {sortedProjects.length > 0 && viewMode === "list" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Project
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Wells
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Team
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {sortedProjects.map(project => (
                <tr
                  key={project.id}
                  className="hover:bg-neutral-50 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                        <img src={project.thumbnail} alt={project.name} className="h-10 w-10 object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{project.name}</div>
                        <div className="text-sm text-neutral-500 truncate max-w-xs">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{project.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(project.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{project.wells}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{project.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {formatDate(project.updated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProjectList
