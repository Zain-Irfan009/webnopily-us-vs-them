import React, { useContext } from 'react'
import { Page, Layout, Card, MediaCard, Button } from '@shopify/polaris';
import { AppContext } from '../Context'


export function TemplatePage4() {

    return (
        <div className='Template-Page4'>
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
                                    content: 'Enable the app',
                                    primary: true,
                                    onAction: () => { },
                                }}
                                description={`You just have one more step to activate your application, you just have to click on the button below!`}
                                popoverActions={[
                                    {
                                        content: 'Rename',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Duplicate',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Delete',
                                        onAction: () => { }
                                    }
                                ]}
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
                                popoverActions={[
                                    {
                                        content: 'Rename',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Duplicate',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Delete',
                                        onAction: () => { }
                                    }
                                ]}
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
                                popoverActions={[
                                    {
                                        content: 'Rename',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Duplicate',
                                        onAction: () => { }
                                    },
                                    {
                                        content: 'Delete',
                                        onAction: () => { }
                                    }
                                ]}
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
                            {/* <Link url='/admin/apps/UsVsThem' onClick={handleLocationChange}>
                                <Button primary>Go to app</Button>
                            </Link> */}
                            <Button primary>Go to app</Button>
                        </div>
                    </Layout.Section>

                </Layout>
            </Page>
        </div>
    )
}
