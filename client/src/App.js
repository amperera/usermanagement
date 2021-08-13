import { ConnectedRouter, push } from 'connected-react-router';
import { Route, Switch, useHistory } from 'react-router-dom';
import ErrorBoundary from "./errorboundary/ErrorBoundary";
import {dependencies} from './store';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Register from './pages/Register';
import 'antd/dist/antd.css'

const { Header, Footer, Sider, Content } = Layout;

const App = () => {

  const dispatch = useDispatch();

  return (
    <div className="App">
      <ErrorBoundary>
        <ConnectedRouter history={dependencies.history}>
        <Layout>
          <Header>
            <div style={{color: 'white'}} onClick={() => dispatch(push("/")) }>Home</div>       
          </Header>
          <Content>
          <Switch>
                <Route path="/register" component={Register}/>
                {/* <Route path="/login" component={AppRoutes}/>
                <Route path="/user/:id" component={AppRoutes}/>
                <Route path="/users" component={AppRoutes}/> */}
          </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
        </ConnectedRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
