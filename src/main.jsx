import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Home from './home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import SelectTemplate from './Dashboard/ResumeLayout/SelectTemplate.jsx'
import { ResumeProvider } from './context/ResumeContext'
import ResumeForm from './Dashboard/ResumeLayout/ResumeForm.jsx'
import ResumePage from './Dashboard/ResumeLayout/ResumePage.jsx'





const router = createBrowserRouter([
  {
 
    element: <App />,
    children: [

            {
        path: 'dashboard',
        element: <Dashboard />,
        
      },
      
    ],
  },
 
     {
       path: '/', 
        element: <Home />,
      },
      
          {
            path: '/dashboard', // full path = /dashboard/select-template
            element: <SelectTemplate />
          },
             { path: "/dashboard/resume-form", element: <ResumeForm /> },
              { path: "/dashboard/resume-page", element: <ResumePage /> },


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
     <ResumeProvider>
    <RouterProvider router={router} />
    </ResumeProvider>
     
  </StrictMode>
)
