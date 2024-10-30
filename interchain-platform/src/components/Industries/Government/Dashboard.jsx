import React from 'react';

const GovernmentDashboard = () => {
  const stats = [
    {
      name: 'Active Services',
      value: '245',
      change: '+3.2%',
      changeType: 'positive',
    },
    {
      name: 'Daily Requests',
      value: '12,456',
      change: '+15.3%',
      changeType: 'positive',
    },
    {
      name: 'Compliance Rate',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
    },
    {
      name: 'System Uptime',
      value: '99.99%',
      change: '0%',
      changeType: 'neutral',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Document Verification',
      department: 'Civil Registry',
      status: 'Completed',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      type: 'Permit Application',
      department: 'Urban Planning',
      status: 'In Progress',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      type: 'Tax Filing',
      department: 'Revenue',
      status: 'Pending Review',
      timestamp: '10 minutes ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
        <p className="text-gray-600">
          Monitor government services and regulatory compliance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="mt-1">
              <div className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </div>
                <div
                  className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : activity.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
