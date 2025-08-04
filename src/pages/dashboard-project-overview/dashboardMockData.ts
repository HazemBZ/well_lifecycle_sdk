 // Mock user data
  export const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@petrodigital.com",
    initials: "SJ",
    role: "Senior Geologist",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  };

  // Mock projects data
  export const projects = [
    {
      id: 1,
      name: "Eagle Ford Shale Development",
      description: "Multi-well development project in the Eagle Ford shale formation focusing on horizontal drilling and hydraulic fracturing optimization.",
      status: "active",
      progress: 68,
      location: "Texas, USA",
      lastUpdated: "2023-05-15T14:30:00Z",
      tags: ["Shale", "Horizontal", "Fracturing"],
      team: [
        { id: 1, name: "Sarah Johnson", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, name: "Michael Chen", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Aisha Patel", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
      ],
      metrics: {
        wells: 12,
        completions: 8,
        production: "4,500 BOE/d"
      }
    },
    {
      id: 2,
      name: "North Sea Exploration",
      description: "Offshore exploration project in the North Sea targeting deep-water prospects with high potential for oil discovery.",
      status: "planning",
      progress: 25,
      location: "North Sea, Norway",
      lastUpdated: "2023-05-10T09:15:00Z",
      tags: ["Offshore", "Exploration", "Deep-water"],
      team: [
        { id: 4, name: "Erik Larsen", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
        { id: 5, name: "Olivia Wilson", avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
      ],
      metrics: {
        wells: 2,
        completions: 0,
        production: "N/A"
      }
    },
    {
      id: 3,
      name: "Permian Basin Optimization",
      description: "Production optimization project for existing wells in the Permian Basin using advanced analytics and artificial lift technologies.",
      status: "active",
      progress: 82,
      location: "New Mexico, USA",
      lastUpdated: "2023-05-18T11:45:00Z",
      tags: ["Production", "Optimization", "Analytics"],
      team: [
        { id: 6, name: "James Rodriguez", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
        { id: 7, name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
        { id: 8, name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/42.jpg" }
      ],
      metrics: {
        wells: 35,
        completions: 35,
        production: "12,800 BOE/d"
      }
    },
    {
      id: 4,
      name: "Gulf of Mexico Deepwater",
      description: "Deepwater development project in the Gulf of Mexico focusing on subsea infrastructure and floating production systems.",
      status: "active",
      progress: 45,
      location: "Gulf of Mexico, USA",
      lastUpdated: "2023-05-12T16:20:00Z",
      tags: ["Deepwater", "Subsea", "Floating Production"],
      team: [
        { id: 9, name: "Carlos Mendez", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
        { id: 10, name: "Sophia Lee", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }
      ],
      metrics: {
        wells: 5,
        completions: 3,
        production: "25,000 BOE/d"
      }
    },
    {
      id: 5,
      name: "Bakken Shale Infill Drilling",
      description: "Infill drilling program in the Bakken shale formation to increase recovery and optimize field development.",
      status: "completed",
      progress: 100,
      location: "North Dakota, USA",
      lastUpdated: "2023-04-28T13:10:00Z",
      tags: ["Infill", "Shale", "Recovery"],
      team: [
        { id: 11, name: "Robert Johnson", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
        { id: 12, name: "Jennifer Wu", avatar: "https://randomuser.me/api/portraits/women/17.jpg" }
      ],
      metrics: {
        wells: 18,
        completions: 18,
        production: "6,200 BOE/d"
      }
    },
    {
      id: 6,
      name: "Brazil Pre-Salt Exploration",
      description: "Exploration project targeting pre-salt formations offshore Brazil with potential for significant hydrocarbon discoveries.",
      status: "planning",
      progress: 15,
      location: "Santos Basin, Brazil",
      lastUpdated: "2023-05-05T10:30:00Z",
      tags: ["Pre-salt", "Exploration", "Offshore"],
      team: [
        { id: 13, name: "Luiz Silva", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
        { id: 14, name: "Maria Santos", avatar: "https://randomuser.me/api/portraits/women/59.jpg" }
      ],
      metrics: {
        wells: 1,
        completions: 0,
        production: "N/A"
      }
    }
  ];

  // Mock metrics data
  export const metrics = {
    activeProjects: 4,
    completedProjects: 1,
    planningProjects: 2,
    totalWells: 73,
    activeWells: 52,
    totalProduction: "48,500 BOE/d",
    recentActivities: 28,
    pendingTasks: 12
  };

  // Mock recent activity data
  export const recentActivities = [
    {
      id: 1,
      type: "update",
      project: "Eagle Ford Shale Development",
      user: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Updated drilling plan for Well EF-103",
      timestamp: "2023-05-18T15:30:00Z"
    },
    {
      id: 2,
      type: "comment",
      project: "Permian Basin Optimization",
      user: "Emma Thompson",
      userAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
      description: "Added comment on production decline analysis",
      timestamp: "2023-05-18T14:15:00Z"
    },
    {
      id: 3,
      type: "file",
      project: "Gulf of Mexico Deepwater",
      user: "Carlos Mendez",
      userAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
      description: "Uploaded new seismic interpretation report",
      timestamp: "2023-05-18T11:45:00Z"
    },
    {
      id: 4,
      type: "task",
      project: "North Sea Exploration",
      user: "Olivia Wilson",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      description: "Completed environmental impact assessment",
      timestamp: "2023-05-18T09:20:00Z"
    },
    {
      id: 5,
      type: "meeting",
      project: "Eagle Ford Shale Development",
      user: "Sarah Johnson",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Scheduled team meeting for fracturing design review",
      timestamp: "2023-05-17T16:30:00Z"
    }
  ];

  // Mock favorite workspaces data
  export const favoriteWorkspaces = [
    {
      id: 1,
      name: "Eagle Ford Geology",
      description: "Geological analysis workspace for Eagle Ford project",
      icon: "Mountain",
      color: "bg-primary-100 text-primary-700",
      lastAccessed: "2023-05-18T10:15:00Z"
    },
    {
      id: 2,
      name: "Permian Production",
      description: "Production monitoring dashboard for Permian Basin",
      icon: "BarChart3",
      color: "bg-success-100 text-success-700",
      lastAccessed: "2023-05-17T14:30:00Z"
    },
    {
      id: 3,
      name: "Gulf of Mexico Drilling",
      description: "Real-time drilling data visualization",
      icon: "Drill",
      color: "bg-warning-100 text-warning-700",
      lastAccessed: "2023-05-16T09:45:00Z"
    }
  ];

  // Mock notifications data
  export const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Production Alert",
      description: "Sudden pressure drop detected in Well PB-24 (Permian Basin)",
      timestamp: "2023-05-18T14:30:00Z",
      read: false
    },
    {
      id: 2,
      type: "update",
      title: "System Update",
      description: "Well Lifecycle SDK v2.3.1 has been deployed with new features",
      timestamp: "2023-05-18T09:15:00Z",
      read: false
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "Michael Chen shared drilling parameters for review",
      timestamp: "2023-05-17T16:45:00Z",
      read: true
    },
    {
      id: 4,
      type: "task",
      title: "Task Assignment",
      description: "You\'ve been assigned to review seismic data for North Sea project",
      timestamp: "2023-05-17T11:20:00Z",
      read: true
    },
    {
      id: 5,
      type: "calendar",
      title: "Meeting Reminder",
      description: "Project review meeting for Eagle Ford in 30 minutes",
      timestamp: "2023-05-18T15:00:00Z",
      read: false
    }
  ];
