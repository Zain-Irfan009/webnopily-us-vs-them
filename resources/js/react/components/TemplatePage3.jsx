import React, { useState, useCallback, useEffect } from 'react'
import { Page, Layout, Card, Select, Icon, Stack, TextField, Loading } from '@shopify/polaris';
import { CircleTickMajor, CircleCancelMajor } from '@shopify/polaris-icons';
import { Table1, Table2, Table3, Table4, SideBarNavigation } from '../components/usVsThem/index';

export function TemplatePage3({ activePage, setActivePage, selectedTemplate, setSelectedTemplate }) {

  const [yourBrand, setYourBrand] = useState('Your brand');
  const [otherCompetitors, setOtherCompetitors] = useState('Other Competitors');
  const [advantagesCount, setAdvantagesCount] = useState('5');
  const [customAdvantagesCount, setCustomAdvantagesCount] = useState();
  const [loading, setLoading] = useState(false)

  const handleYourBrand = useCallback((value) => setYourBrand(value), []);
  const handleOtherCompetitors = useCallback((value) => setOtherCompetitors(value), []);
  const handleAdvantagesCount = useCallback((value) => setAdvantagesCount(value), []);
  const handleCustomAdvantagesCount = useCallback((value) => setCustomAdvantagesCount(value), []);

  const [allValues, setAllValues] = useState([]);
  const [themeInputTable1, setThemeInputTable1] = useState([]);
  const [ThemeInputTable2, setThemeInputTable2] = useState([]);
  const [ThemeInputTable3, setThemeInputTable3] = useState([]);
  const [ThemeInputTable4, setThemeInputTable4] = useState([]);

  const changeHandler = e => {
    // setAllValues({ ...allValues, [e.target.name - 1]:  e.target.value });

    setAllValues({ ...allValues, [e.target.name - 1]: { advantage: e.target.value } });
    themeInputTable1[e.target.name - 1].name = e.target.value;
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);

    {
      let theme = [];
      let values = [];
      [...Array(Number(advantagesCount))].map((item, index) => (
        // values.push({ name: `Advantage ${index + 1}` }),
        values.push({ advantage: `Advantage ${index + 1}` },),
        theme.push(
          {
            name: `Advantage ${index + 1}`,
            yourBrand: true,
            competitor: false,
          },
        )
      ))
      setThemeInputTable1(theme)

      setAllValues(values)
    }
  }, [advantagesCount])

  useEffect(() => {
    console.log(allValues);
    // console.log(themeInputTable1[0]);
  }, [allValues])

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
                label="Brand"
                value={yourBrand}
                onChange={handleYourBrand}
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
                                      onChange={changeHandler}
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
                                    <Icon source={CircleTickMajor}></Icon>
                                  </span>
                                  <span className='Advantages-Input-False-Icon'>
                                    <Icon source={CircleCancelMajor}></Icon>
                                  </span>
                                </Stack>
                              </Stack>

                              <Stack vertical>
                                <h2>
                                  Competitors
                                </h2>
                                <Stack>
                                  <span className='Advantages-Input-True-Icon'>
                                    <Icon source={CircleTickMajor}></Icon>
                                  </span>
                                  <span className='Advantages-Input-False-Icon'>
                                    <Icon source={CircleCancelMajor}></Icon>
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
          </Layout.Section>


          <Layout.Section secondary>
            <SideBarNavigation activePage={activePage} setActivePage={setActivePage} />

            <div className='Advantages-Tables-Preview'>
              {(() => {
                switch (selectedTemplate) {
                  case 1:
                    return <Table1 themePc={themeInputTable1} themeMobile={themeInputTable1} />
                  case 2:
                    return <Table2 themePc={themeInputTable1} themeMobile={themeInputTable1} />
                  case 3:
                    return <Table3 themePc={themeInputTable1} themeMobile={themeInputTable1} />
                  case 4:
                    return <Table4 themePc={themeInputTable1} themeMobile={themeInputTable1} />
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



