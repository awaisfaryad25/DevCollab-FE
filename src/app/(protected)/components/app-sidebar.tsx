import React from "react";

const AppSidebar = () => {

  const NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/dashboard",
    // icon: ,
  },
  {
    title: "Projects",
    url: "/projects",
    // icon: ,
  },
  {
    title: "Users",
    url: "/users",
    // icon: ,
  },
  {
    title: "Tasks",
    url: "/tasks",
    // icon: ,
  },
  {
    title: "Settings",
    url: "/company-settings",
    // icon: ,
  },
  {
    title: "Requests",
    url: "/admin/inbound-insights",
    // icon: ,
    adminOnly: true,
    expandable: true,
    subItems: [
      {
        title: "Incoming",
        url: "/incoming",
      },
      {
        title: "Outgoing",
        url: "/outgoing",
      },
      {
        title: "Activity",
        url: "/activity",
      },
    ],
  },
];

  return (
    <aside className="h-screen w-64 shrink-0 border-r bg-sidebar">
      <div className="flex h-full flex-col p-4">
        App Sidebar
      </div>
    </aside>
  );
};

export default AppSidebar;