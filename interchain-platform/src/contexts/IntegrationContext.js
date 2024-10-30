import React, { createContext, useContext, useState } from 'react';

const IntegrationContext = createContext();

export function useIntegration() {
  return useContext(IntegrationContext);
}

export function IntegrationProvider({ children }) {
  const [integrations, setIntegrations] = useState([]);
  const [activeIntegration, setActiveIntegration] = useState(null);
  const [loading, setLoading] = useState(false);

  const addIntegration = (integration) => {
    setIntegrations([...integrations, integration]);
  };

  const removeIntegration = (integrationId) => {
    setIntegrations(integrations.filter(i => i.id !== integrationId));
  };

  const updateIntegration = (integrationId, updates) => {
    setIntegrations(integrations.map(i => 
      i.id === integrationId ? { ...i, ...updates } : i
    ));
  };

  const value = {
    integrations,
    activeIntegration,
    loading,
    setActiveIntegration,
    addIntegration,
    removeIntegration,
    updateIntegration,
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
}
