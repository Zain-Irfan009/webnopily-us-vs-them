import { Page, Card, Layout, MediaCard, Button, Stack, Badge, Banner, List, Popover, ActionList } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from '@shopify/app-bridge/actions';
import createApp from '@shopify/app-bridge/development';

const tables = [
    {
        name: 'First Table',
        image: 'https://i.ibb.co/tM13T2k/Screenshot-2.jpg',
    },
    {
        name: 'Second Table',
        image: 'https://i.ibb.co/tM13T2k/Screenshot-2.jpg',
    },
    {
        name: 'Third Table',
        image: 'https://i.ibb.co/tM13T2k/Screenshot-2.jpg',
    }
]

export function Dashboard({ setLocationChange,config }) {

    const [appEnable, setAppEnable] = useState(false)
    const handleAppEnable = () => {
        console.log('enabled click');
        setAppEnable(!appEnable)
    }
    const app = createApp(config);
    const handleLocationChange = () => {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.APP, `/templates` );
    }
    useEffect(() => {
        console.log(config);
    }, [config])

    return (
        <div className='Dashboard1'>
            <Page
                title="Us vs Them"
                // fullWidth
                titleMetadata={
                    <>
                        <Badge status="success">Active</Badge>
                        <Badge status="attention">Pending Install</Badge>
                    </>
                }
                primaryAction={
                    {
                        content: appEnable ? 'Disable the app' : 'Enable the app',
                        onAction: () => {
                            setAppEnable(!appEnable)
                        },
                    }
                }
                actionGroups={[
                    {
                        title: 'More actions',
                        accessibilityLabel: 'Action group label',
                        actions: [
                            {
                                content: 'Info',
                                accessibilityLabel: 'Individual action label',
                                onAction: () => { },
                            },
                        ],
                    },
                ]}
            >
                <Layout>
                    <Layout.Section >
                        {!appEnable &&
                            <div className='App-Banner'>
                                <Banner
                                    title="Your Us vs Them Widget was created. Now install the forms theme app embed."
                                    action={
                                        {
                                            content: 'Go to online store',
                                            onAction: () => { },
                                        }
                                    }
                                    status="warning"
                                >
                                    <List>
                                        <List.Item>
                                            In order for your widgets to work on your storefront, go to your online store editor
                                            and turn on the forms theme app embed.
                                        </List.Item>
                                    </List>
                                </Banner>
                            </div>
                        }

                        <Card sectioned>
                            <h5>Your current templates</h5>
                            <div className='Current-Templates-Card-Content'>
                                <Stack>
                                    <p>
                                        This is your dashboard. It gathers all your templates. You can create as many
                                        as you want for each product.
                                    </p>
                                    <Link to='/templates'>
                                        <Button size="slim">Create a Table</Button>
                                    </Link>


                                    {/* <Button size="slim" onClick={handleLocationChange}>Create a Table</Button> */}

                                </Stack>
                            </div>
                        </Card>

                        {tables?.map(({ name, image }, index) =>
                            <MediaCard
                                key={index}
                                title={name}
                                description={`Here is the current Template that you've choosen. You can customize it every time you want.`}
                                primaryAction={
                                    {
                                        content:
                                            <Link to='/templates'>
                                                Change your  template
                                            </Link>
                                        ,

                                        onAction: () => {
                                            // setLocationChange("/admin/apps/usVsThem/Templates")
                                        },
                                    }
                                }
                                secondaryAction={
                                    {
                                        content: 'View on your website',
                                        onAction: () => { },
                                    }
                                }
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
                                    src={image}
                                />
                            </MediaCard>
                        )}

                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
}
