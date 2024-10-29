const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;"; 
    window.location.href = '/login'; 
  };
  
  <button onClick={handleLogout}>Logout</button>
  