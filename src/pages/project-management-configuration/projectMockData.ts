
  // Mock projects data
  export const mockProjects = [
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
  export const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "nameDesc", label: "Name (Z-A)" },
    { value: "created", label: "Date Created" },
    { value: "updated", label: "Last Updated" },
    { value: "wells", label: "Number of Wells" }
  ];

  // Status filter options
  export const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active", icon: "Activity" },
    { value: "planning", label: "Planning", icon: "Calendar" },
    { value: "completed", label: "Completed", icon: "CheckCircle" },
    { value: "archived", label: "Archived", icon: "Archive" }
  ];
