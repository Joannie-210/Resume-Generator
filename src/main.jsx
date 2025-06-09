import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import SelectTemplate from './Dashboard/ResumeLayout/SelectTemplate.jsx'
import { ResumeProvider } from './context/ResumeContext'
import ResumeForm from './Dashboard/ResumeLayout/ResumeForm.jsx'
import ResumePage from './Dashboard/ResumeLayout/ResumePage.jsx'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

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
            path: '/dashboard/select-template', // full path = /dashboard/select-template
            element: <SelectTemplate />
          },
             { path: "/dashboard/resume-form", element: <ResumeForm /> },
              { path: "/dashboard/resume-page", element: <ResumePage /> },

  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
     <ResumeProvider>
    <RouterProvider router={router} />
    </ResumeProvider>
     
    </ClerkProvider>
  </StrictMode>
)
