import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Page, Layout, Text, Card, Select, Icon, Stack, TextField, Loading, PageActions } from '@shopify/polaris';
import { CircleTickMajor, CircleCancelMajor } from '@shopify/polaris-icons';
import { Table11, Table1, Table2, Table3, Table4, SideBarNavigation } from './index';
import axios from "axios";
import { AppContext } from '../Context'

const themeHeadingsPc =
  [
    { title: '' },
    { title: 'Your Brand' },
    { title: 'Competitor 1' },
    { title: 'Competitor 2' },
    { title: 'Competitor 3' },
    { title: 'Competitor 4' },
  ]


export function TemplatePage3() {
  const { activePage, setActivePage, selectedTemplate, templateUserId } = useContext(AppContext);
  let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');

  const [templateName, setTemplateName] = useState();
  const [yourBrand, setYourBrand] = useState();
  const [otherCompetitors, setOtherCompetitors] = useState();
  const [advantagesCount, setAdvantagesCount] = useState();
  const [customAdvantagesCount, setCustomAdvantagesCount] = useState();
  const [loading, setLoading] = useState(true)
  const [advantageToggle, setAdvantageToggle] = useState(false)
  const [fixedAdvantages, setFixedAdvantages] = useState();
  const [fixedBrand, setFixedBrand] = useState();
  const [fixedCompetitor, setCompetitor] = useState();
  const [fixedTable, setFixedTable] = useState();

  const [allValues, setAllValues] = useState([]);
  const [brandValue, setBrandValue] = useState([]);
  const [competitorValue, setCompetitorValue] = useState([]);
  const [colorValues, setColorValues] = useState([])

  const [themeInputTable1, setThemeInputTable1] = useState([]);
  const [themeInputTable2, setThemeInputTable2] = useState([]);
  const [themeInputTable2Mobile, setThemeInputTable2Mobile] = useState([]);
  const [themeInputTable3, setThemeInputTable3] = useState([]);
  const [themeInputTable3Mobile, setThemeInputTable3Mobile] = useState([]);
  const [themeInputTable4, setThemeInputTable4] = useState([]);

  const handleTemplateName = useCallback((value) => setTemplateName(value), []);
  const handleBrandName = useCallback((value) => setYourBrand(value), []);
  const handleOtherCompetitors = useCallback((value) => setOtherCompetitors(value), []);
  const handleAdvantagesCount = useCallback((value) => {
    setAdvantagesCount(value)
    setAdvantageToggle(true)
  });

  const getData = async () => {
    const response = await axios
      .get(
        `https://phpstack-362288-3089196.cloudwaysapps.com/api/template-data?user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        console.log('table data', res.data.result);
        setTemplateName(res.data.result.template_name)
        setYourBrand(res.data.result.brand)
        setOtherCompetitors(res.data.result.competitor)
        setAdvantagesCount(res.data.result.advantages_count)
        setAllValues(res.data.result.advantages)
        setBrandValue(res.data.result.brands)
        setCompetitorValue(res.data.result.competitors)
        setColorValues(res.data.result.colors[0])
        setThemeInputTable1(res.data.result.items)
        // setThemeInputTable2(res.data.result.items)
        // setThemeInputTable3(res.data.result.items)
        // setThemeInputTable4(res.data.result.items)
        // setThemeInputTable3Mobile(res.data.result.items)
        setFixedAdvantages(res.data.result.advantages)
        setFixedBrand(res.data.result.brands)
        setCompetitor(res.data.result.competitors)
        setFixedTable(res.data.result.items)

        setTimeout(() => {
          setLoading(false);
        }, 500);

      })
      .catch(error =>
        alert('Error: ', error));
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAllValues = e => {
    setAllValues({ ...allValues, [e.target.name - 1]: e.target.value });
    themeInputTable1[e.target.name - 1].advantage = e.target.value;
    // themeInputTable2[e.target.name - 1].name = e.target.value;
    // themeInputTable3[e.target.name - 1].name = e.target.value;
    // themeInputTable3Mobile[e.target.name - 1].name = e.target.value;
    // themeInputTable4[e.target.name - 1].name = e.target.value;
  }

  const handleBrandValue = e => {

    // themeInputTable3[e.target.name].yourBrand = e.target.value;
    // themeInputTable4[e.target.name].yourBrand = e.target.value;
    // themeInputTable3Mobile[e.target.name].yourBrand = e.target.value;

    if (e.target.value === 'true') {
      setBrandValue({ ...brandValue, [e.target.name]: true });
      themeInputTable1[e.target.name].brand = true;
      // themeInputTable2[e.target.name].yourBrand = true;
    }
    else if (e.target.value === 'false') {
      setBrandValue({ ...brandValue, [e.target.name]: false });
      themeInputTable1[e.target.name].brand = false;
      // themeInputTable2[e.target.name].yourBrand = false;
    }
    else {
      themeInputTable1[e.target.name].brand = e.target.value;
    }

  }

  const handleCompetitorValue = e => {

    // themeInputTable3[e.target.name].competitor1 = e.target.value;
    // themeInputTable3[e.target.name].competitor2 = e.target.value;
    // themeInputTable3[e.target.name].competitor3 = e.target.value;
    // themeInputTable3Mobile[e.target.name].competitor = e.target.value;
    // themeInputTable4[e.target.name].others = e.target.value;

    if (e.target.value === 'true') {
      setCompetitorValue({ ...competitorValue, [e.target.name]: true });
      themeInputTable1[e.target.name].competitor = true;
      // themeInputTable2[e.target.name].competitor1 = true;
      // themeInputTable2[e.target.name].competitor2 = true;
      // themeInputTable2[e.target.name].competitor3 = true;
      // themeInputTable2[e.target.name].competitor4 = true;
    }
    else if (e.target.value === 'false') {
      setCompetitorValue({ ...competitorValue, [e.target.name]: false });
      themeInputTable1[e.target.name].competitor = false;
      // themeInputTable2[e.target.name].competitor1 = false;
      // themeInputTable2[e.target.name].competitor2 = false;
      // themeInputTable2[e.target.name].competitor3 = false;
      // themeInputTable2[e.target.name].competitor4 = false;
    }
    else {
      themeInputTable1[e.target.name].competitor = e.target.value;
    }

  }

  const handleColorValues = e => {
    setColorValues({ ...colorValues, [e.target.name]: e.target.value });
  }

  const changeAdvantageValues = () => {
    let advantagesValues = {};
    let brandValues = {};
    let competitorValues = {};
    let theme1 = [];

    [...Array(Number(advantagesCount))].map((item, index) => {

      // if (index < fixedAdvantages.length) {
      //   advantagesValues = ({ ...advantagesValues, [index]: fixedAdvantages[index] })
      //   brandValues = ({ ...brandValues, [index]: fixedBrand[index] })
      //   competitorValues = ({ ...competitorValues, [index]: fixedCompetitor[index] })
      //   theme1.push({
      //     advantage: fixedTable[index].advantage,
      //     brand: fixedTable[index].brand,
      //     competitor: fixedTable[index].competitor,
      //   })
      // }
      // else {
      //   advantagesValues = ({ ...advantagesValues, [index]: `Advantage ${index + 1}` })
      //   brandValues = ({ ...brandValues, [index]: true })
      //   competitorValues = ({ ...competitorValues, [index]: false })
      //   theme1.push({
      //     advantage: `Advantage ${index + 1}`,
      //     brand: true,
      //     competitor: false,
      //   })
      // }

      advantagesValues = ({ ...advantagesValues, [index]: `Advantage ${index + 1}` })
      brandValues = ({ ...brandValues, [index]: true })
      competitorValues = ({ ...competitorValues, [index]: false })
      theme1.push({
        advantage: `Advantage ${index + 1}`,
        brand: true,
        competitor: false,
      })

    })

    console.log(theme1);
    setAllValues(advantagesValues)
    setBrandValue(brandValues)
    setCompetitorValue(competitorValues)
    setThemeInputTable1(theme1)
    setAdvantageToggle(false)
  }

  useEffect(() => {
    {
      advantageToggle &&
        changeAdvantageValues()
    }
  }, [advantageToggle])



  const submitData = async () => {
    let data = {
      brand: yourBrand,
      competitor: otherCompetitors,
      advantages: allValues,
      brands: brandValue,
      competitors: competitorValue,
      template_id: selectedTemplate,
      template_name: templateName,
      user_template_id: templateUserId,
      background_color1: colorValues?.background_color1,
      background_color2: colorValues?.background_color2,
      column1_color: colorValues?.column1_color,
      column2_color: colorValues?.column2_color,
      column3_color: colorValues?.column3_color,
      brand_checkbox_color1: colorValues?.brand_checkbox_color1,
      brand_checkbox_color2: colorValues?.brand_checkbox_color2,
      competitors_checkbox_color1: colorValues?.competitors_checkbox_color1,
      competitors_checkbox_color2: colorValues?.competitors_checkbox_color2,
      advantages_count: advantagesCount,
      shop_name: host,
    };

    try {
      const response = await axios.post('https://phpstack-362288-3089196.cloudwaysapps.com/api/step-2', data)
      console.log(response);
      setActivePage(4)
    } catch (error) {
      alert('Error: ', error);
    }
  }


  return (
    <div className='Template-Page3'>
      <Page fullWidth>
        {loading ? <Loading /> :
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <h5>Customize your template style</h5>
                <p> Edit the colors, the texts and the fields of the app.</p>
              </Card>

              <Card
                sectioned
                title='Top fields'
                actions={[
                  {
                    content: 'Preview',
                    onAction: () => {
                    },
                  }
                ]}>
                <TextField
                  label="Template Name"
                  value={templateName}
                  onChange={handleTemplateName}
                  autoComplete="off"
                />
                <br />

                <TextField
                  label="Brand"
                  value={yourBrand}
                  onChange={handleBrandName}
                  autoComplete="off"
                />
                <br />

                <TextField
                  label="Competitors"
                  value={otherCompetitors}
                  onChange={handleOtherCompetitors}
                  autoComplete="off"
                />
              </Card>

              <Card
                sectioned
                title='Advantages'
                actions={[
                  {
                    content: 'Preview',
                    onAction: () => {
                    },
                  }
                ]}>

                <div className='Advantages-Layout'>
                  <Layout>
                    <Layout.Section oneHalf>
                      <TextField
                        label="Number of advantages"
                        value={advantagesCount}
                        onChange={handleAdvantagesCount}
                        autoComplete="off"
                      />
                    </Layout.Section>

                    <Layout.Section oneHalf></Layout.Section>
                  </Layout>


                  {/*<div className='Advantages-Content-Section'>*/}
                  {/*  {[...Array(Number(advantagesCount))].map((item, index) => (*/}
                  {/*    <Layout key={index + 1}>*/}
                  {/*      <Layout.Section>*/}
                  {/*        <div className='Advantages-Inputs-Section'>*/}
                  {/*          <div className='Advantage-Input-Field'>*/}
                  {/*            <div className="Polaris-Labelled__LabelWrapper">*/}
                  {/*              <div className="Polaris-Label">*/}
                  {/*                <label id={index + 1} htmlFor={index + 1}*/}
                  {/*                  className="Polaris-Label__Text">*/}
                  {/*                  <span*/}
                  {/*                    className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">Advantage {index + 1}</span>*/}
                  {/*                </label>*/}
                  {/*              </div>*/}
                  {/*            </div>*/}
                  {/*            <div className="Polaris-Connected">*/}
                  {/*              <div*/}
                  {/*                className="Polaris-Connected__Item Polaris-Connected__Item--primary">*/}
                  {/*                <div*/}
                  {/*                  className="Polaris-TextField Polaris-TextField--hasValue">*/}
                  {/*                  <input type="text"*/}
                  {/*                    className="Polaris-TextField__Input"*/}
                  {/*                    id={index + 1}*/}
                  {/*                    autoComplete="off"*/}
                  {/*                    // defaultValue={`Advantage ${index + 1}`}*/}
                  {/*                    value={allValues[index]}*/}
                  {/*                    name={index + 1}*/}
                  {/*                    onChange={handleAllValues}*/}
                  {/*                  />*/}
                  {/*                  <div className="Polaris-TextField__Backdrop"></div>*/}
                  {/*                </div>*/}
                  {/*              </div>*/}
                  {/*            </div>*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*      </Layout.Section>*/}

                  {/*      <Layout.Section secondary>*/}
                  {/*        <div className='Advantages-Brands-Section'>*/}
                  {/*          <Stack>*/}
                  {/*            <Stack vertical>*/}
                  {/*              <h2>*/}
                  {/*                Your Brand*/}
                  {/*              </h2>*/}
                  {/*              <Stack>*/}
                  {/*                <span className='Advantages-Input-True-Icon'>*/}
                  {/*                  <label*/}
                  {/*                    className={`${brandValue[index] === true || brandValue[index] === 'true' ? 'Selected' : ''}`}>*/}
                  {/*                    <input type="radio"*/}
                  {/*                      id={index}*/}
                  {/*                      name={index}*/}
                  {/*                      value={true}*/}
                  {/*                      onChange={handleBrandValue}*/}
                  {/*                    />*/}
                  {/*                    <Icon source={CircleTickMajor}></Icon>*/}
                  {/*                  </label>*/}
                  {/*                </span>*/}

                  {/*                <span className='Advantages-Input-False-Icon'>*/}
                  {/*                  <label*/}
                  {/*                    className={`${brandValue[index] === false || brandValue[index] === 'false' ? 'Selected' : ''}`}>*/}
                  {/*                    <input type="radio"*/}
                  {/*                      id={index}*/}
                  {/*                      name={index}*/}
                  {/*                      value={false}*/}
                  {/*                      onChange={handleBrandValue}*/}
                  {/*                    />*/}
                  {/*                    <Icon source={CircleCancelMajor}>*/}
                  {/*                    </Icon>*/}
                  {/*                  </label>*/}
                  {/*                </span>*/}
                  {/*              </Stack>*/}
                  {/*            </Stack>*/}

                  {/*            <Stack vertical>*/}
                  {/*              <h2>*/}
                  {/*                Competitors*/}
                  {/*              </h2>*/}
                  {/*              <Stack>*/}
                  {/*                <span className='Advantages-Input-True-Icon'>*/}
                  {/*                  <label*/}
                  {/*                    className={`${competitorValue[index] === true || competitorValue[index] === 'true' ? 'Selected' : ''}`}>*/}
                  {/*                    <input type="radio" id={index} name={index} value={true}*/}
                  {/*                      onChange={handleCompetitorValue} />*/}
                  {/*                    <Icon source={CircleTickMajor}></Icon>*/}
                  {/*                  </label>*/}
                  {/*                </span>*/}

                  {/*                <span className='Advantages-Input-False-Icon'>*/}
                  {/*                  <label*/}
                  {/*                    className={`${competitorValue[index] === false || competitorValue[index] === 'false' ? 'Selected' : ''}`}>*/}
                  {/*                    <input type="radio" id={index} name={index} value={false}*/}
                  {/*                      onChange={handleCompetitorValue} />*/}
                  {/*                    <Icon source={CircleCancelMajor}>*/}
                  {/*                    </Icon>*/}
                  {/*                  </label>*/}
                  {/*                </span>*/}
                  {/*              </Stack>*/}
                  {/*            </Stack>*/}

                  {/*          </Stack>*/}
                  {/*        </div>*/}
                  {/*      </Layout.Section>*/}
                  {/*    </Layout>*/}
                  {/*  ))}*/}
                  {/*</div>*/}

                </div>
              </Card>


              <Card
                sectioned
                title='Styling'
                actions={[
                  {
                    content: 'Preview',
                    onAction: () => {
                    },
                  }
                ]}>
                <Text variant="headingMd" as="h5" fontWeight='semibold'>
                  Colors
                </Text>

                <div className='Color-Inputs MarginZero'>
                  <Stack>
                    <label
                      className={`${colorValues?.background_color1 === '#ffffff' || colorValues?.background_color1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.background_color1 }}>
                      <input type="color"
                        value={colorValues?.background_color1}
                        name='background_color1'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Background 1
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.background_color1}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>

                  <Stack>
                    <label
                      className={`${colorValues?.background_color2 === '#ffffff' || colorValues?.background_color2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.background_color2 }}>
                      <input type="color"
                        value={colorValues?.background_color2}
                        name='background_color2'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Background 2
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.background_color2}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>
                </div>

                <div className='Color-Inputs'>
                  <Text variant="bodyMd" as="p" color="subdued">
                    Advantages colors
                  </Text>
                  <Stack>
                    <label
                      className={`${colorValues?.column1_color === '#ffffff' || colorValues?.column1_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.column1_color }}>
                      <input type="color"
                        value={colorValues?.column1_color}
                        name='column1_color'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Advantages column 1
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.column1_color}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>

                  <Stack>
                    <label
                      className={`${colorValues?.column2_color === '#ffffff' || colorValues?.column2_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.column2_color }}>
                      <input type="color"
                        value={colorValues?.column2_color}
                        name='column2_color'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Advantages column 2
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.column2_color}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>

                  <Stack>
                    <label
                      className={`${colorValues?.column3_color === '#ffffff' || colorValues?.column3_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.column3_color }}>
                      <input type="color"
                        value={colorValues?.column3_color}
                        name='column3_color'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Advantages column 3
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.column3_color}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>
                </div>

                <div className='Color-Inputs'>
                  <Text variant="bodyMd" as="p" color="subdued">
                    Check and cross colors (your brand)
                  </Text>
                  <Stack>
                    <label
                      className={`${colorValues?.brand_checkbox_color1 === '#ffffff' || colorValues?.brand_checkbox_color1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.brand_checkbox_color1 }}>
                      <input type="color"
                        value={colorValues?.brand_checkbox_color1}
                        name='brand_checkbox_color1'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Check color
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.brand_checkbox_color1}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>

                  <Stack>
                    <label
                      className={`${colorValues?.brand_checkbox_color2 === '#ffffff' || colorValues?.brand_checkbox_color2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.brand_checkbox_color2 }}>
                      <input type="color"
                        value={colorValues?.brand_checkbox_color2}
                        name='brand_checkbox_color2'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Cross Color
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.brand_checkbox_color2}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>
                </div>

                <div className='Color-Inputs'>
                  <Text variant="bodyMd" as="p" color="subdued">
                    Check and cross colors (competitors)
                  </Text>
                  <Stack>
                    <label
                      className={`${colorValues?.competitors_checkbox_color1 === '#ffffff' || colorValues?.competitors_checkbox_color1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.competitors_checkbox_color1 }}>
                      <input type="color"
                        value={colorValues?.competitors_checkbox_color1}
                        name='competitors_checkbox_color1'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Check color
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.competitors_checkbox_color1}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>

                  <Stack>
                    <label
                      className={`${colorValues?.competitors_checkbox_color2 === '#ffffff' || colorValues?.competitors_checkbox_color2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                      style={{ backgroundColor: colorValues?.competitors_checkbox_color2 }}>
                      <input type="color"
                        value={colorValues?.competitors_checkbox_color2}
                        name='competitors_checkbox_color2'
                        onChange={handleColorValues}
                      />
                    </label>

                    <span className='Color-Property'>
                      <Stack vertical>
                        <Text variant="headingSm" as="h6" fontWeight="semibold">
                          Cross Color
                        </Text>
                        <Text variant="headingXs" as="h6" fontWeight="medium">
                          {colorValues?.competitors_checkbox_color2}
                        </Text>
                      </Stack>
                    </span>
                  </Stack>
                </div>

              </Card>

              <div className='Template-Save-Actions'>
                <PageActions
                  primaryAction={{
                    content: 'Save Template',
                    onAction: submitData
                  }}
                />
              </div>
            </Layout.Section>


            <Layout.Section secondary>
              <SideBarNavigation />

              <div className='Advantages-Tables-Preview'>
                {(() => {
                  switch (selectedTemplate) {
                    case 1:
                      return <Table11 themePc={themeInputTable1} themeMobile={themeInputTable1} />
                    case 2:
                      return <Table2 themePc={themeInputTable2} themeMobile={themeInputTable2}
                        themeHeadingsMobile={themeHeadingsPc}
                        themeHeadingsPc={themeHeadingsPc} />
                    case 3:
                      return <Table3 themePc={themeInputTable3} themeMobile={themeInputTable3Mobile} />
                    case 4:
                      return <Table4 themePc={themeInputTable4} themeMobile={themeInputTable4} />
                    default:
                      break
                  }

                })()}

              </div>


            </Layout.Section>
          </Layout>
        }
      </Page>
    </div>
  )
}



