import React, { useContext, useState } from 'react'
import { Page, Layout, Card } from '@shopify/polaris';
import { Table1, Table2, Table3, Table4 } from './index'
import axios from "axios";
import { AppContext } from '../Context'

const theme1Pc = [
  {
    name: 'advantage 1',
    yourBrand: true,
    competitor: true,
  },
  {
    name: 'advantage 2',
    yourBrand: true,
    competitor: true,
  },
  {
    name: 'advantage 3',
    yourBrand: true,
    competitor: true,
  },
  {
    name: 'advantage 4',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 5',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 6',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 7',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 8',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 9',
    yourBrand: true,
    competitor: false,
  },
]

const theme1Mobile = [
  {
    name: 'advantage 1',
    yourBrand: true,
    competitor: true,
  },
  {
    name: 'advantage 2',
    yourBrand: true,
    competitor: true,
  },
  {
    name: 'advantage 3',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 4',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 5',
    yourBrand: true,
    competitor: false,
  },
  {
    name: 'advantage 6',
    yourBrand: true,
    competitor: false,
  }
]

const theme2Pc = [
  {
    name: 'advantage 1',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    competitor4: false,
  },
  {
    name: 'advantage 2',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    competitor4: false,
  },
  {
    name: 'advantage 3',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    competitor4: false,
  },
  {
    name: 'advantage 4',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    competitor4: false,
  },
  {
    name: 'advantage 5',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
    competitor4: false,
  },
  {
    name: 'advantage 6',
    yourBrand: true,
    competitor1: false,
    competitor2: false,
    competitor3: true,
    competitor4: true,
  },

]

const theme2Mobile = [
  {
    name: 'your brand',
    advantage1: true,
    advantage2: true,
    advantage3: true,
    advantage4: true,
  },
  {
    name: 'Competitor 1',
    advantage1: false,
    advantage2: false,
    advantage3: false,
    advantage4: false,
  },
  {
    name: 'Competitor 2',
    advantage1: false,
    advantage2: false,
    advantage3: false,
    advantage4: false,
  },
  {
    name: 'Competitor 3',
    advantage1: false,
    advantage2: false,
    advantage3: false,
    advantage4: false,
  },
  {
    name: 'Competitor 4',
    advantage1: false,
    advantage2: false,
    advantage3: false,
    advantage4: false,
  }
]

const theme3Pc = [
  {
    name: 'advantage 1',
    yourBrand: '$39.99',
    competitor1: '$90',
    competitor2: '$109',
    competitor3: '$125',
  },
  {
    name: 'advantage 2',
    yourBrand: 'ecological',
    competitor1: 'pollutant',
    competitor2: 'pollutant',
    competitor3: 'pollutant',
  },
  {
    name: 'advantage 3',
    yourBrand: 'true',
    competitor1: 'false',
    competitor2: 'false',
    competitor3: 'false',
  },
  {
    name: 'advantage 4',
    yourBrand: 'true',
    competitor1: 'false',
    competitor2: 'false',
    competitor3: 'false',
  },
]

const theme3Mobile = [
  {
    name: 'advantage 1',
    yourBrand: '$39.99',
    competitor: '$90',
  },
  {
    name: 'advantage 2',
    yourBrand: 'ecological',
    competitor: 'pollutant',
  },
  {
    name: 'advantage 4',
    yourBrand: 'true',
    competitor: 'false',
  },
  {
    name: 'advantage 4',
    yourBrand: 'true',
    competitor: 'false',
  },
]

const theme4Pc = [
  {
    name: 'advantage 1',
    yourBrand: 'without scratches',
    others: 'with scratches',
  },
  {
    name: 'advantage 2',
    yourBrand: '98%',
    others: '~60%',
  },
  {
    name: 'advantage 3',
    yourBrand: 'natural',
    others: 'chimical',
  },
  {
    name: 'advantage 4',
    yourBrand: 'true',
    others: 'false',
  },
  {
    name: 'advantage 5',
    yourBrand: 'true',
    others: 'false',
  },
]

const theme4Mobile = [
  {
    name: 'advantage 1',
    yourBrand: 'without scratches',
    others: 'with scratches',
  },
  {
    name: 'advantage 2',
    yourBrand: '98%',
    others: '~60%',
  },
  {
    name: 'advantage 3',
    yourBrand: 'natural',
    others: 'chimical',
  },
  {
    name: 'advantage 4',
    yourBrand: 'true',
    others: 'false',
  },
  {
    name: 'advantage 5',
    yourBrand: 'true',
    others: 'false',
  },
]

const themeHeadingsPc =
  [
    { title: '' },
    { title: 'Your Brand' },
    { title: 'Competitor' },
  ]

const themeHeadingsMobile =
  [
    { title: '' },
    { title: 'Advantage 1' },
    { title: 'Advantage 2' },
  ]



export function TemplatePage2() {
  const { setActivePage, templateUserId, setTemplateUserId, setSelectedTemplate, url } = useContext(AppContext);

  let host = location.ancestorOrigins[0].replace(/^https?:\/\//, '');
  const [btnloading, setBtnLoading] = useState(false)

  const handleSelectTemplate = async (templateId) => {

    // setBtnLoading((prev) => {
    //     let toggleId;
    //     if (prev[templateId]) {
    //         toggleId = {[templateId]: false};
    //     } else {
    //         toggleId = {[templateId]: true};
    //     }
    //     return {...toggleId};
    // });
    const response = await axios
      .post(
        `${url}/step-1?template_id=${templateId}&user_template_id=${templateUserId}&shop_name=${host}`
      )
      .then(res => {
        console.log(res);
        setBtnLoading(false)
        setSelectedTemplate(templateId)
        setTemplateUserId(res.data.result.user_template_id)
        setActivePage(3)
      })
      .catch(error => {
        alert('Error: ', error)
        setBtnLoading(false)
      });

  }

  return (
    <div className='Template-Page2'>
      <Page fullWidth>

        <Layout>
          <Layout.Section fullWidth>

            <Card sectioned>
              <h5>Select your favorite template</h5>
              <p> Choose the template that best suits your needs. You will then be able to
                fully customize it.</p>
            </Card>

          </Layout.Section>

          <Layout.Section oneHalf >
            <Table1 themePc={theme1Pc} themeMobile={theme1Mobile} btnShow={true}
              btnloading={btnloading}
              handleSelectTemplate={handleSelectTemplate} />
          </Layout.Section>


          <Layout.Section oneHalf>
            <Table2 themePc={theme2Pc} themeMobile={theme2Mobile} btnShow={true}
              btnloading={btnloading}
              handleSelectTemplate={handleSelectTemplate}
              themeHeadingsMobile={themeHeadingsMobile} themeHeadingsPc={themeHeadingsPc} />
          </Layout.Section>


          <Layout.Section oneHalf>
            <Table3 themePc={theme3Pc} themeMobile={theme3Mobile} btnShow={true}
              btnloading={btnloading}
              handleSelectTemplate={handleSelectTemplate} />
          </Layout.Section>


          <Layout.Section oneHalf>
            <Table4 themePc={theme4Pc} themeMobile={theme4Mobile} btnShow={true}
              btnloading={btnloading}
              handleSelectTemplate={handleSelectTemplate} />
          </Layout.Section>

        </Layout>
      </Page>
    </div>
  )
}


