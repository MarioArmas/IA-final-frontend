import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { SignUp, LoadData, ShowList, SetReview } from '../views'

export const AppRouter = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<SignUp/>} />
                <Route path="/load-data" element={<LoadData/>} />
                <Route path="/show-list" element={<ShowList/>} />
                <Route path="/set-review" element={<SetReview/>} />

                <Route path="/*" element={ < Navigate to="/sign-up" /> } />   
            </Routes>
        </BrowserRouter>
    </>
  )
}
