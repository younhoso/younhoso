import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UseInputComp from '../containers/useInputComp';
import UseTabComp from '../containers/useTabComp';
import UseTitleComp from '../containers/useTitleComp';
import UseClickComp from '../containers/useBeforeLeaveComp';
import UseConfirmComp from '../containers/useConfirmComp';
import UsePreventLeaveComp from '../containers/usePreventLeaveComp';
import UseBeforeLeaveComp from '../containers/useBeforeLeaveComp';
import UseFadeInComp from '../containers/useFadeInComp';
import UseNetworkComp from '../containers/useNetworkComp';
import UseScrollComp from '../containers/useScrollComp';
import UseFullScreenComp from '../containers/useFullScreenComp';
import UseNotificationComp from '../containers/useNotificationComp';
import UseAxiosComp from '../containers/useAxiosComp';
import Home from '../containers/Home';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';

const SideBar = () => {
  const history = useHistory();

  const routesArray = [
    'Home',
    'useInput',
    'useTab',
    'useTitle',
    'useClick',
    'usePreventLeave',
    'useBeforeLeave',
    'useFadeIn',
    'useNetwork',
    'useScroll',
    'useFullScreen',
    'useNotification',
    'useAxios',
  ];

  return (
    <SideContainer>
      {routesArray.map((item) => {
        let path = item;

        if (item === 'Home') {
          path = '';
        }

        return (
          <Btn variant="text" onClick={() => history.push(`/${path}`)}>
            {item}
          </Btn>
        );
      })}
    </SideContainer>
  );
};

const Routes = () => {
  return (
    <Router>
      <Container>
        <SideBar />
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/useInput" component={UseInputComp} />
            <Route exact path="/useTab" component={UseTabComp} />
            <Route exact path="/useTitle" component={UseTitleComp} />
            <Route exact path="/useClick" component={UseClickComp} />
            <Route exact path="/useConfirm" component={UseConfirmComp} />
            <Route
              exact
              path="/usePreventLeave"
              component={UsePreventLeaveComp}
            />
            <Route
              exact
              path="/useBeforeLeave"
              component={UseBeforeLeaveComp}
            />
            <Route exact path="/useFadeIn" component={UseFadeInComp} />
            <Route exact path="/useNetwork" component={UseNetworkComp} />
            <Route exact path="/useScroll" component={UseScrollComp} />
            <Route exact path="/useFullScreen" component={UseFullScreenComp} />
            <Route
              exact
              path="/useNotification"
              component={UseNotificationComp}
            />
            <Route exact path="/useAxios" component={UseAxiosComp} />
          </Switch>
        </Main>
      </Container>
    </Router>
  );
};

export default Routes;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 480px;
  border: 1px solid #1a76d2;
  border-radius: 5px;
`;

const Btn = styled(Button)`
  width: 100%;
  text-transform: none;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 150px);
  margin-left: 10px;
`;
