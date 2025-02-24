
import { supabase } from "../../lib/helper/supabaseClient"
import { getSession, clearMatchData} from "../testTools/testTools"

import { useNavigation} from '@react-navigation/native'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"








const signInWithEmail = async (cred) => {

    const { data, error} = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password,
    })
    if (error){
        console.log(error)
        throw error
    }
    console.log(data)

    try {
        // await setItemAsync('userEmail', cred.email)

    }
    catch (error) {
        console.log("Error saving email to SecureStore", error)
    }
    // getSession();
}

export {signInWithEmail}