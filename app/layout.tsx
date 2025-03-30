// app/layout.tsx (or RootLayout.js)
import { Provider } from 'react-redux';
import './globals.scss';
 // Import LayoutWrapper
import store from './store/store';  // Make sure store is correctly set up
import LayoutWrapper from './LayerWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>  {/* Wrapping your app with Redux provider */}
          <LayoutWrapper>{children}</LayoutWrapper>  {/* Layout wrapper for consistent layout */}
        </Provider>
      </body>
    </html>
  );
}
