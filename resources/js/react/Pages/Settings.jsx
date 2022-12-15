import React, { useContext, useEffect, useState } from 'react'
import { Page, Layout, Card, MediaCard, Button, Loading } from '@shopify/polaris';
import { AppContext } from '../Context'
import axios from "axios";


export function Settings() {
  const { setActivePage, setTemplateUserId, setSelectedTemplate, config, url } = useContext(AppContext);
  const [appEnable, setAppEnable] = useState(false)
  const [btnloading, setBtnLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');

  useEffect(() => {
    setActivePage(1)
    setSelectedTemplate()
    setTemplateUserId()
  }, [])

  const getPlanData = async () => {
    const response = await axios
      .get(
        `${url}/check-trial?shop_name=${host}`
      )
      .then(res => {
        setAppEnable(res.data.result.app_status)
        setLoading(false)
      })
      .catch(error =>
        alert('Error', error));
  }

  useEffect(() => {
    getPlanData();
  }, []);

  const handleAppStatus = async () => {
    setBtnLoading(true)
    let data = {
      status: !appEnable,
      shop_name: host,
    };
    try {
      const response = await axios.post(`${url}/enable-app`, data)
      setAppEnable(!appEnable)
      setBtnLoading(false)

    } catch (error) {
      alert('Error', error);
      setBtnLoading(false)
    }
  }

  return (
    <div className='Template-Page4'>
      {loading ? <Loading /> :
        <Page fullWidth>
          <Layout>
            <Layout.Section fullWidth>
              <Card sectioned>
                <h5>Customize your theme</h5>
                <p>
                  If your theme uses the Online Store 2.0 system, you can enable the app block and
                  place the trial options on the product page.
                </p>
                <br />
                <p>
                  Legcy themes can enable the app embed block to automatically add the trial options
                  on the product pages.
                </p>
                <br />
                <Button>
                  Enable App Embed (Legacy Themes)
                </Button>
              </Card>
            </Layout.Section>

            <Layout.Section fullWidth>
              <div className='LastStep-MediaCard'>
                <MediaCard
                  title="Last Step: Activate the app !"
                  primaryAction={{
                    content: appEnable ? 'Disable the app' : 'Enable the app',
                    // content: 'Enable the app',
                    disabled: btnloading ? true : false,
                    primary: true,
                    onAction: handleAppStatus,
                  }}
                  description={`You just have one more step to activate your application, you just have to click on the button below!`}
                // popoverActions={[
                //   {
                //     content: 'Rename',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Duplicate',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Delete',
                //     onAction: () => { }
                //   }
                // ]}
                >
                  <img
                    alt="table1"
                    className='MediaCard-Img'
                    src="https://i.ibb.co/QXcJW8V/image.png"
                  />
                </MediaCard>
              </div>

              <div className='Additional-Tips-Section'>
                <h3>Additional Tips:</h3>

                <MediaCard
                  title="Add an app block"
                  description={`Using the theme customizer for your published theme, navigate to the template for product pages.
                                Use the block list navigator to add a new block and add the Trial Offers Block.`}
                // popoverActions={[
                //   {
                //     content: 'Rename',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Duplicate',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Delete',
                //     onAction: () => { }
                //   }
                // ]}
                >
                  <img
                    alt="table1"
                    className='MediaCard-Img'
                    src="https://i.ibb.co/FmKQLvg/image-1.png"
                  />
                </MediaCard>


                <MediaCard
                  title="Reorder an app block"
                  description={`Hover over the app block you want to move and grab the grid icon. you can drag and drop to re-order the block.`}
                // popoverActions={[
                //   {
                //     content: 'Rename',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Duplicate',
                //     onAction: () => { }
                //   },
                //   {
                //     content: 'Delete',
                //     onAction: () => { }
                //   }
                // ]}
                >
                  <img
                    alt="table1"
                    className='MediaCard-Img'
                    src="https://i.ibb.co/FmKQLvg/image-1.png"
                  />
                </MediaCard>

              </div>
            </Layout.Section>

            {/* <Layout.Section fullWidth>
            <div className='GoTo-App-Btn'>
              <Button primary>Go to app</Button>
            </div>
          </Layout.Section> */}

          </Layout>
        </Page>
      }
    </div>
  )
}
