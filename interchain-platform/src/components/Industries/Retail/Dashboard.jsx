import React from 'react';

const RetailDashboard = () => {
  const stats = [
    {
      name: 'Total Sales',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive',
    },
    {
      name: 'Active Orders',
      value: '156',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Inventory Items',
      value: '1,893',
      change: '-3.2%',
      changeType: 'negative',
    },
    {
      name: 'Customer Satisfaction',
      value: '94.8%',
      change: '+2.3%',
      changeType: 'positive',
    },
  ];

  const recentOrders = [
    {
      id: 1,
      orderNumber: '#12345',
      customer: 'John Smith',
      amount: '$234.50',
      status: 'Shipped',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      orderNumber: '#12344',
      customer: 'Sarah Johnson',
      amount: '$129.99',
      status: 'Processing',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      orderNumber: '#12343',
      customer: 'Michael Brown',
      amount: '$549.99',
      status: 'Delivered',
      timestamp: '10 minutes ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Retail Dashboard</h1>
        <p className="text-gray-600">
          Monitor sales, inventory, and customer activity
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
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.timestamp}
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

export default RetailDashboard;
