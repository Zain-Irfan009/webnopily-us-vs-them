import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Page, Layout, Text, Card, Select, Icon, Stack, TextField, Loading, PageActions } from '@shopify/polaris';
import { CircleTickMajor, CircleCancelMajor } from '@shopify/polaris-icons';
import { Table11, Table22, Table33, Table44, SideBarNavigation } from './index';
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
  const { activePage, setActivePage, selectedTemplate, templateUserId, url } = useContext(AppContext);
  let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
  const [btnloading, setBtnLoading] = useState(false)
  const [templateName, setTemplateName] = useState();
  const [yourBrand, setYourBrand] = useState();
  const [advantagesCount, setAdvantagesCount] = useState();
  const [competitorsCount, setCompetitorsCount] = useState();
  const [customAdvantagesCount, setCustomAdvantagesCount] = useState();
  const [loading, setLoading] = useState(true)
  const [advantageToggle, setAdvantageToggle] = useState(false)
  const [competitorToggle, setCompetitorToggle] = useState(false)
  const [competitorValueToggle, setCompetitorValueToggle] = useState(false)
  const [fixedAdvantages, setFixedAdvantages] = useState();
  const [fixedBrand, setFixedBrand] = useState();
  const [fixedCompetitor, setCompetitor] = useState();
  const [fixedTable, setFixedTable] = useState();
    const [advantageLoading, setAdvantageLoading] = useState(false)

  const [allValues, setAllValues] = useState([]);
  const [competitorName, setCompetitorName] = useState([]);
  const [brandValue, setBrandValue] = useState([]);
  const [competitorValue, setCompetitorValue] = useState([]);
  const [colorValues, setColorValues] = useState([])
  const [advantageColorValues, setAdvantageColorValues] = useState([])

  const [themeInputTable1, setThemeInputTable1] = useState([]);
  const [themeInputTable2, setThemeInputTable2] = useState([]);
  const [themeInputTable2Mobile, setThemeInputTable2Mobile] = useState([]);
  const [themeInputTable3, setThemeInputTable3] = useState([]);
  const [themeInputTable3Mobile, setThemeInputTable3Mobile] = useState([]);
  const [themeInputTable4, setThemeInputTable4] = useState([]);

  const handleTemplateName = useCallback((value) => setTemplateName(value), []);
  const handleBrandName = useCallback((value) => setYourBrand(value), []);
  const handleAdvantagesCount = useCallback((value) => {
    setAdvantagesCount(value)
    setAdvantageToggle(true)
  }, []);
  const handleCompetitorsCount = useCallback((value) => {
    setCompetitorsCount(value)
    setCompetitorToggle(true)
  }, []);

  useEffect(() => {
    // console.log('advan', advantagesCount)
    // console.log(competitorsCount)
    console.log(competitorValue)
  }, [competitorsCount, advantagesCount, competitorValue]);

  const getData = async () => {
    const response = await axios
      .get(
        `${url}/template-data?user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        console.log('table data', res.data.result);
        setTemplateName(res.data.result.template_name)
        setYourBrand(res.data.result.brand)
        setCompetitorsCount(res.data.result.competators_count)
        setAdvantagesCount(res.data.result.advantages_count)

        setAllValues(res.data.result.advantages)
        setCompetitorName(res.data.result.competitors_name)
        setBrandValue(res.data.result.brand_value)
        setCompetitorValue(res.data.result.competitor_value)
        setColorValues(res.data.result.primary_colors[0])
        setAdvantageColorValues(res.data.result.advantage_color_values)
        setThemeInputTable1(res.data.result.items)
        setFixedAdvantages(res.data.result.advantages)
        setFixedBrand(res.data.result.brand_value)
        setCompetitor(res.data.result.competitor_value)
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
  }

  const handleCompetitorName = e => {
    setCompetitorName({ ...competitorName, [e.target.name - 1]: e.target.value });
  }


  const handleBrandValue = e => {

    if (e.target.value === 'true') {
      setBrandValue({ ...brandValue, [e.target.name]: true });
      themeInputTable1[e.target.name].brand = true;
    }
    else if (e.target.value === 'false') {
      setBrandValue({ ...brandValue, [e.target.name]: false });
      themeInputTable1[e.target.name].brand = false;
      ;
    }
    else {
      themeInputTable1[e.target.name].brand = e.target.value;
    }

  }


  const handleCompetitorValue = (index, index2, value) => {
    let competitor_values = (competitorValue)
    competitor_values[index][index2] = value;
    setCompetitorValue(competitor_values)
      console.log(competitor_values)
    setCompetitorValueToggle(!competitorValueToggle)
  }

  const handleColorValues = e => {
    setColorValues({ ...colorValues, [e.target.name]: e.target.value });
  }

  const handleAdvantageColorValues = e => {
    setAdvantageColorValues({ ...advantageColorValues, [e.target.name - 1]: e.target.value });
  }

  const changeAdvantageValues = () => {
    setAdvantageLoading(true)
    let advantagesValues = {};
    let brandValues = {};
    let competitor_value = [];
    let advantageColorValue = {};
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

      advantageColorValue = ({ ...advantageColorValue, [index]: '#000000' })
      theme1.push({
        advantage: `Advantage ${index + 1}`,
        brand: true,
        competitor: false,
      })

    }),

      [...Array(Number(advantagesCount))].map((item, index) => {
        let tempArray = [];
        [...Array(Number(competitorsCount))].map((item, index2) => {
          tempArray.push(false)
        });
        competitor_value.push(tempArray)
      })

    setAllValues(advantagesValues)
    setBrandValue(brandValues)
    setCompetitorValue(competitor_value)
    setThemeInputTable1(theme1)
    setAdvantageToggle(false)
    setAdvantageColorValues(advantageColorValue)
    setTimeout(() => {
      setAdvantageLoading(false);
    }, 1000);

  }

  useEffect(() => {
    {
      advantageToggle &&
        changeAdvantageValues()
    }
  }, [advantageToggle])

  const changeCompetitorValues = () => {
    setAdvantageLoading(true)
    setCompetitorName([])
    setCompetitorValue([])
    let competitors_Name = {};
    let competitor_value = [];


    [...Array(Number(competitorsCount))].map((item, index) => {
      competitors_Name = ({ ...competitors_Name, [index]: `Competitor ${index + 1}` })
    });

    [...Array(Number(advantagesCount))].map((item, index) => {
      let tempArray = [];
      [...Array(Number(competitorsCount))].map((item, index2) => {
        tempArray.push(false)
      });
      competitor_value.push(tempArray)
    })

    setCompetitorName(competitors_Name)
    setCompetitorValue(competitor_value)
    setCompetitorToggle(false)
    setTimeout(() => {
      setAdvantageLoading(false);
    }, 1000);
  }

  useEffect(() => {
    {
      competitorToggle &&
        changeCompetitorValues()
    }

  }, [competitorToggle])


  const submitData = async () => {
    let newArray = [];
    let newArray2 = [];
    let newArray3 = [];


    [...Array(Number(advantagesCount))].map((item, index1) => (
      newArray2.push(allValues[index1]),
      [...Array(Number(competitorsCount))].map((item1, index2) => (
        newArray3.push(competitorValue[index1][index2])
      )),
      newArray2.push(newArray3),
      newArray.push(newArray2),
      newArray2 = [],
      newArray3 = []

    ))

    console.log(newArray)
    let data = {
      brand: yourBrand,
      advantages: newArray,
      brand_values: brandValue,
      // competitor_values: competitorValue,
      template_id: selectedTemplate,
      template_name: templateName,
      user_template_id: templateUserId,
      background_color1: colorValues?.background_color1,
      background_color2: colorValues?.background_color2,
      brand_checkbox_color1: colorValues?.brand_checkbox_color1,
      brand_checkbox_color2: colorValues?.brand_checkbox_color2,
      competitors_checkbox_color1: colorValues?.competitors_checkbox_color1,
      competitors_checkbox_color2: colorValues?.competitors_checkbox_color2,
      advantage_color_values: advantageColorValues,
      advantages_count: advantagesCount,
      competitors_name: competitorName,
      competitor_value: competitorValue,
      shop_name: host,
    };

    try {
      const response = await axios.post(`${url}/step-2`, data)
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
                  label="Your Brand"
                  value={yourBrand}
                  onChange={handleBrandName}
                  autoComplete="off"
                />
                <br />

                <Select
                  label="Number of Competitors"
                  options={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                  ]}

                  onChange={handleCompetitorsCount}
                  value={competitorsCount}
                />
                <br />

                <div className='Advantages-Content-Section'>
                  {[...Array(Number(competitorsCount))].map((item, index) => (

                    <div className='Advantages-Inputs-Section' key={index}>
                      <div className='Advantage-Input-Field'>
                        <div className="Polaris-Labelled__LabelWrapper">
                          <div className="Polaris-Label">
                            <label id={index + 1} htmlFor={index + 1}
                              className="Polaris-Label__Text">
                              <span
                                className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">Competitor {index + 1}</span>
                            </label>
                          </div>
                        </div>
                        <div className="Polaris-Connected">
                          <div
                            className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                            <div
                              className="Polaris-TextField Polaris-TextField--hasValue">
                              <input type="text"
                                className="Polaris-TextField__Input"
                                id={index + 1}
                                autoComplete="off"
                                value={competitorName[index]}
                                name={index + 1}
                                onChange={handleCompetitorName}
                              />
                              <div className="Polaris-TextField__Backdrop"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>


                  ))}
                </div>
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
                        ]}
                        onChange={handleAdvantagesCount}
                        value={advantagesCount}
                      />
                    </Layout.Section>

                    <Layout.Section oneHalf></Layout.Section>
                  </Layout>

                  {advantageLoading ? <Loading /> :
                    <div className='Advantages-Content-Section'>
                      {[...Array(Number(advantagesCount))].map((item, index) => (
                        <Layout key={index + 1}>
                          <Layout.Section>
                            <div className='Advantages-Inputs-Section'>
                              <div className='Advantage-Input-Field'>
                                <div className="Polaris-Labelled__LabelWrapper">
                                  <div className="Polaris-Label">
                                    <label id={index + 1} htmlFor={index + 1}
                                      className="Polaris-Label__Text">
                                      <span
                                        className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">Advantage {index + 1}</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="Polaris-Connected">
                                  <div
                                    className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                    <div
                                      className="Polaris-TextField Polaris-TextField--hasValue">
                                      <input type="text"
                                        className="Polaris-TextField__Input"
                                        id={index + 1}
                                        autoComplete="off"
                                        value={allValues[index]}
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

                          <Layout.Section secondary>
                            <div className='Advantages-Brands-Section'>
                              <Stack>
                                <Stack vertical>
                                  <h2>
                                    {yourBrand}
                                  </h2>
                                  <Stack>
                                    <span className='Advantages-Input-True-Icon'>
                                      <label
                                        className={`${brandValue[index] === true || brandValue[index] === 'true' ? 'Selected' : ''}`}>
                                        <input type="radio"
                                          id={index}
                                          name={index}
                                          value={true}
                                          onChange={handleBrandValue}
                                        />
                                        <Icon source={CircleTickMajor}></Icon>
                                      </label>
                                    </span>

                                    <span className='Advantages-Input-False-Icon'>
                                      <label
                                        className={`${brandValue[index] === false || brandValue[index] === 'false' ? 'Selected' : ''}`}>
                                        <input type="radio"
                                          id={index}
                                          name={index}
                                          value={false}
                                          onChange={handleBrandValue}
                                        />
                                        <Icon source={CircleCancelMajor}>
                                        </Icon>
                                      </label>
                                    </span>
                                  </Stack>
                                </Stack>

                                {[...Array(Number(competitorsCount))].map((item, index2) => (
                                  <Stack vertical key={index2}>
                                    <h2>
                                      {competitorName[index2]}
                                    </h2>
                                    <Stack>
                                      <span className='Advantages-Input-True-Icon'>
                                        <label
                                          className={`${competitorValue[index] && competitorValue[index][index2] === true  ? 'Selected' : ''}`}
                                        >
                                          <input type="radio"
                                            // id={[index][index2]}
                                            // name={[index][index2]}
                                            value={true}
                                            onChange={() => handleCompetitorValue(index, index2, true)} />
                                          <Icon source={CircleTickMajor}></Icon>
                                        </label>
                                      </span>

                                      <span className='Advantages-Input-False-Icon'>
                                        <label
                                          className={`${ competitorValue[index] && competitorValue[index][index2] === false ? 'Selected' : ''}`}
                                        >
                                          <input type="radio"competitorValue
                                            // id={[index][index2]}
                                            // name={[index][index2]}
                                            value={false}
                                            onChange={() => handleCompetitorValue(index, index2, false)} />
                                          <Icon source={CircleCancelMajor}>
                                          </Icon>
                                        </label>
                                      </span>
                                    </Stack>
                                  </Stack>
                                ))}

                              </Stack>
                            </div>
                          </Layout.Section>
                        </Layout>
                      ))}
                    </div>}
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
                  {[...Array(Number(advantagesCount))]?.map((item, index) => (
                    <Stack>
                      <label
                        className={`${advantageColorValues[index] === '#FFFFFF' || advantageColorValues[index] === '#EBECF0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: advantageColorValues[index] }}>
                        <input type="color"
                          value={advantageColorValues[index]}
                          name={index + 1}
                          onChange={handleAdvantageColorValues}
                        />
                      </label>
                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            {` Advantage column ${index + 1}`}
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {advantageColorValues[index]}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>
                  ))}
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

              {/*<div className='Advantages-Tables-Preview'>*/}
              {/*  {(() => {*/}
              {/*    switch (selectedTemplate) {*/}
              {/*      case 1:*/}
              {/*        return <Table11 themePc={themeInputTable1} themeMobile={themeInputTable1}*/}
              {/*                        yourBrand={yourBrand}    otherCompetitors={otherCompetitors}/>*/}
              {/*      case 2:*/}
              {/*        return <Table22 themePc={themeInputTable1} themeMobile={themeInputTable1}*/}
              {/*                        yourBrand={yourBrand}    otherCompetitors={otherCompetitors} />*/}
              {/*      case 3:*/}
              {/*        return <Table33 themePc={themeInputTable1} themeMobile={themeInputTable1}*/}
              {/*                        yourBrand={yourBrand}    otherCompetitors={otherCompetitors}/>*/}
              {/*      case 4:*/}
              {/*        return <Table44 themePc={themeInputTable1} themeMobile={themeInputTable1}*/}
              {/*                        yourBrand={yourBrand}    otherCompetitors={otherCompetitors}/>*/}
              {/*      default:*/}
              {/*        break*/}
              {/*    }*/}

              {/*  })()}*/}

              {/*</div>*/}


            </Layout.Section>
          </Layout>
        }
      </Page>
    </div>
  )
}



