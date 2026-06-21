import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className="">Dashboard</div>
      <div className=""></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-background rounded-lg min-h-40 flex items-center justify-center">bg-background</div>
        <div className="bg-muted rounded-lg min-h-40 flex items-center justify-center">bg-muted</div>
        <div className="bg-accent rounded-lg min-h-40 flex items-center justify-center">bg-accent</div>
        <div className="bg-sidebar rounded-lg min-h-40 flex items-center justify-center">bg-sidebar</div>
      </div>
    </div>
  )
}

export default Dashboard