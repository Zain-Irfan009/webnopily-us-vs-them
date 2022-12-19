import {
    Page, Card, Layout, ButtonGroup, Button, Stack, Badge, Banner, List, Modal, MediaCard, Spinner,
    Toast, ProgressBar, Text, Avatar, ResourceList, ResourceItem, TextField, Loading, Frame, EmptyState
} from '@shopify/polaris';
import createApp from '@shopify/app-bridge/development';
import { Redirect } from '@shopify/app-bridge/actions';
import React, { useState, useEffect, useCallback, useContext, Suspense } from 'react';
import axios from "axios";
import { AppContext } from '../Context'
import { Link } from 'react-router-dom'
import { Templates } from './Templates';



export function Dashboard() {
    const { setActivePage, templateUserId, setTemplateUserId, config, setSelectedTemplate, url } = useContext(AppContext);
    let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
    const app = createApp(config);
    const redirect = Redirect.create(app);
    const [onlineStoreUrl, setOnlineStoreUrl] = useState()

    const [appEnable, setAppEnable] = useState(false)
    const [planName, setPlanName] = useState()
    const [planCount, setPlanCount] = useState()
    const [planExpiry, setPlanExpiry] = useState()
    const [planTrialDays, setPlanTrialDays] = useState()
    const [planUsageLimit, setPlanUsageLimit] = useState()
    const [planExpireBanner, setPlanExpireBanner] = useState(true)

    const [products, setProducts] = useState([])
    const [assignedItems, setAssignedItems] = useState([]);
    const [productsModal, setProductsModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [templateRenameValue, setTemplateRenameValue] = useState()
    const [templateRenameUserId, setTemplateRenameUserId] = useState()
    const [toggleReload, setToggleReload] = useState(true);

    const [renameModalActive, setRenameModalActive] = useState(false);
    const [renameToastActive, setRenameToastActive] = useState(false);
    const [deletetoastActive, setDeletetoastActive] = useState(false);
    const [duplicatetoastActive, setDuplicatetoastActive] = useState(false);
    const [productsToastActive, setProductsToastActive] = useState(false);
    const [appStatusToast, setAppStatusToast] = useState(false);

    const [loading, setLoading] = useState(true)
    const [btnloading, setBtnLoading] = useState(false)

    const [templateTable, setTemplateTable] = useState([]);
    const [templateLoading, setTemplateLoading] = useState(true)

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
                console.log('plan data response', res);
                setAppEnable(res.data.result.app_status)
                setPlanName(res.data.result.plan_name)
                setPlanCount(res.data.result.count)
                setPlanExpiry(res.data.result.trial_expiry_date)
                setPlanTrialDays(res.data.result.trial_days)
                setPlanUsageLimit(res.data.result.usage_limit)
                setOnlineStoreUrl(res.data.result.link)
                setLoading(false)
            })
            .catch(error =>
                alert('Error', error));
    }

    useEffect(() => {
        getPlanData();
    }, []);

    const getData = async () => {
        setTemplateLoading(true)
        const response = await axios
            .get(
                `${url}/current-templates?shop_name=${host}`
            )
            .then(res => {
                console.log('templates tables response', res);
                setTemplateTable(res.data.result);
                setTemplateLoading(false)
            })
            .catch(error =>
                alert('Error', error));
    }

    useEffect(() => {
        getData();
    }, [toggleReload]);

    const handleProductsModal = () => {
        setProductsModal(false)
        setTemplateUserId()
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
        setProductsToastActive(false);
        setAppStatusToast(false);
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
    const toastProducts = productsToastActive ? (
        <Toast content="Products Updated Sucessfully" onDismiss={toggleToastActive} duration={1500} />
    ) : null;
    const toastAppStatus = appStatusToast ?
        (
            appEnable ?
                <Toast content="App Enabled" onDismiss={toggleToastActive} duration={1500} /> :
                <Toast content="App Disabled" onDismiss={toggleToastActive} duration={1500} />
        ) : null;




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

    const handleRenameTemplate = async () => {
        let data = {
            user_template_id: templateRenameUserId,
            template_name: templateRenameValue,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/rename-template`, data)
            setRenameModalActive(false)
            setTemplateRenameUserId()
            setRenameToastActive(!renameToastActive)
            setToggleReload(!toggleReload)
        } catch (error) {
            setRenameModalActive(false)
            setTemplateRenameUserId()
            alert('Error', error);
        }
    }

    const handleDuplicateTemplate = async (id) => {


        let data = {
            user_template_id: id,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/duplicate-template`, data)
            setDuplicatetoastActive(!duplicatetoastActive)
            setToggleReload(!toggleReload)

        } catch (error) {

            alert('Error', error);
        }
    }

    const handleDeleteTemplate = async (id) => {
        let data = {
            user_template_id: id,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/delete-template`, data)
            setDeletetoastActive(!deletetoastActive)
            setToggleReload(!toggleReload)

        } catch (error) {

            alert('Error', error);
        }


    }

    const handleCustomizeTemplate = (id, temp_id) => {
        setSelectedTemplate(temp_id)
        setTemplateUserId(id)
        setActivePage(3)
    }

    const handleChangeTemplate = (id, temp_id) => {
        setSelectedTemplate(temp_id)
        setTemplateUserId(id)
        setActivePage(2)


        // redirect.dispatch(Redirect.Action.APP, {
        //     path: `/templates`,
        // })
    }

    const handleSelectProducts = async (id) => {
        setBtnLoading((prev) => {
            let toggleId;
            if (prev[id]) {
                toggleId = { [id]: false };
            } else {
                toggleId = { [id]: true };
            }
            return { ...toggleId };
        });
        setProducts([])
        setSelectedItems([])

        const response = await axios
            .get(
                `${url}/products?user_template_id=${id}&shop_name=${host}`
            )

            .then(res => {
                console.log('select products response', res.data.result);

                let arr = []
                res.data.result?.map((item) => {
                    if (item.selected === true) {
                        arr.push(item.id)
                    }
                })
                setProducts(res.data.result)
                setTemplateUserId(id)
                setAssignedItems(arr)
                setSelectedItems(arr)
                setBtnLoading(false)
                setProductsModal(true)

            })
            .catch(error => {
                alert('Error', error);
                setBtnLoading(false)
                setProductsModal(false);
                setProducts([])
                setSelectedItems([])
            });

    }

    const handleSubmitProduct = async () => {
        setBtnLoading(true)
        let unSelected = []

        var selected = selectedItems.filter(function (item) {
            return assignedItems.indexOf(item) === -1;
        });

        var arr2 = products.filter(function (item) {
            return selectedItems.indexOf(item.id) === -1;
        });

        arr2?.map((item) => {
            unSelected.push(item.id)
        })

        let data = {
            user_template_id: templateUserId,
            product_ids: selected,
            unSelected_ids: unSelected,
            shop_name: host,
        };
        try {
            const response = await axios.post(`${url}/selected-products`, data)
            console.log('submit products response', response);
            setBtnLoading(false)
            setProductsModal(false);
            setProductsToastActive(!productsToastActive)
            setTemplateUserId()
        } catch (error) {
            alert('Error', error);
            setBtnLoading(false)
            setTemplateUserId()
            setProductsModal(false);
        }
    }


    return (
        <div className='Dashboard'>
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

            {productsModal &&
                products?.length ?
                <Modal
                    open={productsModal}
                    onClose={handleProductsModal}
                    title="Select Products"
                    primaryAction={{
                        content: 'Save',
                        disabled: btnloading ? true : false,
                        onAction: handleSubmitProduct,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: handleProductsModal,
                        },
                    ]}
                >
                    <Modal.Section>
                        <span className='Polaris-MediaCard-Table'>
                            <ResourceList
                                resourceName={{
                                    singular: 'product',
                                    plural: 'products'
                                }}
                                items={products}
                                loading={btnloading ? true : false}
                                renderItem={(item) => {
                                    const { id, image, title, selected, assigned, template_name } = item;
                                    const media = <Avatar size="small"
                                        shape="square"
                                        name={title}
                                        source={image} />;
                                    return (
                                        <span className={selected ? !assigned ? 'Selected-Product ResourceItem-ListItem' : 'ResourceItem-ListItem' : 'ResourceItem-ListItem'}>
                                            <ResourceItem
                                                id={id}
                                                media={media}
                                                accessibilityLabel={`View details for ${title}`}
                                            >
                                                <Text variant="bodyMd"
                                                    fontWeight="bold" as="h3">
                                                    {title}
                                                    {selected ? !assigned ?
                                                        <p className='Product-Assigned'>
                                                            {`Product assigned to ${template_name}`}
                                                        </p>
                                                        : '' : ''
                                                    }
                                                </Text>
                                            </ResourceItem>
                                        </span>
                                    );
                                }}
                                selectedItems={selectedItems}
                                onSelectionChange={setSelectedItems}
                                selectable
                            />
                        </span>
                    </Modal.Section>
                </Modal>
                :

                <Modal
                    open={productsModal}
                    onClose={handleProductsModal}
                    title="Select Products"
                    primaryAction={{
                        content: 'Save',
                        disabled: true,
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: handleProductsModal,
                        },
                    ]}
                >
                    <Modal.Section>
                        <EmptyState
                            heading="No Products to Show"
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                        </EmptyState>
                    </Modal.Section>
                </Modal>
            }

            {templateLoading ? <Loading /> :
                templateTable.length < 1 ?
                    <Templates /> :
                    <Page
                        title="Us vs Them"
                        fullWidth
                        titleMetadata={
                            <>
                                {appEnable ?
                                    <Badge status="success">Active</Badge> :
                                    <Badge status="attention">Pending</Badge>}
                            </>
                        }
                        primaryAction={
                            {
                                content: appEnable ? 'Disable the app' : 'Enable the app',
                                disabled: btnloading ? true : false,
                                onAction: handleAppStatus,
                            }
                        }
                    >
                        <Layout>
                            <Layout.Section>
                                {!appEnable &&
                                    <div className='App-Banner'>
                                        <Banner
                                            title="Your Us vs Them Widget was created. Now install the forms theme app embed."
                                            status="warning"
                                        >
                                            <List>
                                                <List.Item>
                                                    In order for your widgets to work on your storefront, go to your
                                                    online store editor
                                                    and turn on the forms theme app embed.
                                                </List.Item>
                                            </List>
                                            <div className='Polaris-Banner__Actions'>
                                                <div className='Polaris-ButtonGroup'>
                                                    <div className='Polaris-ButtonGroup__Item'>
                                                        <div className='Polaris-Banner__PrimaryAction'>
                                                            <button className='Polaris-Banner__Button'>
                                                                <a href={onlineStoreUrl} target='_blank'>Go to online store</a>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Banner>
                                    </div>
                                }

                                {/* {planExpireBanner &&
                                    planTrialDays > 0 &&
                                    <Banner
                                        title="Plan Expiry"
                                        status="info"
                                        onDismiss={() => setPlanExpireBanner(!planExpireBanner)}>

                                        <p>{`Your Plan will Expire in ${planTrialDays} days at ${planExpiry}`}</p>
                                    </Banner>
                                } */}

                                <Suspense>
                                    <div className='ProgressBar-Section'>
                                        <Card sectioned>
                                            <Text variant="headingLg" as="h5">
                                                {planName}
                                                <span>
                                                    ($7.99/month, additional charges $0.0001/view)
                                                </span>
                                            </Text>
                                            <Text variant="bodyMd" as="p">
                                                {`Get Upto ${planUsageLimit} monthly views`}
                                            </Text>
                                            <div className='ProgressBar'>
                                                <div className='ProgressBar-Value'>
                                                    <ProgressBar progress={((planCount / planUsageLimit) * 100)} color="primary" />
                                                    <p className='Initial'>0</p>
                                                    {planCount > 100 &&
                                                        <p style={{ left: `${((planCount / planUsageLimit) * 100)}%` }}>{planCount}</p>
                                                    }
                                                    <p className='Final'>{planUsageLimit} </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    <Card sectioned>
                                        <h5>Your current templates</h5>
                                        <div className='Current-Templates-Card-Content'>

                                            <Stack>
                                                <p>
                                                    This is your dashboard. It gathers all your templates. You can
                                                    create as many
                                                    as you want for each product.
                                                </p>

                                                <Link to={`/templates?shop=${config.shopOrigin}&host=${config.host}`}>
                                                    <Button size="slim" >Create a Table</Button>
                                                </Link>
                                            </Stack>
                                        </div>
                                    </Card>
                                </Suspense>

                                <Suspense>
                                    {templateLoading ?
                                        <Spinner accessibilityLabel="Loading..." size="large" /> :
                                        templateTable.length < 1 ?
                                            <Card sectioned>
                                                <EmptyState
                                                    heading="No table created yet!"
                                                    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"

                                                >
                                                    <Link to={`/templates?shop=${config.shopOrigin}&host=${config.host}`}>
                                                        <Button primary>Create a table</Button>
                                                    </Link>
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
                                                                    {btnloading[user_template_id] ?
                                                                        <Button primary loading>Select</Button>
                                                                        :
                                                                        <Button primary
                                                                            onClick={() => handleSelectProducts(user_template_id)}
                                                                            id='MediaCard-Btn'>Select Product</Button>
                                                                    }
                                                                </span>


                                                                <Link to={`/templates?shop=${config.shopOrigin}&host=${config.host}`}>
                                                                    <Button onClick={() => handleChangeTemplate(user_template_id, template_id)}>
                                                                        Change Template
                                                                    </Button>
                                                                </Link>


                                                                <Link to={`/templates?shop=${config.shopOrigin}&host=${config.host}`}>
                                                                    <Button onClick={() => handleCustomizeTemplate(user_template_id, template_id)}>
                                                                        Customize Template
                                                                    </Button>
                                                                </Link>

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
                                </Suspense>

                            </Layout.Section>

                        </Layout>
                        {toastRename}
                        {toastDelete}
                        {toastDuplicate}
                        {toastProducts}
                        {toastAppStatus}
                    </Page>
            }
        </div>
    );
}




