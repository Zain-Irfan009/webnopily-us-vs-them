import { Layout, Frame } from '@shopify/polaris';
import React, { useState, } from 'react';

import {
  TemplatePage1, TemplatePage2, TemplatePage3, TemplatePage4, SideBarNavigation
} from '../components';
import axios from "axios";

export function Templates({ setLocationChange, themePc, themeMobile }) {

  let templateSelected = '';
  const [activePage, setActivePage] = useState(3)
  const [selectedTemplate, setSelectedTemplate] = useState(1)

  const handleCustomizeTable = async (id) => {

    const response = await axios
      .post(
        `http://app-template-php.test/api/step-1?template_id=${id}&shop_name=zain-store-tlx.myshopify.com`
      )
      .then(res => {
        console.log(res);
        setSelectedTemplate(id)
        setActivePage(3)
      })
      .catch(error =>
        console.log(error));
  }

  return (
    <div className='Navigation-Frame'>
      <Frame>
        <div className={`Templates-Page`}>
          <Layout>
            <Layout.Section >

              {(() => {
                switch (activePage) {
                  case 2:
                    return <TemplatePage2 handleCustomizeTable={handleCustomizeTable} />
                  case 3:
                    return <TemplatePage3 activePage={activePage} setActivePage={setActivePage} setLocationChange={setLocationChange}
                      selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
                  case 4:
                    return <TemplatePage4 selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
                  default:
                    return <TemplatePage1 setActivePage={setActivePage} />
                }

              })()}


            </Layout.Section>
            {
              activePage != 3 &&
              <Layout.Section secondary>
                <SideBarNavigation activePage={activePage} setActivePage={setActivePage} setLocationChange={setLocationChange} />
              </Layout.Section>
            }

          </Layout>
        </div>
      </Frame>
    </div>
  );
}


