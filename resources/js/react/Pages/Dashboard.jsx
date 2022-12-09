import {
    Page, Card, Layout, ButtonGroup, Button, Stack, Badge, Banner, List ,Link, Modal, MediaCard,
    Toast, ActionList, Icon, Text, Avatar, ResourceList, ResourceItem, TextField, Loading, Frame, EmptyState
} from '@shopify/polaris';
import { CancelSmallMinor } from '@shopify/polaris-icons';
import createApp from '@shopify/app-bridge/development';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppQuery } from "../components/hooks/index";
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import axios from "axios";
import { AppContext } from '../Context'




export function Dashboard() {
    const { setActivePage, setTemplateUserId, config,setSelectedTemplate } = useContext(AppContext);
    let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
    const app = createApp(config);
    const redirect = Redirect.create(app);

    const [appEnable, setAppEnable] = useState(false)

    const [products, setProducts] = useState([])
    const [showProducts, setShowProducts] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [templateRenameValue, setTemplateRenameValue] = useState()
    const [templateRenameUserId, setTemplateRenameUserId] = useState()
    const [toggleReload, setToggleReload] = useState(true);

    const [renameModalActive, setRenameModalActive] = useState(false);
    const [renameToastActive, setRenameToastActive] = useState(false);
    const [deletetoastActive, setDeletetoastActive] = useState(false);
    const [duplicatetoastActive, setDuplicatetoastActive] = useState(false);

    const [loading, setLoading] = useState(true)
    const [templateTable, setTemplateTable] = useState([]);


    const getData = async () => {

        const response = await axios
            .get(
                `https://phpstack-362288-3089196.cloudwaysapps.com/api/current-templates?shop_name=${host}`
            )
            .then(res => {
                console.log(res);
                setTemplateTable(res.data.result);
                setTimeout(() => {
                    setLoading(false)
                }, 0);
            })
            .catch(error =>
                alert('Error: ', error));
    }

    useEffect(() => {
        getData();
    }, [toggleReload]);

    const handleAppEnable = () => {
        console.log('enabled click');
        setAppEnable(!appEnable)
    }

    const handleLocationChange = () => {
        redirect.dispatch(Redirect.Action.APP, `/templates` );

    }

    const handleRenameModal = (id, name) => {
        setRenameModalActive(true)
        setTemplateRenameValue(name)
        setTemplateRenameUserId(id)
    }

    const handleRenameValue = useCallback((newValue) => setTemplateRenameValue(newValue), []);

    function isValueInvalid(content) {
        if (!content) {
            return true;
        }

        return content.length < 1;
    }

    const isTemplateNameInvalid = isValueInvalid(templateRenameValue);

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

    function useOutsideAlerter(ref, id) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (id === 2) {
                        setShowProducts(false)
                        setSelectedItems([])
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const productsRef = useRef(null);
    useOutsideAlerter(productsRef, 2);


    const handleRenameTemplate = async () => {
        console.log(`rename clicked ${templateRenameUserId}`);

        let data = {
            user_template_id: templateRenameUserId,
            template_name: templateRenameValue,
            shop_name: host,
        };
        try {
            const response = await axios.post('https://phpstack-362288-3089196.cloudwaysapps.com/api/rename-template', data)
            console.log(response);
            setRenameModalActive(false)
            setRenameToastActive(!renameToastActive)
            setToggleReload(!toggleReload)
        } catch (error) {
            setRenameModalActive(false)
            setRenameToastActive(!renameToastActive)
            setTemplateRenameUserId()
            alert('Error: ', error);
        }
    }

    const handleDuplicateTemplate = async (id) => {
        console.log(`duplicate clicked ${id}`);

        let data = {
            user_template_id: id,
            shop_name: host,
        };
        try {
            const response = await axios.post('https://phpstack-362288-3089196.cloudwaysapps.com/api/duplicate-template', data)
            console.log(response);
            setDuplicatetoastActive(!duplicatetoastActive)
            setToggleReload(!toggleReload)

        } catch (error) {

            alert('Error: ', error);
        }
    }

    const handleDeleteTemplate = async (id) => {
        console.log(`delete clicked ${id}`);

        let data = {
            user_template_id: id,
            shop_name: host,
        };
        try {
            const response = await axios.post('https://phpstack-362288-3089196.cloudwaysapps.com/api/delete-template', data)
            console.log(response);
            setDeletetoastActive(!deletetoastActive)
            setToggleReload(!toggleReload)

        } catch (error) {

            alert('Error: ', error);
        }


    }

    const handlePreviewTemplate = (id) => {
        console.log(`preview template clicked ${id}`);
    }

    const handleCustomizeTemplate = (id,temp_id) => {
        console.log(`customize template clicked ${id}`);
        setSelectedTemplate(temp_id)
        setTemplateUserId(id)
        setActivePage(3)

        redirect.dispatch(Redirect.Action.APP, `/templates` );
    }

    const handleChangeTemplate = (id,temp_id) => {
        // console.log(`customize template clicked ${id}`);
        setSelectedTemplate(temp_id)
        setTemplateUserId(id)
        setActivePage(2)



        redirect.dispatch(Redirect.Action.APP, {
            path: `/templates`,
        })
    }

    const handleSelectProducts = async (id) => {
        console.log(`select products clicked ${id}`);
        setShowProducts(false);
        setProducts([])
        setSelectedItems([])

        const response = await axios
            .get(
                `https://phpstack-362288-3089196.cloudwaysapps.com/api/products?user_template_id=${id}&shop_name=${host}`
            )

            .then(res => {
                console.log(res);
                setProducts(res.data.result)
                let arr = []
                res.data.result?.map((item) => {
                    if (item.selected === true) {
                        arr.push(item.id)
                    }
                })
                setSelectedItems(arr)

                setShowProducts((prev) => {
                    let toggleId;
                    if (prev[id]) {
                        toggleId = { [id]: false };
                    } else {
                        toggleId = { [id]: true };
                    }
                    return { ...toggleId };
                });

            })
            .catch(error =>
                alert('Error: ', error));
    }

    const handleSubmitProduct = async (id) => {
        console.log(`submit products ${id} `);
        let unSelected = []
        var arr = products.filter(function (item) {
            return selectedItems.indexOf(item.id) === -1;
        });
        arr?.map((item) => {
            unSelected.push(item.id)
        })
        let data = {
            user_template_id: id,
            product_ids: selectedItems,
            unSelected_ids: unSelected,
            shop_name: host,
        };
        try {
            const response = await axios.post('https://phpstack-362288-3089196.cloudwaysapps.com/api/selected-products', data)
            console.log(response);
            setShowProducts(false);
        } catch (error) {
            setShowProducts(false);
            alert('Error: ', error);
        }
    }


    return (
        <div className='Dashboard'>
            <Frame>
                {renameModalActive &&
                    <Modal
                        open={renameModalActive}
                        onClose={() => setRenameModalActive(false)}
                        title="Rename Template"
                        primaryAction={{
                            content: 'Rename',
                            onAction: handleRenameTemplate,
                        }}
                        secondaryActions={[
                            {
                                content: 'Cancel',
                                onAction: () => setRenameModalActive(false),
                            },
                        ]}
                    >
                        <Modal.Section>
                            <TextField
                                label="Template Name"
                                value={templateRenameValue}
                                onChange={handleRenameValue}
                                error={isTemplateNameInvalid && "template name can't be empty"}
                                autoComplete="off"
                            />
                        </Modal.Section>
                    </Modal>
                }

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
                                        onAction: () => {
                                        },
                                    },
                                ],
                            },
                        ]}
                    >
                        <Layout>
                            <Layout.Section>
                                {!appEnable &&
                                    <div className='App-Banner'>
                                        <Banner
                                            title="Your Us vs Them Widget was created. Now install the forms theme app embed."
                                            action={
                                                {
                                                    content: 'Go to online store',
                                                    onAction: () => {
                                                    },
                                                }
                                            }
                                            status="warning"
                                        >
                                            <List>
                                                <List.Item>
                                                    In order for your widgets to work on your storefront, go to your
                                                    online store editor
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
                                                This is your dashboard. It gathers all your templates. You can
                                                create as many
                                                as you want for each product.
                                            </p>
                                            {/*<Link url='/admin/apps/usVsThem/Templates'>*/}
                                            {/*    <Button size="slim">Create a Table</Button>*/}
                                            {/*</Link>*/}

                                            {/*<Link url='/admin/apps/usVsThem/Templates' onClick={handleLocationChange}>*/}
                                            {/*    <Button size="slim">Create a Table</Button>*/}
                                            {/*</Link>*/}

                                                <Button size="slim" onClick={handleLocationChange}>Create a Table</Button>

                                        </Stack>
                                    </div>
                                </Card>

                                {templateTable.length < 1 ?
                                    <Card sectioned>
                                        <EmptyState
                                            heading="No template saved yet!"
                                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                        >
                                        </EmptyState>
                                    </Card>
                                    :
                                    templateTable?.map(({ name, image, template_id, user_template_id }, index) =>
                                        <MediaCard
                                            key={user_template_id}
                                            title={name}
                                            description={
                                                <span className='MediaCard-Description'>
                                                    Here is the current Template that you've choosen. You can customize it every time you want.
                                                    <ButtonGroup id='MediaCard-BtnGroup'>
                                                        <span className='MediaCard-Products-handle'>
                                                            <Button primary
                                                                onClick={() => handleSelectProducts(user_template_id)}
                                                                id='MediaCard-Btn'>Select Product</Button>
                                                            {showProducts[user_template_id] &&
                                                                <span className='Polaris-MediaCard-Table'>
                                                                    <Card>
                                                                        <span className='MediaCard-Products-Cancel-Btn'>
                                                                            <Button size='slim'
                                                                                onClick={() => setShowProducts(false)}>
                                                                                <Icon source={CancelSmallMinor}></Icon>
                                                                            </Button>
                                                                        </span>
                                                                        <ResourceList
                                                                            resourceName={{
                                                                                singular: 'product',
                                                                                plural: 'products'
                                                                            }}
                                                                            items={products}
                                                                            renderItem={(item) => {
                                                                                const { id, image, title } = item;
                                                                                const media = <Avatar size="small"
                                                                                    shape="square"
                                                                                    name={title}
                                                                                    source={image} />;
                                                                                return (
                                                                                    <ResourceItem
                                                                                        id={id}
                                                                                        media={media}
                                                                                        accessibilityLabel={`View details for ${title}`}
                                                                                    >
                                                                                        <Text variant="bodyMd"
                                                                                            fontWeight="bold" as="h3">
                                                                                            {title}
                                                                                        </Text>

                                                                                    </ResourceItem>
                                                                                );
                                                                            }}
                                                                            selectedItems={selectedItems}
                                                                            onSelectionChange={setSelectedItems}
                                                                            selectable
                                                                        />
                                                                        <span
                                                                            className='MediaCard-Products-Confirm-Btn'>
                                                                            <Button primary
                                                                                onClick={() => handleSubmitProduct(user_template_id)}> Confirm</Button>
                                                                        </span>
                                                                    </Card>
                                                                </span>
                                                            }
                                                        </span>

                                                        <Button onClick={() => handleChangeTemplate(user_template_id,template_id)}>Change Template</Button>



                                                            <Button onClick={() => handleCustomizeTemplate(user_template_id,template_id)}>Customize Template</Button>


                                                        <Button plain
                                                            onClick={() => handlePreviewTemplate(user_template_id)}>Preview</Button>
                                                    </ButtonGroup>
                                                </span>
                                            }

                                            popoverActions={[
                                                {
                                                    id: user_template_id,
                                                    content: 'Rename',
                                                    onAction: () => handleRenameModal(user_template_id, name)
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
                                                }
                                            ]}
                                        >
                                            <img
                                                alt="table"
                                                className='MediaCard-Img'
                                                src={image}
                                            />
                                        </MediaCard>
                                    )
                                }

                            </Layout.Section>

                        </Layout>
                        {toastRename}
                        {toastDelete}
                        {toastDuplicate}
                    </Page>}
            </Frame>
        </div>
    );
}




