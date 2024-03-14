

const getUsers = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/user`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
};

const getUsersByRole = async (roleName) => {
    const response = await fetch(`http://127.0.0.1:8000/api/roleusers/${roleName}`);
    if(!response.ok)
        return [];
    const data = await response.json();
    return data;
}

const getUserByPassword = async (mail, password) => {    
    
        const response = await fetch(`http://127.0.0.1:8000/api/user/show/login`,{ 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset: utf-8'
        },
        body: JSON.stringify({mail, password}) ,
        });
    
    if(!response.ok)
        return null;
    const user = await response.json();    
    return user !== undefined && user !== null ? user : null;
    
}
const getRole = async (roleName) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/role/${roleName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let role = await response.json();
        return role !== undefined && role !== null ? role : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getCountUsers = async () => {
    try{ 
         const response = await fetch(`http://127.0.0.1:8000/api/user/show/count`);
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
         const count = await response.json();
         return count !== undefined && count !== null ? count : null;
    } catch (error) {
             console.log(error);
             return null;
    }
}
   


const addUser = async (user) => {

    try{
        if (!('role_id' in user))
        {
            
            const count = await getCountUsers();
            if(count!== null){
             
             let role = count>=1? await getRole(user['roleName']) : await getRole('admin');                           
             if(role !== null){
                user['role_id'] = role['id']; 
                if('roleName' in user) delete user['roleName'];
              }
             else throw new Error('role не знайдено');
            }
        }
          
        const response = await fetch(`http://127.0.0.1:8000/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset: utf-8'
            },
            body: JSON.stringify(user)
        });
        if(!response.ok){
            
            throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
        const data = await response.json();
        return data;
        }catch(error){
            alert.log(error);
        }
    
}
const upUser = async (user) => {
    try{ 
        console.log(user);
        const response= await fetch(`http://127.0.0.1:8000/api/user/${user['id']}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
        
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if(data){
        alert("профіль оновлено");
        return true;
    }
    
    }catch(error){
        alert(error);
        return false;
    }
}

const deleteUser=async(id)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: 'DELETE',
    })
    if(!response.ok){
        alert('не вдалося видалити');
        return false;
    }
    return true;
}

const validateDate= (password,password2,name,phone,mail)=>{
    if(password !== password2){
        alert("паролі не співпадають");        
        return false;
    }
    if(!validatePassword(password)){
        return false;
    }
    if (!validateName(name)){
        return false;
    }
    if(!validatePhone(phone)){
        return false;
    }
    if(!validateMail(mail)){
        return false;
    }
   
    return true;
    
}

function validateName(name){
    if(name.length<3){        
        alert("дуже коротке ім'я");          
        return false;
    }
    if((/\d/).test(name)){
        alert("тільки літери");         
        return false;
    }
     return true;
  }

  function validatePhone(phone){
    if((/[a-zA-Zа-яА-Я]/).test(phone)){
        
        alert("номер не повинен містити літерали");         
        return false;
    }
      if(phone.length<7){
        alert("дуже короткий номер телефону");
        return false;
      }
      return true;
  } 

  function validateMail(mail){
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))){
        alert("невірна пошта");
        return false;
    }
    else return true;
}

function validatePassword(password){
    if(password.length<5){
        alert("дуже короткий пароль");
        return false;
    }
    else return true;
  }

export {addUser, getUsers, getUserByPassword,validateDate,getUsersByRole, upUser, deleteUser,getRole, getCountUsers};