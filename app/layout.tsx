'use client';
import './globals.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import LayoutWrapper from './LayerWrapper';
import '../i18n'; // Import i18n configuration

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}