import { supabase } from "../../lib/helper/supabaseClient"
import { getUserUID, getUserData } from "../testTools/testTools"

let data = {
    user_id: "",
    user_uid: "",
    alias: "",
    email: "",
    image: "",

}


const loadUserData = async () => {
    // console.log("Inside loadUserData")
    // await getUserUID()
    // .then((uid) => {data.user_uid = uid})
    const storeUserData = (res) => {
        // console.log("data loading")
        // console.log("res: " + JSON.stringify(res))
        data.user_uid = res.user_uid
        data.user_id = res.id
        data.alias = res.alias
        data.email = res.email
        data.image = res.image
    } 
    
    // await Promise.all(
    getUserData()
    .then((res) => storeUserData(res))
    .catch((error) => {console.log(error)})
    // )
    // console.log("user data loaded")
    // console.log("data: " + JSON.stringify(data))

}


export {loadUserData, data}