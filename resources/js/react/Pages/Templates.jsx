import { Layout, Frame, Loading } from '@shopify/polaris';
import React, { useState, useEffect, useContext } from 'react';

import {
  TemplatePage1, TemplatePage2, TemplatePage3, TemplatePage4, SideBarNavigation
} from '../components';
import { AppContext } from '../Context'


export function Templates() {
  const { activePage } = useContext(AppContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [activePage])


  return (
    <div className='Navigation-Frame'>
      <div className={`Templates-Page`}>
        <Layout>
          <Layout.Section>
            {(() => {
              switch (activePage) {
                case 2:
                  return <TemplatePage2 />
                case 3:
                  return <TemplatePage3 />
                case 4:
                  return <TemplatePage4 />
                default:
                  return <TemplatePage1 />
              }

            })()}


          </Layout.Section>
          {
            activePage != 3 &&
            <Layout.Section secondary>
              <SideBarNavigation />
            </Layout.Section>
          }

        </Layout>
      </div>
    </div>
  );
}


