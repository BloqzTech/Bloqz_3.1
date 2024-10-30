const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get available chains
router.get('/available', auth, async (req, res) => {
  try {
    const chains = [
      { id: 'ecommerce', name: 'E-Commerce Chain', status: 'active' },
      { id: 'education', name: 'Education Chain', status: 'active' },
      { id: 'finance', name: 'Finance Chain', status: 'active' },
      { id: 'government', name: 'Government Chain', status: 'active' },
      { id: 'healthcare', name: 'Healthcare Chain', status: 'active' },
      { id: 'insurance', name: 'Insurance Chain', status: 'active' },
      { id: 'realestate', name: 'Real Estate Chain', status: 'active' },
      { id: 'retail', name: 'Retail Chain', status: 'active' },
      { id: 'supplychain', name: 'Supply Chain', status: 'active' },
      { id: 'telecom', name: 'Telecom Chain', status: 'active' }
    ];

    res.json({ chains });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's chain integrations
router.get('/integrations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ integrations: user.integrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Request new chain integration
router.post('/integrate', auth, async (req, res) => {
  try {
    const { chainId, purpose } = req.body;
    if (!chainId) {
      return res.status(400).json({ message: 'Chain ID is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if integration already exists
    const existingIntegration = user.integrations.find(
      integration => integration.chainId === chainId
    );
    if (existingIntegration) {
      return res.status(400).json({ message: 'Integration already exists' });
    }

    // Check maximum integrations limit
    const maxChannels = process.env.MAX_CHANNELS_PER_USER || 10;
    if (user.integrations.length >= maxChannels) {
      return res.status(400).json({ 
        message: `Maximum of ${maxChannels} chain integrations allowed` 
      });
    }

    // Add new integration
    const apiKey = generateApiKey();
    user.integrations.push({
      chainId,
      status: 'pending',
      apiKey,
      purpose: purpose || 'Not specified',
      requestedAt: new Date()
    });

    await user.save();
    res.status(201).json({ 
      message: 'Integration request submitted',
      integration: user.integrations[user.integrations.length - 1]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update integration status
router.patch('/integrations/:chainId', auth, async (req, res) => {
  try {
    const { chainId } = req.params;
    const { status, purpose } = req.body;

    if (!['pending', 'active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const integration = user.integrations.find(i => i.chainId === chainId);
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    integration.status = status;
    if (purpose) {
      integration.purpose = purpose;
    }
    integration.updatedAt = new Date();

    await user.save();

    res.json({ integration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete chain integration
router.delete('/integrations/:chainId', auth, async (req, res) => {
  try {
    const { chainId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const integrationIndex = user.integrations.findIndex(
      i => i.chainId === chainId
    );
    if (integrationIndex === -1) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    user.integrations.splice(integrationIndex, 1);
    await user.save();

    res.json({ message: 'Integration removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chain metrics
router.get('/metrics/:chainId', auth, async (req, res) => {
  try {
    const { chainId } = req.params;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const integration = user.integrations.find(i => i.chainId === chainId);
    if (!integration || integration.status !== 'active') {
      return res.status(403).json({ 
        message: 'Active integration required for metrics' 
      });
    }

    // In a real implementation, you would fetch actual metrics
    res.json({
      chainId,
      metrics: {
        messagesSent: 0,
        messagesReceived: 0,
        averageLatency: 0,
        uptime: 100,
        lastSyncTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to generate API key
function generateApiKey() {
  return Buffer.from(Math.random().toString(36) + Date.now().toString())
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substr(0, 32);
}

module.exports = router;
