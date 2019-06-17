/**
 * use localStorage to persistence
 */
export default {
  put: function(key, value) {
    localStorage.setItem(key, value);
  },

  get: function(key) {
    return localStorage.getItem(key);
  },

  remove: function(key) {
    return localStorage.removeItem(key);
  },

  clear: function() {
    localStorage.clear();
  }
};
