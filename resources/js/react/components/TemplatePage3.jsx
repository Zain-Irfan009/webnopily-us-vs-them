import React, { useState, useCallback, useEffect } from 'react'
import { Page, Layout, Text, Card, Select, Icon, Stack, TextField, Loading, } from '@shopify/polaris';
import { CircleTickMajor, CircleCancelMajor } from '@shopify/polaris-icons';
import { Table1, Table2, Table3, Table4, SideBarNavigation } from '../../components/usVsThem/index';

const themeHeadingsPc =
  [
    { title: '' },
    { title: 'Your Brand' },
    { title: 'Competitor 1' },
    { title: 'Competitor 2' },
    { title: 'Competitor 3' },
    { title: 'Competitor 4' },
  ]

export function TemplatePage3({ activePage, setActivePage, setLocationChange, selectedTemplate, setSelectedTemplate }) {

  const [templateName, setTemplateName] = useState('My Template');
  const [yourBrand, setYourBrand] = useState('Your brand');
  const [otherCompetitors, setOtherCompetitors] = useState('Other Competitors');
  const [advantagesCount, setAdvantagesCount] = useState('5');
  const [customAdvantagesCount, setCustomAdvantagesCount] = useState();
  const [loading, setLoading] = useState(false)

  const [allValues, setAllValues] = useState([]);
  const [brandValue, setBrandValue] = useState([]);
  const [competitorValue, setCompetitorValue] = useState([]);
  const [colorValues, setColorValues] = useState({
    background1: '#ffffff',
    background2: '#ebecf0',
    advantageColumn1: '#626dff',
    advantageColumn2: '#8c94ff',
    advantageColumn3: '#a9afff',
    brandCheck: '#474b8b',
    brandCross: '#7b7eac',
    competitorCheck: '#474b8b',
    competitorCross: '#7b7eac'
  })

  const [themeInputTable1, setThemeInputTable1] = useState([]);
  const [themeInputTable2, setThemeInputTable2] = useState([]);
  const [themeInputTable2Mobile, setThemeInputTable2Mobile] = useState([]);
  const [themeInputTable3, setThemeInputTable3] = useState([]);
  const [themeInputTable3Mobile, setThemeInputTable3Mobile] = useState([]);
  const [themeInputTable4, setThemeInputTable4] = useState([]);

  const handleTemplateName = useCallback((value) => setTemplateName(value), []);
  const handleBrandName = useCallback((value) => setYourBrand(value), []);
  const handleOtherCompetitors = useCallback((value) => setOtherCompetitors(value), []);
  const handleAdvantagesCount = useCallback((value) => setAdvantagesCount(value), []);
  const handleCustomAdvantagesCount = useCallback((value) => setCustomAdvantagesCount(value), []);


  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);

    {
      let theme1 = [];
      let theme2Pc = [];
      let theme3 = [];
      let theme3Mobile = [];
      let theme4 = [];
      let advantagesValues = [];
      let brandValues = [];
      let competitorValues = [];
      [...Array(Number(advantagesCount))].map((item, index) => (
        // advantagesValues.push({ name: `Advantage ${index + 1}` }),
        advantagesValues.push(`Advantage ${index + 1}`),
        brandValues.push(true),
        competitorValues.push(false),
        theme1.push(
          {
            name: `Advantage ${index + 1}`,
            yourBrand: true,
            competitor: false,
          },
        ),
        theme2Pc.push(
          {
            name: `Advantage ${index + 1}`,
            yourBrand: true,
            competitor1: false,
            competitor2: false,
            competitor3: false,
            competitor4: false,
          },
        ),
        theme3.push(
          {
            name: `Advantage ${index + 1}`,
            yourBrand: 'true',
            competitor1: 'false',
            competitor2: 'false',
            competitor3: 'false',
          },
        ),
        theme3Mobile.push(
          {
            name: `Advantage ${index + 1}`,
            yourBrand: 'true',
            competitor: 'false',
          },
        ),
        theme4.push(
          {
            name: 'advantage 1',
            yourBrand: 'true',
            others: 'false',
          },
        )
      ))
      setThemeInputTable1(theme1)
      setThemeInputTable2(theme2Pc)
      setThemeInputTable3(theme3)
      setThemeInputTable3Mobile(theme3Mobile)
      setThemeInputTable4(theme4)

      setAllValues(advantagesValues)
      setBrandValue(brandValues)
      setCompetitorValue(competitorValues)
    }
  }, [advantagesCount])

  const handleAllValues = e => {
    // setAllValues({ ...allValues, [e.target.name - 1]:  e.target.value });
    setAllValues({ ...allValues, [e.target.name - 1]: e.target.value });
    themeInputTable1[e.target.name - 1].name = e.target.value;
    themeInputTable2[e.target.name - 1].name = e.target.value;
    themeInputTable3[e.target.name - 1].name = e.target.value;
    themeInputTable3Mobile[e.target.name - 1].name = e.target.value;
    themeInputTable4[e.target.name - 1].name = e.target.value;

  }

  const handleBrandValue = e => {
    setBrandValue({ ...brandValue, [e.target.name]: e.target.value });

    themeInputTable3[e.target.name].yourBrand = e.target.value;
    themeInputTable4[e.target.name].yourBrand = e.target.value;
    themeInputTable3Mobile[e.target.name].yourBrand = e.target.value;

    if (e.target.value === 'true') {
      themeInputTable1[e.target.name].yourBrand = true;
      themeInputTable2[e.target.name].yourBrand = true;
    }
    else if (e.target.value === 'false') {
      themeInputTable1[e.target.name].yourBrand = false;
      themeInputTable2[e.target.name].yourBrand = false;
    }
    else {
      themeInputTable1[e.target.name].yourBrand = e.target.value;
    }

  }

  const handleCompetitorValue = e => {
    setCompetitorValue({ ...competitorValue, [e.target.name]: e.target.value });

    themeInputTable3[e.target.name].competitor1 = e.target.value;
    themeInputTable3[e.target.name].competitor2 = e.target.value;
    themeInputTable3[e.target.name].competitor3 = e.target.value;
    themeInputTable3Mobile[e.target.name].competitor = e.target.value;
    themeInputTable4[e.target.name].others = e.target.value;

    if (e.target.value === 'true') {
      themeInputTable1[e.target.name].competitor = true;
      themeInputTable2[e.target.name].competitor1 = true;
      themeInputTable2[e.target.name].competitor2 = true;
      themeInputTable2[e.target.name].competitor3 = true;
      themeInputTable2[e.target.name].competitor4 = true;
    }
    else if (e.target.value === 'false') {
      themeInputTable1[e.target.name].competitor = false;
      themeInputTable2[e.target.name].competitor1 = false;
      themeInputTable2[e.target.name].competitor2 = false;
      themeInputTable2[e.target.name].competitor3 = false;
      themeInputTable2[e.target.name].competitor4 = false;
    }
    else {
      themeInputTable1[e.target.name].competitor = e.target.value;
    }

  }

  const handleColorValues = e => {
    setColorValues({ ...colorValues, [e.target.name]: e.target.value });
  }

  // useEffect(() => {
  //   console.log('templateName: ', templateName);
  //   console.log('yourBrand: ', yourBrand);
  //   console.log('otherCompetitors: ', otherCompetitors);
  //   console.log('allValues: ', allValues);
  //   console.log('brandValue: ', brandValue);
  //   console.log('competitorValue: ', competitorValue);
  //   console.log('colorValues: ', colorValues);

  // }, [allValues, brandValue, competitorValue])

  return (
    <div className='Template-Page3'>
      <Page fullWidth>
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
                  onAction: () => { },
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
                  onAction: () => { },
                }
              ]}>

              <div className='Advantages-Layout'>
                <Layout>
                  <Layout.Section oneHalf>
                    <Select
                      label="Number of advantages"
                      options={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' },
                        { label: '6', value: '6' },
                        { label: '7', value: '7' },
                        { label: '8', value: '8' },
                        { label: '9', value: '9' },
                        { label: '10', value: '10' },
                        // { label: 'Custom', value: '0' },
                      ]}
                      onChange={handleAdvantagesCount}
                      value={advantagesCount}
                    />
                  </Layout.Section>

                  <Layout.Section oneHalf>
                    {/* {advantagesCount === '0' &&
                      <TextField
                        label="Enter Value"
                        value={customAdvantagesCount}
                        onChange={handleCustomAdvantagesCount}
                        autoComplete="off"
                      />
                    } */}
                  </Layout.Section>
                </Layout>

                {loading ? <Loading /> :
                  <div className='Advantages-Content-Section'>
                    {[...Array(Number(advantagesCount))].map((item, index) => (
                      <Layout key={index + 1}>
                        <Layout.Section >
                          <div className='Advantages-Inputs-Section'>
                            <div className='Advantage-Input-Field'>
                              <div className="Polaris-Labelled__LabelWrapper">
                                <div className="Polaris-Label">
                                  <label id={index + 1} htmlFor={index + 1} className="Polaris-Label__Text">
                                    <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">Advantage {index + 1}</span>
                                  </label>
                                </div>
                              </div>
                              <div className="Polaris-Connected">
                                <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                  <div className="Polaris-TextField Polaris-TextField--hasValue">
                                    <input type="text"
                                      className="Polaris-TextField__Input"
                                      id={index + 1}
                                      autoComplete="off"
                                      // placeholder={`Enter Advantage ${index + 1}`}
                                      defaultValue={`Advantage ${index + 1}`}
                                      name={index + 1}
                                      onChange={handleAllValues}
                                    />
                                    <div className="Polaris-TextField__Backdrop"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Layout.Section>

                        <Layout.Section secondary >
                          <div className='Advantages-Brands-Section'>
                            <Stack>
                              <Stack vertical>
                                <h2>
                                  Your Brand
                                </h2>
                                <Stack>
                                  <span className='Advantages-Input-True-Icon'>
                                    <label
                                      className={`${brandValue[index] === true || brandValue[index] === 'true' && 'Selected'}`}>
                                      <input type="radio" id={index} name={index} value={true} onChange={handleBrandValue} />
                                      <Icon source={CircleTickMajor}></Icon>
                                    </label>
                                  </span>

                                  <span className='Advantages-Input-False-Icon'>
                                    <label
                                      className={`${brandValue[index] === false || brandValue[index] === 'false' && 'Selected'}`}>
                                      <input type="radio" id={index} name={index} value={false} onChange={handleBrandValue} />
                                      <Icon source={CircleCancelMajor}>
                                      </Icon>
                                    </label>
                                  </span>
                                </Stack>
                              </Stack>

                              <Stack vertical>
                                <h2>
                                  Competitors
                                </h2>
                                <Stack>
                                  <span className='Advantages-Input-True-Icon'>
                                    <label
                                      className={`${competitorValue[index] === true || competitorValue[index] === 'true' && 'Selected'}`}>
                                      <input type="radio" id={index} name={index} value={true} onChange={handleCompetitorValue} />
                                      <Icon source={CircleTickMajor}></Icon>
                                    </label>
                                  </span>

                                  <span className='Advantages-Input-False-Icon'>
                                    <label
                                      className={`${competitorValue[index] === false || competitorValue[index] === 'false' && 'Selected'}`}>
                                      <input type="radio" id={index} name={index} value={false} onChange={handleCompetitorValue} />
                                      <Icon source={CircleCancelMajor}>
                                      </Icon>
                                    </label>
                                  </span>
                                </Stack>
                              </Stack>

                            </Stack>
                          </div>
                        </Layout.Section>
                      </Layout>
                    ))}
                  </div>
                }
              </div>
            </Card>

            <Card
              sectioned
              title='Styling'
              actions={[
                {
                  content: 'Preview',
                  onAction: () => { },
                }
              ]}>
              <Text variant="headingMd" as="h5" fontWeight='semibold'>
                Colors
              </Text>

              <div className='Color-Inputs MarginZero'>
                <Stack>
                  <label
                    className={`${colorValues.background1 === '#ffffff' || colorValues.background1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.background1 }}>
                    <input type="color"
                      value={colorValues.background1}
                      name='background1'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Background 1
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.background1}
                      </Text>
                    </Stack>
                  </span>
                </Stack>

                <Stack>
                  <label
                    className={`${colorValues.background2 === '#ffffff' || colorValues.background2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.background2 }}>
                    <input type="color"
                      value={colorValues.background2}
                      name='background2'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Background 2
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.background2}
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
                    className={`${colorValues.advantageColumn1 === '#ffffff' || colorValues.advantageColumn1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.advantageColumn1 }}>
                    <input type="color"
                      value={colorValues.advantageColumn1}
                      name='advantageColumn1'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Advantages column 1
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.advantageColumn1}
                      </Text>
                    </Stack>
                  </span>
                </Stack>

                <Stack>
                  <label
                    className={`${colorValues.advantageColumn2 === '#ffffff' || colorValues.advantageColumn2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.advantageColumn2 }}>
                    <input type="color"
                      value={colorValues.advantageColumn2}
                      name='advantageColumn2'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Advantages column 2
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.advantageColumn2}
                      </Text>
                    </Stack>
                  </span>
                </Stack>

                <Stack>
                  <label
                    className={`${colorValues.advantageColumn3 === '#ffffff' || colorValues.advantageColumn3 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.advantageColumn3 }}>
                    <input type="color"
                      value={colorValues.advantageColumn3}
                      name='advantageColumn3'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Advantages column 3
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.advantageColumn3}
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
                    className={`${colorValues.brandCheck === '#ffffff' || colorValues.brandCheck === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.brandCheck }}>
                    <input type="color"
                      value={colorValues.brandCheck}
                      name='brandCheck'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Check color
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.brandCheck}
                      </Text>
                    </Stack>
                  </span>
                </Stack>

                <Stack>
                  <label
                    className={`${colorValues.brandCross === '#ffffff' || colorValues.brandCross === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.brandCross }}>
                    <input type="color"
                      value={colorValues.brandCross}
                      name='brandCross'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Cross Color
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.brandCross}
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
                    className={`${colorValues.competitorCheck === '#ffffff' || colorValues.competitorCheck === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.competitorCheck }}>
                    <input type="color"
                      value={colorValues.competitorCheck}
                      name='competitorCheck'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Check color
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.competitorCheck}
                      </Text>
                    </Stack>
                  </span>
                </Stack>

                <Stack>
                  <label
                    className={`${colorValues.competitorCross === '#ffffff' || colorValues.competitorCross === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                    style={{ backgroundColor: colorValues.competitorCross }}>
                    <input type="color"
                      value={colorValues.competitorCross}
                      name='competitorCross'
                      onChange={handleColorValues}
                    />
                  </label>

                  <span className='Color-Property'>
                    <Stack vertical>
                      <Text variant="headingSm" as="h6" fontWeight="semibold">
                        Cross Color
                      </Text>
                      <Text variant="headingXs" as="h6" fontWeight="medium">
                        {colorValues.competitorCross}
                      </Text>
                    </Stack>
                  </span>
                </Stack>
              </div>

            </Card>
          </Layout.Section>


          <Layout.Section secondary>
            <SideBarNavigation activePage={activePage} setActivePage={setActivePage} setLocationChange={setLocationChange} />

            <div className='Advantages-Tables-Preview'>
              {(() => {
                switch (selectedTemplate) {
                  case 1:
                    return <Table1 themePc={themeInputTable1} themeMobile={themeInputTable1} />
                  case 2:
                    return <Table2 themePc={themeInputTable2} themeMobile={themeInputTable2}
                      themeHeadingsMobile={themeHeadingsPc} themeHeadingsPc={themeHeadingsPc} />
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
      </Page>
    </div>
  )
}



