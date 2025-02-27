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
    
    await getUserData()
    .then((res) => {
        data.user_uid = res.uid
        data.user_id = res.id
        data.alias = res.alias
        data.email = res.email
        data.image = res.image
    })

}


export {loadUserData, data}