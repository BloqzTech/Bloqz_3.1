// Mock authentication service
const mockUsers = new Map();

export const mockAuth = {
  currentUser: null,
  
  createUserWithEmailAndPassword: async (email, password) => {
    if (mockUsers.has(email)) {
      throw new Error('User already exists');
    }
    
    const user = {
      email,
      uid: Math.random().toString(36).substr(2, 9)
    };
    
    mockUsers.set(email, { user, password });
    mockAuth.currentUser = user;
    return { user };
  },

  signInWithEmailAndPassword: async (email, password) => {
    const userAccount = mockUsers.get(email);
    
    if (!userAccount || userAccount.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    mockAuth.currentUser = userAccount.user;
    return { user: userAccount.user };
  },

  signOut: async () => {
    mockAuth.currentUser = null;
  },

  onAuthStateChanged: (callback) => {
    // Initial call
    callback(mockAuth.currentUser);
    
    // Return unsubscribe function
    return () => {};
  }
};

export const registerUser = async (email, password) => {
  try {
    const { user } = await mockAuth.createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { user } = await mockAuth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await mockAuth.signOut();
  } catch (error) {
    throw error;
  }
};

export const onAuthStateChange = (callback) => {
  return mockAuth.onAuthStateChanged(callback);
};
