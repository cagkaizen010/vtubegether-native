import 'react-native-url-polyfill/auto'
import {createClient} from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false
        }
    }
);