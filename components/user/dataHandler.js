import { supabase } from "../../lib/helper/supabaseClient"
import { setItemAsync, getItemAsync } from 'expo-secure-store'
import { getSession, clearMatchData} from "../testTools/testTools"



// Auto-Login Implementation 
const getEmailFromStore = async () => {
    try{
        const storedEmail = await getItemAsync('userEmail')
        if (storedEmail) {
            onChangeUsername(storedEmail)

        } else {
            console.log("Email not found in SecureStore")
        }

    } catch(error) {

    }
}

// export {}

// const performOAuthGoogle = async () => {
//     const {data, error} = await supabase.auth.signInWithOAuth({
//             provider: 'google',
//             options: {
//                 redirectTo,
//                 skipBrowserRedirect: true,
//             }
//     })

//     if (error) throw error;

//     const res = await WebBrowser.openAuthSessionAsync(
//         data?.url ?? "",
//         redirectTo
//     );

    
//     if (res.type === "success") {
//         const {url} = res;
//         await createSessionFromUrl(url);
//         console.log("Login Successful")
//     }
// };

// const performOAuthGithub = async () => {
//     const {data, error} = await supabase.auth.signInWithOAuth({
//             provider: 'github',
//             options: {
//                 redirectTo,
//                 skipBrowserRedirect: true,
//             }
//     })

//     if (error) throw error;

//     const res = await WebBrowser.openAuthSessionAsync(
//         data?.url ?? "",
//         redirectTo
//     );

    
//     if (res.type === "success") {
//         const {url} = res;
//         await createSessionFromUrl(url);
//         console.log("Login Successful")
//     }
// };