import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Page, Layout, Text, Card, Select, Icon, Stack, TextField, Loading, PageActions, Toast } from '@shopify/polaris';
import { CircleTickMajor, CircleCancelMajor } from '@shopify/polaris-icons';
import { Table1, Table2, Table3, Table4, SideBarNavigation } from './index';
import axios from "axios";
import { AppContext } from '../Context'


export function TemplatePage3() {
  const { selectedTemplate, templateUserId, url, setActivePage } = useContext(AppContext);
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
  const [successToast, setSuccessToast] = useState(false);
  const [valueType, setValueType] = useState([])

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


  const getData = async () => {
    const response = await axios
      .get(
        `${url}/template-data?user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        console.log('table data response', res.data.result);
        setTemplateName(res.data.result.template_name)
        setYourBrand(res.data.result.brand)
        setCompetitorsCount(res.data.result.competators_count)
        setAdvantagesCount(res.data.result.advantages_count)

        setAllValues(res.data.result.advantages)
        setCompetitorName(res.data.result.competitors_name)
        setValueType(res.data.result.advantage_text_icon)
        setBrandValue(res.data.result.brand_value)
        setCompetitorValue(res.data.result.competitor_value)
        setColorValues(res.data.result.primary_colors[0])

        setAdvantageColorValues(res.data.result.advantage_color_values)
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

  const toggleToastActive = () => {
    setSuccessToast(false);
  }

  const toastSuccess = successToast ? (
    <Toast content="Template Saved" onDismiss={toggleToastActive} duration={1500} />
  ) : null;


  const handleValueTypeChange = e => {
    setValueType({ ...valueType, [e.target.name]: e.target.value });
  }

  const handleAllValues = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  }

  const handleCompetitorName = e => {
    setCompetitorName({ ...competitorName, [e.target.name]: e.target.value });
  }

  const handleBrandValue = e => {

    if (e.target.value === 'true') {
      setBrandValue({ ...brandValue, [e.target.name]: true });
    }
    else if (e.target.value === 'false') {
      setBrandValue({ ...brandValue, [e.target.name]: false });
    }
    else {
      setBrandValue({ ...brandValue, [e.target.name]: e.target.value });
    }

  }


  const handleCompetitorValue = (index, index2, e) => {
    let competitor_values = (competitorValue)

    if (e.target.value === 'true') {
      competitor_values[index][index2] = true;
    }
    else if (e.target.value === 'false') {
      competitor_values[index][index2] = false;
    }
    else {
      competitor_values[index][index2] = e.target.value;
    }

    setCompetitorValue(competitor_values)
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
    let value_type = {};


    [...Array(Number(advantagesCount))].map((item, index) => {

      // if (index < fixedAdvantages.length) {
      //   advantagesValues = ({ ...advantagesValues, [index]: fixedAdvantages[index] })
      //   brandValues = ({ ...brandValues, [index]: fixedBrand[index] })
      //   competitorValues = ({ ...competitorValues, [index]: fixedCompetitor[index] })
      // }
      // else {
      //   advantagesValues = ({ ...advantagesValues, [index]: `Advantage ${index + 1}` })
      //   brandValues = ({ ...brandValues, [index]: true })
      //   competitorValues = ({ ...competitorValues, [index]: false })
      // }

      advantagesValues = ({ ...advantagesValues, [index]: `Advantage ${index + 1}` })
      brandValues = ({ ...brandValues, [index]: true })
      value_type = ({ ...value_type, [index]: 'icon' })
      advantageColorValue = ({ ...advantageColorValue, [index]: '#000000' })
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
    setValueType(value_type)
    setCompetitorValue(competitor_value)
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
    setBtnLoading(true)
    let newArray = [];
    let newArray2 = [];
    let newArray3 = [];


    [...Array(Number(advantagesCount))].map((item, index1) => (
      newArray2.push(allValues[index1]),
      newArray2.push(valueType[index1]),
      [...Array(Number(competitorsCount))].map((item1, index2) => (
        newArray3.push(competitorValue[index1][index2])
      )),
      newArray2.push(newArray3),
      newArray.push(newArray2),
      newArray2 = [],
      newArray3 = []

    ))

    let data = {
      brand: yourBrand,
      advantages: newArray,
      brand_values: brandValue,
      template_id: selectedTemplate,
      template_name: templateName,
      user_template_id: templateUserId,
      advantages_count: advantagesCount,
      competitors_name: competitorName,
      competitor_value: competitorValue,

      background_color1: colorValues?.background_color1,
      background_color2: colorValues?.background_color2,
      brand_background1: colorValues?.brand_background1,
      brand_background2: colorValues?.brand_background2,
      text_advantages_color: colorValues?.text_advantages_color,
      text_brand_color: colorValues?.text_brand_color,
      text_competitor_color: colorValues?.text_competitor_color,
      brand_checkbox_color1: colorValues?.text_brand_color,
      brand_checkbox_color2: colorValues?.brand_checkbox_color2,
      competitor_backgorund1: colorValues?.competitor_backgorund1,
      competitor_backgorund2: colorValues?.competitor_backgorund2,
      competitors_checkbox_color1: colorValues?.competitors_checkbox_color1,
      competitors_checkbox_color2: colorValues?.competitors_checkbox_color2,
      text_brand_color_inside: colorValues?.text_brand_color_inside,
      text_competitor_color_inside: colorValues?.text_competitor_color_inside,
      advantage_color_values: advantageColorValues,

      shop_name: host,
    };

    try {
      const response = await axios.post(`${url}/step-2`, data)
      console.log('submit template response ', response);
      setBtnLoading(false)
      setSuccessToast(true)
      setActivePage(4)
    } catch (error) {
      setBtnLoading(false)
      alert('Error ', error);
    }
  }
  useEffect(() => {
    document.documentElement.style.setProperty('--template-table-bg-odd-color', colorValues?.background_color1);
    document.documentElement.style.setProperty('--template-table-bg-even-color', colorValues?.background_color2);
  }, [colorValues])


  useEffect(() => {
    // console.log('allValues:', allValues);
    // console.log('competitorName:', competitorName);
    // console.log('valueType: ', valueType);
    // console.log('brandValue', brandValue);
    // console.log('competitorValue: ', competitorValue);
  }, [allValues, competitorName, valueType, brandValue, competitorValue])

  // useEffect(() => {
  //   console.log('valueType: ', valueType);
  //   console.log('brandValue', brandValue);
  //   console.log('competitorValue: ', competitorValue);
  // })


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
              >
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

                {selectedTemplate === 2 ?
                  <span>
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
                  </span> : ""
                }


                <div className='Advantages-Content-Section'>
                  {[...Array(Number(competitorsCount))].map((item, index) => (

                    <div className='Advantages-Inputs-Section' key={index}>
                      <div className='Advantage-Input-Field'>
                        <div className="Polaris-Labelled__LabelWrapper">
                          <div className="Polaris-Label">
                            <label htmlFor={index}
                              className="Polaris-Label__Text">
                              {selectedTemplate === 2 ?
                                <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">
                                  Competitor {index + 1}
                                </span>
                                :
                                <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">
                                  Competitor
                                </span>
                              }
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
                                id={index}
                                autoComplete="off"
                                value={competitorName[index]}
                                name={index}
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

              >

                <div className='Advantages-Layout'>
                  <div className='Advantages-Count-Section'>
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
                  </div>

                  {advantageLoading ? <Loading /> :
                    <div className='Advantages-Content-Section'>
                      {[...Array(Number(advantagesCount))].map((item, index) => (
                        <Layout key={index}>
                          <Layout.Section oneHalf>
                            <Stack>
                              <div className='Advantages-Inputs-Section'>
                                <div className='Advantage-Input-Field'>
                                  <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                      <label htmlFor={index}
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
                                          id={index}
                                          autoComplete="off"
                                          value={allValues[index]}
                                          name={index}
                                          onChange={handleAllValues}
                                        />
                                        <div className="Polaris-TextField__Backdrop"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {selectedTemplate === 3 | selectedTemplate === 4 ?
                                <div className='Advantages-Brands-Type'>
                                  <Stack vertical>
                                    <h2>Text Or Icon </h2>
                                    <div className="Polaris-Select">
                                      <select
                                        id={index}
                                        name={index}
                                        className="Polaris-Select__Input"
                                        aria-invalid="false"
                                        onChange={handleValueTypeChange}
                                      >
                                        <option value="icon">Icon</option>
                                        <option value="text">Text</option>
                                      </select>
                                      <div className="Polaris-Select__Content" aria-hidden="true">
                                        <span className="Polaris-Select__SelectedOption">{valueType[index]}</span>
                                        <span className="Polaris-Select__Icon">
                                          <span className="Polaris-Icon">
                                            <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
                                            </span>
                                            <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                              <path d="M7.676 9h4.648c.563 0 .879-.603.53-1.014l-2.323-2.746a.708.708 0 0 0-1.062 0l-2.324 2.746c-.347.411-.032 1.014.531 1.014Zm4.648 2h-4.648c-.563 0-.878.603-.53 1.014l2.323 2.746c.27.32.792.32 1.062 0l2.323-2.746c.349-.411.033-1.014-.53-1.014Z">
                                              </path>
                                            </svg>
                                          </span>
                                        </span>
                                      </div>
                                      <div className="Polaris-Select__Backdrop"></div>
                                    </div>
                                  </Stack>
                                </div>
                                : ""
                              }

                            </Stack>

                          </Layout.Section>

                          <Layout.Section oneHalf>
                            {selectedTemplate === 3 | selectedTemplate === 4 ?
                              valueType[index] === 'text' ?

                                <div className='Advantages-Text-Section'>
                                  <Stack>
                                    <Stack vertical>
                                      <h2>
                                        {yourBrand}
                                      </h2>
                                      <div className="Polaris-Connected">
                                        <div
                                          className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                          <div
                                            className="Polaris-TextField Polaris-TextField--hasValue">
                                            <input type="text"
                                              className="Polaris-TextField__Input"
                                              id={index}
                                              autoComplete="off"
                                              value={brandValue[index]}
                                              name={index}
                                              onChange={handleBrandValue}
                                            />
                                            <div className="Polaris-TextField__Backdrop"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </Stack>

                                    {[...Array(Number(competitorsCount))].map((item, index2) => (
                                      <Stack vertical>
                                        <h2>
                                          {competitorName[index2]}
                                        </h2>
                                        <div className="Polaris-Connected">
                                          <div
                                            className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                            <div
                                              className="Polaris-TextField Polaris-TextField--hasValue">
                                              <input type="text"
                                                className="Polaris-TextField__Input"
                                                autoComplete="off"
                                                value={competitorValue[index] && competitorValue[index][index2]}
                                                onChange={(e) => handleCompetitorValue(index, index2, e)}
                                              />
                                              <div className="Polaris-TextField__Backdrop"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </Stack>
                                    ))}
                                  </Stack>
                                </div>

                                :

                                <div className='Advantages-Icons-Section'>
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
                                              className={`${competitorValue[index] && competitorValue[index][index2] === true ? 'Selected' : ''}`}
                                            >
                                              <input type="radio"
                                                value={true}
                                                onChange={(e) => handleCompetitorValue(index, index2, e)} />
                                              <Icon source={CircleTickMajor}></Icon>
                                            </label>
                                          </span>

                                          <span className='Advantages-Input-False-Icon'>
                                            <label
                                              className={`${competitorValue[index] && competitorValue[index][index2] === false ? 'Selected' : ''}`}
                                            >
                                              <input type="radio"
                                                value={false}
                                                onChange={(e) => handleCompetitorValue(index, index2, e)} />
                                              <Icon source={CircleCancelMajor}>
                                              </Icon>
                                            </label>
                                          </span>
                                        </Stack>
                                      </Stack>
                                    ))}

                                  </Stack>
                                </div>

                              :

                              <div className='Advantages-Icons-Section'>
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
                                            className={`${competitorValue[index] && competitorValue[index][index2] === true ? 'Selected' : ''}`}
                                          >
                                            <input type="radio"
                                              value={true}
                                              onChange={(e) => handleCompetitorValue(index, index2, e)} />
                                            <Icon source={CircleTickMajor}></Icon>
                                          </label>
                                        </span>

                                        <span className='Advantages-Input-False-Icon'>
                                          <label
                                            className={`${competitorValue[index] && competitorValue[index][index2] === false ? 'Selected' : ''}`}
                                          >
                                            <input type="radio"
                                              value={false}
                                              onChange={(e) => handleCompetitorValue(index, index2, e)} />
                                            <Icon source={CircleCancelMajor}>
                                            </Icon>
                                          </label>
                                        </span>
                                      </Stack>
                                    </Stack>
                                  ))}

                                </Stack>
                              </div>
                            }
                          </Layout.Section>
                        </Layout>
                      ))}
                    </div>}
                </div>
              </Card>

              {/* {selectedTemplate === 1 || selectedTemplate === 2 &&
                <Card
                  sectioned
                  title='Styling'
                >
                  <Text variant="headingMd" as="h5" fontWeight='semibold'>
                    Colors
                  </Text>

                  <div className='Color-Inputs MarginZero'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Advantages colors
                    </Text>
                    <Stack>
                      <label
                        className={`${colorValues?.background_color1 === '#ffffff' || colorValues?.background_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Line Background 1
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.background_color2 === '#ffffff' || colorValues?.background_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Line Background 2
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color2}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.text_advantages_color === '#FFFFFF' || colorValues?.text_advantages_color === '#EBECF0' ||
                          colorValues?.text_advantages_color === '#ffffff' || colorValues?.text_advantages_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_advantages_color }}>
                        <input type="color"
                          value={colorValues?.text_advantages_color}
                          name='text_advantages_color'
                          onChange={handleColorValues}
                        />
                      </label>
                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Advantage Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_advantages_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>
                  </div>


                  <div className='Color-Inputs'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Brand Color
                    </Text>
                    <Stack>
                      <label
                        className={`${colorValues?.text_brand_color === '#ffffff' || colorValues?.text_brand_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_brand_color }}>
                        <input type="color"
                          value={colorValues?.text_brand_color}
                          name='text_brand_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Brand Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_brand_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_background1 === '#ffffff' || colorValues?.brand_background1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.brand_background1 }}>
                        <input type="color"
                          value={colorValues?.brand_background1}
                          name='brand_background1'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Brand Background 1
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.brand_background1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_background2 === '#ffffff' || colorValues?.brand_background2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.brand_background2 }}>
                        <input type="color"
                          value={colorValues?.brand_background2}
                          name='brand_background2'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Brand Background 2
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.brand_background2}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color1 === '#ffffff' || colorValues?.brand_checkbox_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Check Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.brand_checkbox_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color2 === '#ffffff' || colorValues?.brand_checkbox_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                      Competitors Color
                    </Text>
                    <Stack>
                      <label
                        className={`${colorValues?.text_competitor_color === '#ffffff' || colorValues?.text_competitor_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_competitor_color }}>
                        <input type="color"
                          value={colorValues?.text_competitor_color}
                          name='text_competitor_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Competitor Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_competitor_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

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
                            Check Color
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
              } */}

              {selectedTemplate === 1 || selectedTemplate === 2 ?
                <Card
                  sectioned
                  title='Styling'
                >
                  <Text variant="headingMd" as="h5" fontWeight='semibold'>
                    Colors
                  </Text>

                  <div className='Color-Inputs MarginZero'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Advantages colors
                    </Text>
                    <Stack>
                      <label
                        className={`${colorValues?.background_color1 === '#ffffff' || colorValues?.background_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Line Background 1
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.background_color2 === '#ffffff' || colorValues?.background_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Line Background 2
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color2}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.text_advantages_color === '#FFFFFF' || colorValues?.text_advantages_color === '#EBECF0' ||
                          colorValues?.text_advantages_color === '#ffffff' || colorValues?.text_advantages_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_advantages_color }}>
                        <input type="color"
                          value={colorValues?.text_advantages_color}
                          name='text_advantages_color'
                          onChange={handleColorValues}
                        />
                      </label>
                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Advantage Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_advantages_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>
                  </div>

                  <div className='Color-Inputs'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Brand Color
                    </Text>
                    <Stack>
                      <label
                        className={`${colorValues?.text_brand_color === '#ffffff' || colorValues?.text_brand_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_brand_color }}>
                        <input type="color"
                          value={colorValues?.text_brand_color}
                          name='text_brand_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Brand Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_brand_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    {selectedTemplate === 1 &&
                      <>
                        <Stack>
                          <label
                            className={`${colorValues?.brand_background1 === '#ffffff' || colorValues?.brand_background1 === '#ebecf0' ?
                              'Color-Circle-Border' : ''} Color-Circle`}
                            style={{ backgroundColor: colorValues?.brand_background1 }}>
                            <input type="color"
                              value={colorValues?.brand_background1}
                              name='brand_background1'
                              onChange={handleColorValues}
                            />
                          </label>

                          <span className='Color-Property'>
                            <Stack vertical>
                              <Text variant="headingSm" as="h6" fontWeight="semibold">
                                Brand Background 1
                              </Text>
                              <Text variant="headingXs" as="h6" fontWeight="medium">
                                {colorValues?.brand_background1}
                              </Text>
                            </Stack>
                          </span>
                        </Stack>

                        <Stack>
                          <label
                            className={`${colorValues?.brand_background2 === '#ffffff' || colorValues?.brand_background2 === '#ebecf0' ?
                              'Color-Circle-Border' : ''} Color-Circle`}
                            style={{ backgroundColor: colorValues?.brand_background2 }}>
                            <input type="color"
                              value={colorValues?.brand_background2}
                              name='brand_background2'
                              onChange={handleColorValues}
                            />
                          </label>

                          <span className='Color-Property'>
                            <Stack vertical>
                              <Text variant="headingSm" as="h6" fontWeight="semibold">
                                Brand Background 2
                              </Text>
                              <Text variant="headingXs" as="h6" fontWeight="medium">
                                {colorValues?.brand_background2}
                              </Text>
                            </Stack>
                          </span>
                        </Stack>
                      </>
                    }

                    {selectedTemplate === 2 &&
                      <Stack>
                        <label
                          className={`${colorValues?.brand_background1 === '#ffffff' || colorValues?.brand_background1 === '#ebecf0' ?
                            'Color-Circle-Border' : ''} Color-Circle`}
                          style={{ backgroundColor: colorValues?.brand_background1 }}>
                          <input type="color"
                            value={colorValues?.brand_background1}
                            name='brand_background1'
                            onChange={handleColorValues}
                          />
                        </label>

                        <span className='Color-Property'>
                          <Stack vertical>
                            <Text variant="headingSm" as="h6" fontWeight="semibold">
                              Brand Background
                            </Text>
                            <Text variant="headingXs" as="h6" fontWeight="medium">
                              {colorValues?.brand_background1}
                            </Text>
                          </Stack>
                        </span>
                      </Stack>
                    }

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color1 === '#ffffff' || colorValues?.brand_checkbox_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Check Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.brand_checkbox_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color2 === '#ffffff' || colorValues?.brand_checkbox_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                      Competitors Color
                    </Text>

                    <Stack>
                      <label
                        className={`${colorValues?.text_competitor_color === '#ffffff' || colorValues?.text_competitor_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_competitor_color }}>
                        <input type="color"
                          value={colorValues?.text_competitor_color}
                          name='text_competitor_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Competitor Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_competitor_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    {
                      selectedTemplate === 2 &&
                      <>
                        <Stack>
                          <label
                            className={`${colorValues?.competitor_backgorund1 === '#ffffff' || colorValues?.competitor_backgorund1 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                            style={{ backgroundColor: colorValues?.competitor_backgorund1 }}>
                            <input type="color"
                              value={colorValues?.competitor_backgorund1}
                              name='competitor_backgorund1'
                              onChange={handleColorValues}
                            />
                          </label>

                          <span className='Color-Property'>
                            <Stack vertical>
                              <Text variant="headingSm" as="h6" fontWeight="semibold">
                                Competitor Background 1
                              </Text>
                              <Text variant="headingXs" as="h6" fontWeight="medium">
                                {colorValues?.competitor_backgorund1}
                              </Text>
                            </Stack>
                          </span>
                        </Stack>

                        <Stack>
                          <label
                            className={`${colorValues?.competitor_backgorund2 === '#ffffff' || colorValues?.competitor_backgorund2 === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                            style={{ backgroundColor: colorValues?.competitor_backgorund2 }}>
                            <input type="color"
                              value={colorValues?.competitor_backgorund2}
                              name='competitor_backgorund2'
                              onChange={handleColorValues}
                            />
                          </label>

                          <span className='Color-Property'>
                            <Stack vertical>
                              <Text variant="headingSm" as="h6" fontWeight="semibold">
                                Competitor Background 2
                              </Text>
                              <Text variant="headingXs" as="h6" fontWeight="medium">
                                {colorValues?.competitor_backgorund2}
                              </Text>
                            </Stack>
                          </span>
                        </Stack>
                      </>
                    }

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
                            Check Color
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
                :
                <Card
                  sectioned
                  title='Styling'
                >
                  <Text variant="headingMd" as="h5" fontWeight='semibold'>
                    Colors
                  </Text>

                  <div className='Color-Inputs MarginZero'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Advantages colors
                    </Text>

                    <Stack>
                      <label
                        className={`${colorValues?.background_color1 === '#ffffff' || colorValues?.background_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Column Background 1
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.background_color2 === '#ffffff' || colorValues?.background_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Column Background 2
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.background_color2}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.text_advantages_color === '#FFFFFF' || colorValues?.text_advantages_color === '#EBECF0' ||
                          colorValues?.text_advantages_color === '#ffffff' || colorValues?.text_advantages_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_advantages_color }}>
                        <input type="color"
                          value={colorValues?.text_advantages_color}
                          name='text_advantages_color'
                          onChange={handleColorValues}
                        />
                      </label>
                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Advantage Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_advantages_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>
                  </div>

                  <div className='Color-Inputs'>
                    <Text variant="bodyMd" as="p" color="subdued">
                      Brand Color
                    </Text>

                    <Stack>
                      <label
                        className={`${colorValues?.text_brand_color === '#ffffff' || colorValues?.text_brand_color === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_brand_color }}>
                        <input type="color"
                          value={colorValues?.text_brand_color}
                          name='text_brand_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Brand Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_brand_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.text_brand_color_inside === '#ffffff' || colorValues?.text_brand_color_inside === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_brand_color_inside }}>
                        <input type="color"
                          value={colorValues?.text_brand_color_inside}
                          name='text_brand_color_inside'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_brand_color_inside}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color1 === '#ffffff' || colorValues?.brand_checkbox_color1 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                            Check Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.brand_checkbox_color1}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.brand_checkbox_color2 === '#ffffff' || colorValues?.brand_checkbox_color2 === '#ebecf0' ?
                          'Color-Circle-Border' : ''} Color-Circle`}
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
                      Competitors Color
                    </Text>

                    <Stack>
                      <label
                        className={`${colorValues?.text_competitor_color === '#ffffff' || colorValues?.text_competitor_color === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_competitor_color }}>
                        <input type="color"
                          value={colorValues?.text_competitor_color}
                          name='text_competitor_color'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Competitor Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_competitor_color}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

                    <Stack>
                      <label
                        className={`${colorValues?.text_competitor_color_inside === '#ffffff' || colorValues?.text_competitor_color_inside === '#ebecf0' ? 'Color-Circle-Border' : ''} Color-Circle`}
                        style={{ backgroundColor: colorValues?.text_competitor_color_inside }}>
                        <input type="color"
                          value={colorValues?.text_competitor_color_inside}
                          name='text_competitor_color_inside'
                          onChange={handleColorValues}
                        />
                      </label>

                      <span className='Color-Property'>
                        <Stack vertical>
                          <Text variant="headingSm" as="h6" fontWeight="semibold">
                            Text Color
                          </Text>
                          <Text variant="headingXs" as="h6" fontWeight="medium">
                            {colorValues?.text_competitor_color_inside}
                          </Text>
                        </Stack>
                      </span>
                    </Stack>

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
                            Check Color
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
              }



              <div className='Template-Save-Actions'>
                <PageActions
                  primaryAction={{
                    content: 'Save Template',
                    onAction: submitData,
                    disabled: btnloading ? true : false,
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
                      return (
                        <Table1 competitorsCount={competitorsCount} advantagesCount={advantagesCount}
                          advantageLoading={advantageLoading} allValues={allValues}
                          yourBrand={yourBrand} competitorName={competitorName}
                          brandValue={brandValue} competitorValue={competitorValue}
                          colorValues={colorValues} advantageColorValues={advantageColorValues} />
                      )

                    case 2:
                      return (
                        <Table2 competitorsCount={competitorsCount} advantagesCount={advantagesCount}
                          advantageLoading={advantageLoading} allValues={allValues}
                          yourBrand={yourBrand} competitorName={competitorName}
                          brandValue={brandValue} competitorValue={competitorValue}
                          colorValues={colorValues} advantageColorValues={advantageColorValues} />
                      )

                    case 3:
                      return (
                        <Table3 competitorsCount={competitorsCount} advantagesCount={advantagesCount}
                          advantageLoading={advantageLoading} allValues={allValues}
                          yourBrand={yourBrand} competitorName={competitorName}
                          brandValue={brandValue} competitorValue={competitorValue}
                          colorValues={colorValues} advantageColorValues={advantageColorValues} />
                      )

                    case 4:
                      return (
                        <Table4 competitorsCount={competitorsCount} advantagesCount={advantagesCount}
                          advantageLoading={advantageLoading} allValues={allValues}
                          yourBrand={yourBrand} competitorName={competitorName}
                          brandValue={brandValue} competitorValue={competitorValue}
                          colorValues={colorValues} advantageColorValues={advantageColorValues} />
                      )

                    default:
                      break
                  }

                })()}
              </div>

            </Layout.Section>
          </Layout>
        }
        {toastSuccess}
      </Page>
    </div>
  )
}



