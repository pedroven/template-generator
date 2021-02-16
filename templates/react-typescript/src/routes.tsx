import React from 'react';
import {
	Route,
	Switch,
	BrowserRouter as Router,
	Redirect
} from 'react-router-dom';
import { useAuth } from './hooks/auth';

const { isAuthenticated } = useAuth();

const PrivateRoute: React.FC<{
	component: React.FC;
	path: string;
	exact: boolean;
}> = (props) => {
	return isAuthenticated() ? (
		<Route
			path={props.path}
			exact={props.exact}
			component={props.component}
		/>
	) : (
		<Redirect to="/login" />
	);
};

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route
					path="/*"
					exact
					component={() => <h1>Página não encontrada</h1>}
				/>
			</Switch>
		</Router>
	);
}
