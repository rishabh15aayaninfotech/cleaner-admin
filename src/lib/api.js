const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function refreshAccessToken(){const refreshToken=localStorage.getItem('refresh-token');if(!refreshToken)return null;const response=await fetch(`${API_BASE_URL}/auth/refresh-token`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refreshToken})});if(!response.ok)throw new Error('Session expired');const result=await response.json();if(result.token)localStorage.setItem('auth-token',result.token);return result.token||null}

export async function apiRequest(path,options={},retry=true){const token=localStorage.getItem('auth-token');const response=await fetch(`${API_BASE_URL}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{ }),...options.headers}});if(response.status===401&&retry){try{const newToken=await refreshAccessToken();if(newToken)return apiRequest(path,options,false)}catch{localStorage.removeItem('auth');localStorage.removeItem('auth-token');localStorage.removeItem('refresh-token');localStorage.removeItem('user');window.location.reload()} }if(!response.ok)throw new Error(`API request failed: ${response.status}`);return response.status===204?null:response.json()}

export { API_BASE_URL, refreshAccessToken }

export function getAdminProfile(adminId) {
  return apiRequest(`/auth/get-admin/${adminId}`)
}

export async function getEmployees(adminId, page = 1, limit = 5) {
  const token = localStorage.getItem('auth-token')
  const response = await fetch(`${API_BASE_URL}/employee/get-all-employees/${adminId}?page=${page}&limit=${limit}`, { headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  if (!response.ok) throw new Error(`Employee API request failed: ${response.status}`)
  return response.json()
}
