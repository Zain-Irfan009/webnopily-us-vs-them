import { Page, Card, Layout, ButtonGroup, Button, Stack, Badge, Banner, List, Link, Modal, Toast, ActionList, Icon, } from '@shopify/polaris';
import { HorizontalDotsMinor } from '@shopify/polaris-icons';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Template1Image from '../../../assets/33.png'
import Template2Image from '../../../assets/112.png'
import Template3Image from '../../../assets/22.png'
import Template4Image from '../../../assets/11.png'

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
        name: 'third Table',
        image: 'https://i.ibb.co/tM13T2k/Screenshot-2.jpg',
    },
    {
        name: 'fourth Table',
        image: 'https://i.ibb.co/tM13T2k/Screenshot-2.jpg',
    }
]

export default function UsVsThem({ setLocationChange }) {

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

    const toggleToastActive = () => {
        setRenameToastActive(false);
        setDeletetoastActive(false);
        setDuplicatetoastActive(false);
    }


    const toastRename = renameToastActive ? (
        <Toast content="Template Rename Sucessfully" onDismiss={toggleToastActive} duration={2000} />
    ) : null;
    const toastDelete = deletetoastActive ? (
        <Toast content="Template Deleted Sucessfully" onDismiss={toggleToastActive} duration={2000} />
    ) : null;
    const toastDuplicate = duplicatetoastActive ? (
        <Toast content="Template Duplicate Sucessfully" onDismiss={toggleToastActive} duration={2000} />
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
                                    <Link url='/admin/apps/usVsThem/Templates' onClick={handleLocationChange}>
                                        <Button size="slim" >Create a Table</Button>
                                    </Link>
                                </Stack>
                            </div>
                        </Card>

                        {tables?.map(({ name, image }, index) =>
                            <Card key={index}>
                                <div className='Polaris-MediaCard'>
                                    <div className='Polaris-MediaCard__MediaContainer'>
                                        {MediaCardImage(index + 1)}
                                    </div>
                                    <div className='Polaris-MediaCard__InfoContainer'>
                                        <div className='Polaris-Card__Section'>
                                            <div className="Polaris-MediaCard__Popover" ref={wrapperRef}>

                                                <Button plain size='slim' onClick={() => togglePopoverActive(index + 1)}>
                                                    <Icon source={HorizontalDotsMinor} color="base"></Icon>
                                                </Button>
                                                {popoverActive[index + 1] &&

                                                    <ActionList
                                                        actionRole="menuitem"
                                                        items={[
                                                            {
                                                                id: index + 1,
                                                                content: 'Rename',
                                                                onAction: () => handleRenameTemplate(index + 1),
                                                            },
                                                            {
                                                                id: index + 1,
                                                                content: 'Duplicate',
                                                                onAction: () => handleDuplicateTemplate(index + 1)
                                                            },
                                                            {
                                                                id: index + 1,
                                                                content: 'Delete',
                                                                onAction: () => handleDeleteTemplate(index + 1)
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
                                                        <Button primary onClick={() => handleSelectProducts(index + 1)}>Select Product</Button>
                                                        <Button onClick={() => handleChangeTemplate(index + 1)}>Change Template</Button>
                                                        <Button onClick={() => handleCustomizeTemplate(index + 1)}>Customize Template</Button>
                                                        <Button plain onClick={() => handlePreviewTemplate(index + 1)}>Preview</Button>
                                                    </ButtonGroup>
                                                </div>
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <div style={{ marginTop: '5rem' }}></div>

                    </Layout.Section>

                </Layout>
                {toastRename}
                {toastDelete}
                {toastDuplicate}
            </Page>
        </div>
    );
}

function MediaCardImage(id) {
    return (
        <>
            {
                (() => {
                    switch (id) {
                        case 1:
                            return <img alt={`Template ${id}`} src={Template1Image} className='MediaCard-Img' />
                        case 2:
                            return <img alt={`Template ${id}`} src={Template2Image} className='MediaCard-Img' />
                        case 3:
                            return <img alt={`Template ${id}`} src={Template3Image} className='MediaCard-Img' />
                        case 4:
                            return <img alt={`Template ${id}`} src={Template4Image} className='MediaCard-Img' />
                        default:
                            break
                    }

                })()
            }
        </>
    );
}

