import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import RecTransaction from '../pages/RecTransaction';
import Income from '../pages/income';
import Expence from '../pages/expence';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/transaction']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/recurrence', '/transaction/income', '/transaction/expense']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="recurrence" value="/transaction" to="/recurrence" component={<RecTransaction/>} />
      <Tab label="Income" value="/transaction" to="/transaction/income" component= {<Income/>} />
      <Tab label="Expense" value="/transaction" to="/transaction/expense" component={<Expence/>} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      Current route: {location.pathname}
    </Typography>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path="*" element={<RecTransaction />} />
        </Routes>
        <MyTabs />
      </Box>
    </Router>
  );
}
