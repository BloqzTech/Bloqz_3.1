import React from 'react';

const FinanceDashboard = () => {
  const stats = [
    {
      name: 'Total Transactions',
      value: '$2.4M',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Active Smart Contracts',
      value: '156',
      change: '+23.1%',
      changeType: 'positive',
    },
    {
      name: 'Gas Usage',
      value: '1.2 ETH',
      change: '-5.2%',
      changeType: 'negative',
    },
    {
      name: 'Network Health',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Payment',
      amount: '$1,250.00',
      status: 'Completed',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      type: 'Smart Contract',
      amount: '$3,450.00',
      status: 'Pending',
      timestamp: '5 minutes ago',
    },
    {
      id: 3,
      type: 'Token Transfer',
      amount: '$890.00',
      status: 'Completed',
      timestamp: '10 minutes ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
        <p className="text-gray-600">
          Monitor your financial blockchain operations
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.timestamp}
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

export default FinanceDashboard;
