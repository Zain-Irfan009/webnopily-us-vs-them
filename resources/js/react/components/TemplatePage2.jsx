import React, { useContext, useState, useEffect } from 'react'
import { Page, Layout, Card, Icon, Stack, Button } from '@shopify/polaris';
import { MobileMajor, DesktopMajor } from '@shopify/polaris-icons';
import axios from "axios";
import { AppContext } from '../Context'


export function TemplatePage2() {
  const { setActivePage, templateUserId, setTemplateUserId, setSelectedTemplate, url } = useContext(AppContext);

  let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
  const [btnloading, setBtnLoading] = useState(false)
  const [screen, setScreen] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  })

  const handleScreenSelection = (id) => {
    setScreen({ ...screen, [id]: !screen[id] })
  }

  const handleSelectTemplate = async (templateId) => {
    setBtnLoading((prev) => {
      let toggleId;
      if (prev[templateId]) {
        toggleId = { [templateId]: false };
      } else {
        toggleId = { [templateId]: true };
      }
      return { ...toggleId };
    });

    const response = await axios
      .post(
        `${url}/step-1?template_id=${templateId}&user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        setBtnLoading(false)
        setSelectedTemplate(templateId)
        setTemplateUserId(res.data.result.user_template_id)
        setActivePage(3)
      })
      .catch(error => {
        alert('Error: ', error)
        setBtnLoading(false)
      });

  }

  return (
    <div className='Template-Page2'>
      <Page fullWidth>

        <Layout>
          <Layout.Section fullWidth>

            <Card sectioned>
              <h5>Select your favorite template</h5>
              <p> Choose the template that best suits your needs. You will then be able to
                fully customize it.</p>
            </Card>

          </Layout.Section>

          {[1, 2, 3, 4].map((item) => {
            return (
              <Layout.Section key={item} oneHalf>
                <Card sectioned>
                  <div className='Theme-Card-Content'>

                    <div className='Tables-Image-Section'>
                      {screen[item] ?
                        <img src={`./images/table${item}desktop.jpg`} alt="desktop table" /> :
                        <img src={`./images/table${item}mobile.jpg`} alt="mobile table" />
                      }
                    </div>

                    <div className='Screen-Selection'>
                      <Stack>
                        <span></span>
                        <div className='Screen-Selection-Icons'>
                          <span className={`Screen-Icon ${screen[item] && 'selected'}`}
                            onClick={() => handleScreenSelection(item)}>
                            <Icon source={DesktopMajor} ></Icon>
                          </span>

                          <span className={`Screen-Icon ${!screen[item] && 'selected'}`}
                            onClick={() => handleScreenSelection(item)}>
                            <Icon source={MobileMajor}></Icon>
                          </span>
                        </div>

                        <div className='Screen-Selection-Btn'>
                          {
                            btnloading[item] ?
                              <Button loading >Select</Button> :
                              <Button primary onClick={() => handleSelectTemplate(item)}>Select</Button>
                          }
                        </div>
                      </Stack>
                    </div>

                  </div>
                </Card>
              </Layout.Section>
            )
          })}

        </Layout>
      </Page>
    </div>
  )
}


