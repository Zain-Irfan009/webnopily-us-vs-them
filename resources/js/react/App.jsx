import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from "@shopify/app-bridge/actions";
import {authenticatedFetch} from "@shopify/app-bridge-utils"
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';
import {AppProvider} from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
// import '@shopify/polaris/dist/styles.css';
import "@shopify/polaris/build/esm/styles.css";
import PageLayout from "./components/PageLayout";
import {Provider, useAppBridge} from '@shopify/app-bridge-react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ClientRouter from "./components/ClientRouter";
import AppNavigation from "./components/AppNavigation";
import { QueryClient, QueryClientProvider } from "react-query";


import '../../../public/css/index.css';
import '../../../public/css/theme.css';
import '../../../public/css/usVsThem.css';

import { Dashboard, Templates, Settings, Locations,TemplatePage1 } from './Pages/index'


function userLoggedInFetch(app) {
    const fetchFunction = authenticatedFetch(app);

    return async (uri, options) => {
        const response = await fetchFunction(uri, options);

        if (response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
            const authUrlHeader = response.headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url");

            const redirect = Redirect.create(app);
            redirect.dispatch(Redirect.Action.APP, authUrlHeader);
            return null;
        }

        return response;
    };
}

function AppBridgeApolloProvider({children}) {
    const app = useAppBridge();
    const client = new ApolloClient({
        link: new HttpLink({
            credentials: 'same-origin',
            fetch: userLoggedInFetch(app),
            uri: '/graphql'
        }),
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}


function App({shop, host, apiKey}) {
    const config = {apiKey: apiKey, shopOrigin: shop, host: host, forceRedirect: true};
    const [activePage, setActivePage] = useState(1)
    const queryClient = new QueryClient();

    return (
        <BrowserRouter>
            <Provider config={config}>
                <ClientRouter/>
                <AppProvider i18n={translations}>
                    <AppBridgeApolloProvider>
                        <QueryClientProvider client={queryClient}>
                        <AppNavigation/>

                            <Switch>
                                <Route exact path="/" component={() => (<Dashboard config={config} setActivePage={setActivePage} />)}/>
                                <Route path="/templates/page1" component={TemplatePage1} />
                                <Route path="/templates" component={ () => (<Templates activePage={activePage} setActivePage={setActivePage}  />)} />
                                <Route path="/locations" component={Locations} />
                                <Route path="/settings" component={Settings} />
                            </Switch>
                        </QueryClientProvider>
                    </AppBridgeApolloProvider>
                </AppProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

let appElement = document.getElementById('app');
if (appElement) {
    ReactDOM.render(<App {...(appElement.dataset)}/>, appElement);
}
