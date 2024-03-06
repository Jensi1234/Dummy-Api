export const getAllUser = async() =>{
    const usersData = await fetch('https://dummyjson.com/users?limit=100')
    const userList = await usersData.json()  
    return userList;
}

export const getUserById =async (getUserId)=>{
    let response = await fetch(`https://dummyjson.com/users/${getUserId}`)
    let userData  = await response.json()
    return userData;
}