import { supabase } from "../../lib/helper/supabaseClient"


const getUserUID= async () => {
    const {data: res, error} = await supabase.auth.getSession();
    if (error) {
        console.log(error)
        throw error
    }
    return res.session.user.id 
}

const getUserData = async () => {

    const retrieve_uid = async () => {
        // console.log("Retrieving user data")
        const {data: res, error} = await supabase.auth.getSession()
        if(error) {
            console.log(error)
            throw error
        }
        // uid = res.session.user.id
        // console.log("user_id retrieved")
        return res.session.user.id
    }

    const retrieve_data = async (id) => {
        const {data: user_data, err} = await supabase
        .schema('public')
        .from('users')
        .select('*')
        .eq('user_uid', id)
        if (err) {
            console.log(err)
            throw err
        }
        // console.log("user_data from public.users retrieved")
        // console.log("user_data[0]: " + JSON.stringify(user_data[0]))
        return user_data[0]
    }

    let data = [] 

    await retrieve_uid()
    .then( (id) => retrieve_data(id))
    .then( (res) => {data = res})
    .catch((error) => {console.log("Error inside retrieve_uid: " + error)})

    return data
}

const getUserDatax = async () => {
    let user_data= ""

    const returnUserID = async (uid) => {
        const {data: res, error} = await supabase
        .schema('public')
        .from('users')
        .select('*')
        .eq('user_uid', uid)
        if (error) { 
            console.log(error)
            throw(error)
        }

        // console.log(res[0].id)
        // user_id = res[0].id
        return res
    }

    await getUserUID()
    .then((uid) => returnUserID(uid))
    .then((data) => {user_data = data[0]})

    // console.log("user_id: " + JSON.stringify(user_id))
    return user_data

}

const getUserAUD = async () => {

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


export {getUserAUD, getUserUID, getUserData, clearMatchData}