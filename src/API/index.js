import CustomAxios from "./CustomAxios";

const API = {
  projects: {
    getAll: async () => {
      try {
        const response = await CustomAxios().get('/projects');
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
  user: {
    getUser: async () => {
      try {
        const response = await CustomAxios().get('/user');
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
  getAllPositions: async (token) => {
    try {
      const response = await CustomAxios(token).get('/positions');
      return response;
    } catch (error) {
      throw error;
    }
  },
  posts: {
    getAll: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/posts/all', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getByCompany: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/posts/company', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getByPosition: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/posts/position', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getByCompanyPosition: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/posts/position/company', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getById: async (postId, token = '') => {
      try {
        const response = await CustomAxios(token).get(`/posts/${postId}`);
        return response;
      } catch (error) {
        throw error;
      }
    },
    newPost: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/posts', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    updateById: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).put('/posts', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    deleteById: async (postId, body, token = '') => {
      try {
        const response = await CustomAxios(token).delete(`/posts/${postId}`, body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    updateAttachmentsByPostId: async (postId, postPin, body, token = '') => {
      try {
        const response = await CustomAxios(token).put(`/posts/${postId}/${postPin}/attachments`, body);
        return response;
      } catch (error) {
        throw error;
      }
    }
  },
  comments: {
    getAllByPost: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/comments/post', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getSolutionsByPost: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/comments/post/solutions', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    deleteById: async (commentId, token = '') => {
      try {
        const response = await CustomAxios(token).delete(`/comments/${commentId}`);
        return response;
      } catch (error) {
        throw error;
      }
    },
    newComment: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).post('/comments', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getById: async (commentId, token = '') => {
      try {
        const response = await CustomAxios(token).get(`/comments/${commentId}`);
        return response;
      } catch (error) {
        throw error;
      }
    },
    updateById: async (body, token = '') => {
      try {
        const response = await CustomAxios(token).put('/comments', body);
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
  system: {
    getStatsPositions: async (token = '') => {
      try {
        const response = await CustomAxios(token).get('/stats/positions');
        return response;
      } catch (error) {
        throw error;
      }
    },
    getStatsCompanies: async (token = '') => {
      try {
        const response = await CustomAxios(token).get('/stats/companies');
        return response;
      } catch (error) {
        throw error;
      }
    }
  },
  files: {
    getByPostId: async (postId, token = '') => {
      try {
        const response = await CustomAxios(token).get(`/files/post/${postId}`);
        return response;
      } catch (error) {
        throw error;
      }
    },
    deleteByPostId: async (postId, body, token = '') => {
      try {
        const response = await CustomAxios(token).delete(`/files/post/${postId}`, body);
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
}

export default API;
