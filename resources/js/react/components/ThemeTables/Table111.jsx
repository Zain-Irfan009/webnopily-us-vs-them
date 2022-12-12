import React, { useState, useContext } from 'react'
import { Card, IndexTable, Icon, Stack, Button, } from '@shopify/polaris';
import {
    TickMinor, CancelMinor, MobileMajor, DesktopMajor, CircleTickMajor, CircleCancelMajor
} from '@shopify/polaris-icons';
import { AppContext } from '../../providers/Context'
import axios from "axios";

export function Table111({ yourBrand, competitorName, advantageLoading, allValues,
    competitorsCount, brandValue, competitorValue, advantagesCount, colorValues, advantageColorValues }) {

    return (
        <>
            {advantageLoading ? '' :

                <div className='Theme-Card-Content'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{yourBrand}</th>
                                {[...Array(Number(competitorsCount))]?.map((item1, index) => (
                                    <th>{competitorName[index]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(Number(advantagesCount))]?.map((item1, index1) => (
                                <tr
                                    style={{ backgroundColor: `${index1 % 2 === 0 ? colorValues.background_color1 : colorValues.background_color2}` }}>
                                    <td style={{ color: `${advantageColorValues[index1]}` }}>
                                        {allValues[index1]}
                                    </td>
                                    <td>
                                        {brandValue[index1] ?
                                            <span style={{ fill: `${colorValues.brand_checkbox_color1}` }}>
                                                <Icon source={TickMinor}></Icon>
                                            </span>
                                            :
                                            <span style={{ fill: `${colorValues.brand_checkbox_color2}` }} >
                                                <Icon source={CancelMinor}></Icon>
                                            </span>

                                        }
                                    </td>
                                    {[...Array(Number(competitorsCount))]?.map((item2, index2) => (
                                        <td>
                                            {competitorValue[index1] && competitorValue[index1][index2] ?
                                                <span style={{ fill: `${colorValues.competitors_checkbox_color1}` }}>
                                                    <Icon source={TickMinor}></Icon>
                                                </span> :
                                                <span style={{ fill: `${colorValues.competitors_checkbox_color2}` }}>
                                                    <Icon source={CancelMinor}></Icon>
                                                </span>
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                {[...Array(Number(competitorsCount))]?.map((item2, index2) => (
                                    <td></td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

            }
        </>
    )
}
