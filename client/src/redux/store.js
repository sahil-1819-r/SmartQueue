import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice.js'
import  userReducer  from './features/userSlilce.js';
import signUpReducer from './features/signUpSlice.js'
import createQueueReducer from './features/createQueueSlice.js'
import queueReducer from './features/queueSlice.js'
import themeReducer from './features/themeSlice.js'
export const store = configureStore({
        reducer:{
            login:loginReducer,
            user:userReducer,
            signUp:signUpReducer,
            createQueue:createQueueReducer,
            queue:queueReducer,
            theme:themeReducer
        }
    })
