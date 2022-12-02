import {
    Page, Card, Layout, ButtonGroup, Button, Stack, Badge, EmptyState,
    Banner, List, Link, Modal, Toast, ActionList, Icon, Loading
} from '@shopify/polaris';
import { HorizontalDotsMinor } from '@shopify/polaris-icons';
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
// import {Template1Image} from './33.png';
// import Template2Image from '/public/images/112.png'
// import Template3Image from '/public/images/22.png'
// import Template4Image from '/public/images/11.png'
// import Template1Image from '../../../assets/33.png'
// import Template2Image from './33.png';

export function Dashboard({ setLocationChange }) {

    const [appEnable, setAppEnable] = useState(false)
    const handleAppEnable = () => {
        console.log('enabled click');
        setAppEnable(!appEnable)
    }

    const handleLocationChange = () => {
        setLocationChange('/admin/apps/usVsThem/Templates')
    }

    const [popoverActive, setPopoverActive] = useState({});
    const [renameToastActive, setRenameToastActive] = useState(false);
    const [deletetoastActive, setDeletetoastActive] = useState(false);
    const [duplicatetoastActive, setDuplicatetoastActive] = useState(false);

    const [templateTable, setTemplateTable] = useState([]);
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
        const response = await axios
            .get(
                `http://us-vs-them.test/api/current-templates?shop_name=${host}`
            )
            .then(res => {
                console.log(res);
                setTemplateTable(res.data.result);
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch(error =>
                alert('Error: ', error));
    }

    useEffect(() => {
        getData();
    }, []);

    const toggleToastActive = () => {
        setRenameToastActive(false);
        setDeletetoastActive(false);
        setDuplicatetoastActive(false);
    }


    const toastRename = renameToastActive ? (
        <Toast content="Template Rename Sucessfully" onDismiss={toggleToastActive} duration={1500} />
    ) : null;
    const toastDelete = deletetoastActive ? (
        <Toast content="Template Deleted Sucessfully" onDismiss={toggleToastActive} duration={1500} />
    ) : null;
    const toastDuplicate = duplicatetoastActive ? (
        <Toast content="Template Duplicate Sucessfully" onDismiss={toggleToastActive} duration={1500} />
    ) : null;


    function togglePopoverActive(id) {
        setPopoverActive((prev) => {
            let toggleId;
            if (prev[id]) {
                toggleId = { [id]: false };
            } else {
                toggleId = { [id]: true };
            }
            return { ...toggleId };
        });
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPopoverActive(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    const handleRenameTemplate = (id) => {
        console.log(`rename clicked ${id}`);
        setPopoverActive(false)
        setRenameToastActive(!renameToastActive)

    }

    const handleDuplicateTemplate = (id) => {
        console.log(`duplicate clicked ${id}`);
        setPopoverActive(false)
        setDuplicatetoastActive(!duplicatetoastActive)

    }

    const handleDeleteTemplate = (id) => {
        console.log(`delete clicked ${id}`);
        setPopoverActive(false)
        setDeletetoastActive(!deletetoastActive)

    }

    const handlePreviewTemplate = (id) => {
        console.log(`preview template clicked ${id}`);
    }

    const handleCustomizeTemplate = (id) => {
        console.log(`customize template clicked ${id}`);
    }

    const handleChangeTemplate = (id) => {
        console.log(`change template clicked ${id}`);

    }

    const handleSelectProducts = (id) => {
        console.log(`select products clicked ${id}`);
    }



    return (
        <div className='Dashboard'>
            {loading ? <Loading /> :
                <Page
                    title="Us vs Them"
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
                                        <Link url='/admin/apps/usVsThem/Templates' onClick={handleLocationChange}>
                                            <Button size="slim" >Create a Table</Button>
                                        </Link>
                                    </Stack>
                                </div>
                            </Card>

                            {templateTable.length < 1 ?
                                <Card sectioned>
                                    <EmptyState
                                        heading="No template saved yet!"
                                        action={{ content: 'Create Template' }}
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    >
                                    </EmptyState>
                                </Card>
                                :
                                templateTable?.map(({ name, template_id, user_template_id }, index) =>
                                    <Card key={user_template_id}>
                                        <div className='Polaris-MediaCard'>
                                            <div className='Polaris-MediaCard__MediaContainer'>
                                                {MediaCardImage(user_template_id)}
                                            </div>
                                            <div className='Polaris-MediaCard__InfoContainer'>
                                                <div className='Polaris-Card__Section'>
                                                    <div className="Polaris-MediaCard__Popover" ref={wrapperRef}>

                                                        <Button plain size='slim' onClick={() => togglePopoverActive(user_template_id)}>
                                                            <Icon source={HorizontalDotsMinor} color="base"></Icon>
                                                        </Button>
                                                        {popoverActive[user_template_id] &&

                                                            <ActionList
                                                                actionRole="menuitem"
                                                                items={[
                                                                    {
                                                                        id: user_template_id,
                                                                        content: 'Rename',
                                                                        onAction: () => handleRenameTemplate(user_template_id),
                                                                    },
                                                                    {
                                                                        id: user_template_id,
                                                                        content: 'Duplicate',
                                                                        onAction: () => handleDuplicateTemplate(user_template_id)
                                                                    },
                                                                    {
                                                                        id: user_template_id,
                                                                        content: 'Delete',
                                                                        onAction: () => handleDeleteTemplate(user_template_id)
                                                                    },

                                                                ]}
                                                            />
                                                        }
                                                    </div>

                                                    <Stack vertical spacing='tight'>
                                                        <div className="Polaris-MediaCard__Heading">
                                                            <h2 className="Polaris-Text--root Polaris-Text--headingMd Polaris-Text--semibold">{name}</h2>
                                                        </div>

                                                        <p>Here is the current Template that you've choosen. You can customize it every time you want.</p>

                                                        <div className='Polaris-MediaCard__ActionContainer'>
                                                            <ButtonGroup>
                                                                <Button primary onClick={() => handleSelectProducts(user_template_id)}>Select Product</Button>
                                                                <Button onClick={() => handleChangeTemplate(user_template_id)}>Change Template</Button>
                                                                <Button onClick={() => handleCustomizeTemplate(user_template_id)}>Customize Template</Button>
                                                                <Button plain onClick={() => handlePreviewTemplate(user_template_id)}>Preview</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            }

                        </Layout.Section>

                    </Layout>
                    {toastRename}
                    {toastDelete}
                    {toastDuplicate}
                </Page>}
        </div>
    );
}

function MediaCardImage(id) {
    return (
        <>
            {/*{*/}
            {/*    (() => {*/}
            {/*        switch (id) {*/}
            {/*            case 1:*/}
            {/*                return <img alt={`Template ${id}`} src={Template1Image} className='MediaCard-Img' />*/}
            {/*            case 2:*/}
            {/*                return <img alt={`Template ${id}`} src={Template2Image} className='MediaCard-Img' />*/}
            {/*            case 3:*/}
            {/*                return <img alt={`Template ${id}`} src={Template3Image} className='MediaCard-Img' />*/}
            {/*            case 4:*/}
            {/*                return <img alt={`Template ${id}`} src={Template4Image} className='MediaCard-Img' />*/}
            {/*            default:*/}
            {/*                break*/}
            {/*        }*/}

            {/*    })()*/}
            {/*}*/}
        </>
    );
}

