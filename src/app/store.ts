import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/features/auth'
import { dashboardReducer } from '@/features/dashboard/model/slice'
import { userInfoReducer } from '@/features/user/model/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    user: userInfoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
