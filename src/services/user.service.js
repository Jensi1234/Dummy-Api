export const getAllUser = async() =>{
    const usersData = await fetch('https://dummyjson.com/users?limit=100')
    const userList = await usersData.json()  
    return userList.users;
}

export const getUserById =async (userId)=>{
    let response = await fetch(`https://dummyjson.com/users/${userId}`)
    let userData  = await response.json()
    return userData;
}