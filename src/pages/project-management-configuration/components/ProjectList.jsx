import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import InputSearch from "../../../components/ui/InputSearch";
import Dropdown from "../../../components/ui/Dropdown";

const ProjectList = ({ onSelectProject, onCreateProject, searchQuery }) => {
  const [sortBy, setSortBy] = useState({ value: "updated", label: "Last Updated" });
  const [filterStatus, setFilterStatus] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: "North Sea Exploration",
      description: "Offshore exploration project in the North Sea region focusing on new oil reserves discovery.",
      status: "active",
      location: "North Sea, Norway",
      wells: 12,
      team: 8,
      plugins: ["Logs", "Drilling", "Production", "Geology"],
      created: "2023-09-15T10:30:00Z",
      updated: "2023-11-28T14:45:00Z",
      thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Gulf of Mexico Development",
      description: "Development project for existing wells in the Gulf of Mexico with focus on production optimization.",
      status: "active",
      location: "Gulf of Mexico, USA",
      wells: 24,
      team: 15,
      plugins: ["Logs", "Production", "Geology", "Petrophysics"],
      created: "2023-05-22T08:15:00Z",
      updated: "2023-12-01T11:20:00Z",
      thumbnail: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      name: "Permian Basin Analysis",
      description: "Comprehensive analysis of existing wells in the Permian Basin to identify optimization opportunities.",
      status: "completed",
      location: "Permian Basin, Texas, USA",
      wells: 45,
      team: 12,
      plugins: ["Logs", "Production", "Geology", "Petrophysics", "Surveys"],
      created: "2023-02-10T09:45:00Z",
      updated: "2023-10-15T16:30:00Z",
      thumbnail: "https://images.unsplash.com/photo-1586076100131-32505c71d0d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 4,
      name: "Caspian Sea Exploration",
      description: "New exploration project in the Caspian Sea region with focus on deep-water reserves.",
      status: "planning",
      location: "Caspian Sea, Azerbaijan",
      wells: 3,
      team: 9,
      plugins: ["Logs", "Drilling", "Geology", "Surveys"],
      created: "2023-11-05T13:20:00Z",
      updated: "2023-12-02T09:10:00Z",
      thumbnail: "https://images.pixabay.com/photo/2020/05/23/08/23/oil-platform-5209259_1280.jpg"
    },
    {
      id: 5,
      name: "North Dakota Shale",
      description: "Shale oil development project in the Bakken formation of North Dakota.",
      status: "active",
      location: "Bakken, North Dakota, USA",
      wells: 32,
      team: 18,
      plugins: ["Logs", "Drilling", "Production", "Geology", "Petrophysics"],
      created: "2023-03-18T11:00:00Z",
      updated: "2023-11-20T15:45:00Z",
      thumbnail: "https://images.pexels.com/photos/162568/oil-industry-pump-jack-sunset-162568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 6,
      name: "Brazilian Pre-Salt",
      description: "Deep-water pre-salt exploration and development project offshore Brazil.",
      status: "active",
      location: "Santos Basin, Brazil",
      wells: 8,
      team: 21,
      plugins: ["Logs", "Drilling", "Production", "Geology", "Petrophysics", "Surveys", "Mudlogging"],
      created: "2023-07-12T14:30:00Z",
      updated: "2023-11-30T10:15:00Z",
      thumbnail: "https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
    }
  ];

  // Sort options
  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "nameDesc", label: "Name (Z-A)" },
    { value: "created", label: "Date Created" },
    { value: "updated", label: "Last Updated" },
    { value: "wells", label: "Number of Wells" }
  ];

  // Status filter options
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active", icon: "Activity" },
    { value: "planning", label: "Planning", icon: "Calendar" },
    { value: "completed", label: "Completed", icon: "CheckCircle" },
    { value: "archived", label: "Archived", icon: "Archive" }
  ];

  // Filter projects based on search query and status
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = searchQuery
      ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesStatus = filterStatus && filterStatus.value !== "all"
      ? project.status === filterStatus.value
      : true;
    
    return matchesSearch && matchesStatus;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "created":
        return new Date(b.created) - new Date(a.created);
      case "updated":
        return new Date(b.updated) - new Date(a.updated);
      case "wells":
        return b.wells - a.wells;
      default:
        return 0;
    }
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-500 bg-opacity-10 text-success-600">
            <Icon name="Activity" size={12} className="mr-1" />
            Active
          </span>
        );
      case "planning":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-500 bg-opacity-10 text-info-600">
            <Icon name="Calendar" size={12} className="mr-1" />
            Planning
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-500 bg-opacity-10 text-neutral-600">
            <Icon name="CheckCircle" size={12} className="mr-1" />
            Completed
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-300 bg-opacity-20 text-neutral-500">
            <Icon name="Archive" size={12} className="mr-1" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-64">
          <InputSearch
            placeholder="Search projects..."
            value={searchQuery}
            onSearch={(query) => {}}
          />
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
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            icon="ArrowUpDown"
          />
          <div className="flex border border-neutral-300 rounded-md">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-500 hover:text-neutral-700'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Icon name="Grid" size={18} />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-500 hover:text-neutral-700'}`}
              onClick={() => setViewMode('list')}
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
          <Button
            variant="primary"
            icon="Plus"
            onClick={onCreateProject}
          >
            Create New Project
          </Button>
        </div>
      )}

      {/* Grid view */}
      {sortedProjects.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={project.thumbnail} 
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
      {sortedProjects.length > 0 && viewMode === 'list' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Wells
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {sortedProjects.map((project) => (
                <tr 
                  key={project.id}
                  className="hover:bg-neutral-50 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.name} 
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{project.name}</div>
                        <div className="text-sm text-neutral-500 truncate max-w-xs">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(project.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {project.wells}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {project.team}
                  </td>
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
  );
};

export default ProjectList;