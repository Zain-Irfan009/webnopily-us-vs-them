import { Layout, Frame, Loading } from '@shopify/polaris';
import React, { useState, useEffect } from 'react';

import {
  TemplatePage1, TemplatePage2, TemplatePage3, TemplatePage4, SideBarNavigation
} from '../components';
import axios from "axios";

export function Templates({ setLocationChange,activePage, setActivePage }) {

  // const [activePage, setActivePage] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [userTemplateId, setUserTemplateId] = useState()
  const [loading, setLoading] = useState(true)


  const handleCustomizeTable = async (id) => {
    let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');

    const response = await axios
      .post(
        `http://us-vs-them.test/api/step-1?template_id=${id}&shop_name=${host}`
      )
      .then(res => {
        console.log(res.data.result);
        setActivePage(3)
        setSelectedTemplate(id)
        setUserTemplateId(res.data.result.user_template_id)
      })
      .catch(error =>
        alert('Error: ', error));
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activePage])


  return (
    <div className='Navigation-Frame'>
      <Frame>
        {loading ? <Loading/> :
        <div className={`Templates-Page`}>
          <Layout>
            <Layout.Section >

              {(() => {
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

              })()}


            </Layout.Section>
            {
              activePage != 3 &&
              <Layout.Section secondary>
                <SideBarNavigation activePage={activePage} setActivePage={setActivePage} setLocationChange={setLocationChange} />
              </Layout.Section>
            }

          </Layout>
        </div>}
      </Frame>
    </div>
  );
}


