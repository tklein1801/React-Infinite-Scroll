import { Footer, Main, Navbar, ServiceBar } from '@kleithor/components';
import { Container, Box } from '@mui/material';
import React from 'react';
import { Brand } from './Brand.component';

export type LayoutProps = React.PropsWithChildren;

type RedirectTargets = 'SignIn' | 'SignUp' | 'SignOut';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const redirectTo = function (target: RedirectTargets) {
    switch (target) {
      case 'SignIn':
        window.location.href = 'https://dulliag.de/login';

      case 'SignUp':
        window.location.href = 'https://dulliag.de/register';

      case 'SignOut':
        window.location.href = 'https://dulliag.de/logout';

      default:
        throw new Error('Method not implemented');
    }
  };

  return (
    <Main
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowX: 'unset',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <ServiceBar
        onSignIn={() => redirectTo('SignIn')}
        onSignOut={() => redirectTo('SignOut')}
        onSignUp={() => redirectTo('SignUp')}
        user={null}
      />
      <Navbar
        sx={{
          position: 'unset',
          boxShadow: 'none',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        brand={<Brand />}
        pages={[
          { text: 'Startseite', href: '/' },
          { text: 'Status', href: 'https://status.tklein.it/status/dulliag' },
        ]}
      />
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Container>
      <Box sx={{ mt: 'auto' }}>
        <Footer
          id="layout-footer"
          categories={[
            {
              heading: 'Allgemeines',
              links: [
                { href: '#', text: 'Impressum' },
                { href: '#', text: 'Datenschutz' },
                { href: '#', text: 'ToS' },
              ],
            },
            {
              heading: 'Links',
              links: [{ href: 'https://discord.com/invite/cfEucMa6', text: 'Discord' }],
            },
            {
              heading: 'GitHub',
              links: [
                { href: 'https://github.com/DulliAG', text: 'DulliAG' },
                { href: 'https://github.com/Kleithor', text: 'Kleithor' },
              ],
            },
          ]}
        />
      </Box>
    </Main>
  );
};
