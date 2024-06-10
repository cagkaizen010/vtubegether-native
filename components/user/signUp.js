import React from 'react'
import { supabase } from '../../lib/helper/supabaseClient'

// const getUserData = async () => {

//     const {data: {user}} = await supabase.auth.getUser();
//     console.log("Retrieving User Data")
//     console.log(user.aud);
//     return user.aud;
// }
const getSession = async () => {
    const {data, error} = await supabase.auth.getSession();
    if (error) {
        console.log(error)
        throw error
    }
    console.log("DATA AFTER GETSESSION(): " + JSON.stringify(data.session.user.user_metadata, null, 1))
}

async function signUpNewUser(props) {
    // console.log("user: " + props.username);
    // console.log("email: " + props.email);
    // console.log("pass: " + props.password);

    
    const {data, error} = await supabase.auth.signUp({
        email: props.email,
        password: props.password,
        // options: {
        //     data: {
        //         username: props.username,
        //     },
        // }
    })
    if (error) {
        console.log(error)
        throw error
    }
    
    // console.log(JSON.stringify(data, null, 1));
    getSession();       
    // const {data: user} = await supabase.auth.getUser();
    
   
}

export {signUpNewUser}
// export default function signUp() {
//     console.log("signUp.js working")
// }