import { Layout, Frame, Loading } from '@shopify/polaris';
import React, { useState, useEffect, useContext } from 'react';

import {
  TemplatePage1, TemplatePage2, TemplatePage3, TemplatePage4, SideBarNavigation
} from '../components';
import axios from "axios";
import { AppContext } from '../Context'

// export function Templates({ setLocationChange,activePage, setActivePage }) {
export function Templates() {
  const { activePage } = useContext(AppContext);
  // const [activePage, setActivePage] = useState(1)
  // const [selectedTemplate, setSelectedTemplate] = useState(1)
  // const [userTemplateId, setUserTemplateId] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activePage])


  return (
    <div className='Navigation-Frame'>
      <Frame>
        {/* {loading ? <Loading /> : */}
        <div className={`Templates-Page`}>
          <Layout>
            <Layout.Section >

              {/* {(() => {
                  switch (activePage) {
                    case 2:
                      return <TemplatePage2 handleCustomizeTable={handleCustomizeTable} />
                    case 3:
                      return <TemplatePage3 activePage={activePage} setActivePage={setActivePage} setLocationChange={setLocationChange}
                        selectedTemplate={selectedTemplate} userTemplateId={userTemplateId} />
                    case 4:
                      return <TemplatePage4 selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
                    default:
                      return <TemplatePage1 setActivePage={setActivePage} />
                  }

                })()} */}

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
      </Frame>
    </div>
  );
}


