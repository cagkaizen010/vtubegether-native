import { supabase } from "../../lib/helper/supabaseClient"

import { useNavigation} from '@react-navigation/native'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"
import { getSession, clearMatchData} from "../testTools/testTools"
import AsyncStorage from "@react-native-async-storage/async-storage"




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

        await AsyncStorage.setItem('userToken', cred.email)
        console.log("AsyncStorage email set.")

    }
    catch (error) {
        console.log( error)
    }
    // getSession();
}

const signOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) throw error

    await AsyncStorage.removeItem('userToken')   
}

export {signOut, signInWithEmail}