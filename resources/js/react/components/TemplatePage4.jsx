import React, { useContext, useEffect, useState } from 'react'
import { Page, Layout, Card, MediaCard, Button, Loading, Link, Toast } from '@shopify/polaris';
import { AppContext } from '../Context'
import axios from "axios";
import createApp from '@shopify/app-bridge/development';
import { Redirect } from '@shopify/app-bridge/actions';


export function TemplatePage4() {
    const { setActivePage, setTemplateUserId, setSelectedTemplate, templatesCount, config, url } = useContext(AppContext);
    let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
    const app = createApp(config);
    const redirect = Redirect.create(app);
    const [onlineStoreUrl, setOnlineStoreUrl] = useState()
    const [appEnable, setAppEnable] = useState(false)
    const [btnloading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appStatusToast, setAppStatusToast] = useState(false);



    const toggleToastAppStatus = () => {
        setAppStatusToast(false);
    }

    const toastAppStatus = appStatusToast ?
        (
            appEnable ?
                <Toast content="App Enabled" onDismiss={toggleToastAppStatus} duration={1500} /> :
                <Toast content="App Disabled" onDismiss={toggleToastAppStatus} duration={1500} />
        ) : null;

    // useEffect(() => {
    //     setActivePage(1)
    //     setSelectedTemplate()
    //     setTemplateUserId()
    // }, [])

    const getPlanData = async () => {
        const response = await axios
            .get(
                `${url}/check-trial?shop_name=${host}`
            )
            .then(res => {
                setAppEnable(res.data.result.app_status)
                setOnlineStoreUrl(res.data.result.link)
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
            setAppStatusToast(true)
        } catch (error) {
            alert('Error', error);
            setBtnLoading(false)
        }
    }

    const handleAppLocation = () => {
        // if (!templatesCount) {
        //     redirect.dispatch(Redirect.Action.APP, {
        //         path: `/`,
        //     })
        // }
        redirect.dispatch(Redirect.Action.APP, {
            path: `/`,
        })

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
                                    <a href={onlineStoreUrl} target='_blank'> Enable App Embed (Legacy Themes)</a>
                                </Button>
                            </Card>
                        </Layout.Section>

                        <Layout.Section fullWidth>
                            <div className='LastStep-MediaCard'>
                                <MediaCard
                                    title="Last Step: Activate the app !"
                                    primaryAction={{
                                        content: appEnable ? 'Disable the app' : 'Enable the app',
                                        disabled: btnloading ? true : false,
                                        primary: true,
                                        onAction: handleAppStatus,
                                    }}
                                    description={`You just have one more step to activate your application, you just have to click on the button below!`}

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
                                >
                                    <img
                                        alt="table1"
                                        className='MediaCard-Img'
                                        src="https://i.ibb.co/FmKQLvg/image-1.png"
                                    />
                                </MediaCard>

                            </div>
                        </Layout.Section>

                        <Layout.Section fullWidth>
                            <div className='GoTo-App-Btn'>
                                <Link url={`/?shop=${config.shopOrigin}&host=${config.host}`}>
                                    <Button primary onClick={handleAppLocation}>Go to app</Button>
                                </Link>
                            </div>
                        </Layout.Section>

                    </Layout>
                    {toastAppStatus}
                </Page>
            }
        </div>
    )
}
