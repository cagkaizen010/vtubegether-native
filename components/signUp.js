import React from 'react'
import { supabase } from '../lib/helper/supabaseClient'

async function signUpNewUser(props) {
    console.log(props)
    console.log("user: " + props.username);
    console.log("pass: " + props.password);
    console.log("email: " + props.email);
    const {data, error} = await supabase.auth.signUp({
        email: props.email,
        password: props.password,
        options: {
            data: {
                username: props.username,
            },
        }
    })
    if (error) throw error

    // console.log('email: '+ user.data.email);
    // console.log("username: " + user.data.username);
    // console.log('password: ' + user.data.password);
    
}

export {signUpNewUser}
// export default function signUp() {
//     console.log("signUp.js working")
// }