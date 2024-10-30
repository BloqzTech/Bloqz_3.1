import React, { useState } from 'react';
import { useIntegration } from '../../contexts/IntegrationContext';

const IntegrationHub = () => {
  const { integrations, addIntegration, removeIntegration } = useIntegration();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const availableIntegrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect your Slack workspace for team communications',
      category: 'communication',
      icon: '💬',
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Integrate with GitHub for code management',
      category: 'development',
      icon: '💻',
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Connect to Jira for project management',
      category: 'project',
      icon: '📊',
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'Integrate with AWS services',
      category: 'cloud',
      icon: '☁️',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Integrations' },
    { id: 'communication', name: 'Communication' },
    { id: 'development', name: 'Development' },
    { id: 'project', name: 'Project Management' },
    { id: 'cloud', name: 'Cloud Services' },
  ];

  const filteredIntegrations = availableIntegrations.filter(
    (integration) =>
      selectedCategory === 'all' || integration.category === selectedCategory
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integration Hub</h1>
        <p className="text-gray-600">Connect your favorite tools and services</p>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => {
          const isIntegrated = integrations.some((i) => i.id === integration.id);

          return (
            <div
              key={integration.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{integration.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() =>
                    isIntegrated
                      ? removeIntegration(integration.id)
                      : addIntegration(integration)
                  }
                  className={`w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isIntegrated
                      ? 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-500'
                  }`}
                >
                  {isIntegrated ? 'Remove Integration' : 'Add Integration'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationHub;
