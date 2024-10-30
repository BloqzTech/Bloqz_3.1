import React, { useState } from 'react';

const MobileManagement = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'iPhone 13',
      status: 'Connected',
      lastSync: '2 minutes ago',
      type: 'iOS',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      status: 'Offline',
      lastSync: '1 hour ago',
      type: 'Android',
    },
    {
      id: 3,
      name: 'iPad Pro',
      status: 'Connected',
      lastSync: '5 minutes ago',
      type: 'iOS',
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleRemoveDevice = (deviceId) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
    setSelectedDevice(null);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mobile Management</h1>
        <p className="text-gray-600">Manage your connected mobile devices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Connected Devices
              </h2>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedDevice?.id === device.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleDeviceSelect(device)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{device.name}</h3>
                        <p className="text-sm text-gray-500">{device.type}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            device.status === 'Connected'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {device.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Last sync: {device.lastSync}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device Details */}
        <div className="lg:col-span-1">
          {selectedDevice ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Device Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="mt-1">{selectedDevice.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="mt-1">{selectedDevice.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1">{selectedDevice.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Last Sync
                  </label>
                  <p className="mt-1">{selectedDevice.lastSync}</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => handleRemoveDevice(selectedDevice.id)}
                    className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove Device
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-500">Select a device to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileManagement;
