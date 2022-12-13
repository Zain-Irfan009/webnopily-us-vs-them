import React from "react";
import { AppLink, NavigationMenu } from '@shopify/app-bridge/actions';
import { useAppBridge } from '@shopify/app-bridge-react';
import { useLocation } from 'react-router-dom';

function AppNavigation() {
    const app = useAppBridge();

    const location = useLocation();

    const dashboard = AppLink.create(app, {
        label: 'Dashboard',
        destination: '/',
    });

    const templates = AppLink.create(app, {
        label: 'Templates',
        destination: '/templates',
    });

    // const locations = AppLink.create(app, {
    //     label: 'Locations',
    //     destination: '/locations',
    // });

    const settings = AppLink.create(app, {
        label: 'Settings',
        destination: '/settings',
    });

    const navigationMenu = NavigationMenu.create(app, {
        items: [dashboard, templates, settings],
    });
    switch (location.pathname) {
        case "/":
            navigationMenu.set({ active: dashboard });
            break;
        case "/templates":
            navigationMenu.set({ active: templates });
            break;
        case "/locations":
            navigationMenu.set({ active: locations });
            break;
        case "/settings":
            navigationMenu.set({ active: settings });
            break;
        default:
            navigationMenu.set({ active: undefined });
    }

    return null
}

export default AppNavigation;
