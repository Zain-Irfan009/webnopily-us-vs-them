import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "@shopify/app-bridge/actions";
import { authenticatedFetch } from "@shopify/app-bridge-utils"
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { AppProvider, Frame } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { Provider, useAppBridge } from '@shopify/app-bridge-react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClientRouter from "./components/ClientRouter";
import AppNavigation from "./components/AppNavigation";
import { AppContext } from './Context'


import '../../../public/css/index.css';
import '../../../public/css/theme.css';
import '../../../public/css/usVsThem.css';
import '../../../public/css/tablePreview.css'

import { Dashboard, Templates, Settings, Locations } from './Pages/index'


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

function AppBridgeApolloProvider({ children }) {
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


function App({ shop, host, apiKey }) {
    const config = { apiKey: apiKey, shopOrigin: shop, host: host, forceRedirect: true };

    const [activePage, setActivePage] = useState(1)
    const [selectedTemplate, setSelectedTemplate] = useState()
    const [templateUserId, setTemplateUserId] = useState()
    const [templatesCount, setTemplatesCount] = useState(false)
    // const url = 'https://us-vs-them.test/api'
    const url='https://phpstack-362288-3089196.cloudwaysapps.com/api';

    useEffect(() => {
        console.log('activePage: ', activePage);
        console.log('selectedTemplate: ', selectedTemplate);
        console.log('templateUserId: ', templateUserId);
    }, [activePage, selectedTemplate, templateUserId])


    return (
        <BrowserRouter>
            <Provider config={config}>
                <ClientRouter />
                <AppProvider i18n={translations}>
                    <AppBridgeApolloProvider>
                        <AppNavigation />
                        <AppContext.Provider
                            value={{
                                activePage, setActivePage, selectedTemplate, setSelectedTemplate,
                                templateUserId, setTemplateUserId, config, url, templatesCount, setTemplatesCount
                            }}>
                            <Frame>
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route path="/templates" component={Templates} />
                                    <Route path="/locations" component={Locations} />
                                    <Route path="/settings" component={Settings} />
                                </Switch>
                            </Frame>
                        </AppContext.Provider>
                    </AppBridgeApolloProvider>
                </AppProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;

let appElement = document.getElementById('app');
if (appElement) {
    ReactDOM.render(<App {...(appElement.dataset)} />, appElement);
}
