import React from 'react'
import { supabase } from '../../lib/helper/supabaseClient'

// const getUserData = async () => {

//     const {data: {user}} = await supabase.auth.getUser();
//     console.log("Retrieving User Data")
//     console.log(user.aud);
//     return user.aud;
// }


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
    console.log("outputting data:" + data)
    // getUserData()

    // console.log('email: '+ user.data.email);
    // console.log("username: " + user.data.username);
    // console.log('password: ' + user.data.password);
    
}

export {signUpNewUser}
// export default function signUp() {
//     console.log("signUp.js working")
// }