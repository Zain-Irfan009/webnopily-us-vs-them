import React, { useState } from 'react'
import { Card, IndexTable, Icon, Stack } from '@shopify/polaris';
import {
    MobileMajor, DesktopMajor, CircleTickMinor, CircleCancelMinor,
} from '@shopify/polaris-icons';


export function Table4({ yourBrand, competitorName, advantageLoading, allValues,
    competitorsCount, brandValue, competitorValue, advantagesCount, colorValues, advantageColorValues }) {

    const [screen, setScreen] = useState(true)
    const handleScreenSelection = () => {
        setScreen(!screen)
    }

    const resourceName = {
        singular: 'theme',
        plural: 'themes',
    };

    const themeRowsPc = [...Array(Number(advantagesCount))]?.map(
        (item1, index1) => {
            return (
                <IndexTable.Row
                    id={index1}
                    key={index1}
                    position={index1}
                >
                    <IndexTable.Cell>
                        <div style={{ color: `${advantageColorValues[index1]}` }}>
                            {allValues[index1]}
                        </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell >
                        {brandValue[index1] ?
                            <span style={{ fill: `${colorValues.brand_checkbox_color1}` }}>
                                <Icon source={CircleTickMinor}></Icon>
                            </span>
                            :
                            <span style={{ fill: `${colorValues.brand_checkbox_color2}` }} >
                                <Icon source={CircleCancelMinor}></Icon>
                            </span>
                        }
                    </IndexTable.Cell>
                    {[...Array(Number(competitorsCount))]?.map((item2, index2) => (
                        <IndexTable.Cell>
                            {competitorValue[index1] && competitorValue[index1][index2] ?
                                <span style={{ fill: `${colorValues.competitors_checkbox_color1}` }}>
                                    <Icon source={CircleTickMinor}></Icon>
                                </span> :
                                <span style={{ fill: `${colorValues.competitors_checkbox_color2}` }}>
                                    <Icon source={CircleCancelMinor}></Icon>
                                </span>
                            }
                        </IndexTable.Cell>
                    ))}
                </IndexTable.Row>
            )
        });


    const themeHeadingsPc = [];
    themeHeadingsPc.push({ title: '' }),
        themeHeadingsPc.push({ title: `${yourBrand}` }),
        [...Array(Number(competitorsCount))].map((item, index) => (
            themeHeadingsPc.push({ title: `${competitorName[index]}` })
        ))



    return (
        <>
            {!advantageLoading &&
                <Card sectioned>
                    <div className='Theme-Card-Content'>
                        <div className={`${screen ? 'Theme4-Pc-Table' : 'Theme4-Mobile-Table'} Theme-Table`}>
                            <IndexTable
                                resourceName={resourceName}
                                itemCount={advantagesCount?.length}
                                selectable={false}
                                headings={themeHeadingsPc}
                            >
                                {themeRowsPc}
                            </IndexTable>
                        </div>

                        <div className='Screen-Selection'>
                            <Stack>
                                <span></span>
                                <div className='Screen-Selection-Icons'>
                                    <span className={`Screen-Icon ${screen && 'selected'}`}
                                        onClick={handleScreenSelection}>
                                        <Icon source={DesktopMajor} ></Icon>
                                    </span>

                                    <span className={`Screen-Icon ${!screen && 'selected'}`}
                                        onClick={handleScreenSelection}>
                                        <Icon source={MobileMajor}></Icon>
                                    </span>
                                </div>
                                <span></span>
                            </Stack>
                        </div>
                    </div>
                </Card>

            }
        </>

    )
}
