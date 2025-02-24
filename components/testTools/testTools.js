import { supabase } from "../../lib/helper/supabaseClient"


const getSession= async () => {
    const {data: res, error} = await supabase.auth.getSession();
    if (error) {
        console.log(error)
        throw error
    }
    // console.log(res.session.user)
    return res.session.user.id 
}

const getUserData = async () => {

    const {data: {user}} = await supabase.auth.getUser()
    console.log(user.aud)
    return user.aud
}

const clearMatchData = async (user_uid) => {
    const {error} = await supabase
    .schema('matches')
    .from('reject_uid')
    .delete()
    .eq('user_uid', user_uid)


    if (error) console.log(user_uid + " not found")
    else console.log("Deletion successful")

}


export {getUserData, getSession, clearMatchData}