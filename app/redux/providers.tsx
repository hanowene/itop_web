// 'use client';

// import { ThemeProvider } from 'acme-theme';
// import { AuthProvider } from 'acme-auth';

// export function Providers({ children }: {children: React.ReactNode;}) {
//   return (
//     <ThemeProvider>
//       <AuthProvider>{children}</AuthProvider>
//     </ThemeProvider>
//   );
// }
'use client'
// import { createContext } from 'react'
// export const ThemeContext = createContext({})
// export default function ThemeProvider({
//     children,
//     }: {
//     children: React.ReactNode
//     }) {
//     return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
// }

import { Provider } from "react-redux";
import { store } from './state/store';

function Providers({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;