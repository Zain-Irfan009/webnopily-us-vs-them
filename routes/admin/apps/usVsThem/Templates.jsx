import { Page, Layout, Pagination, Button, Navigation, Link, Loading } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

import {
  TemplatePage1, TemplatePage2, TemplatePage3, TemplatePage4, SideBarNavigation,
  Table1, Table2, Table3, Table4
} from '../../../../components';

export default function Templates({ setLocationChange, themePc, themeMobile }) {

  let templateSelected = '';
  const [activePage, setActivePage] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(templateSelected)


  return (
    <div className={`Templates-Page`}>
      <Layout>
        <Layout.Section >

          {(() => {
            switch (activePage) {
              case 2:
                return <TemplatePage2 selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} setActivePage={setActivePage} />
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
  );
}


