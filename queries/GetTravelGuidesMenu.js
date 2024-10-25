import { gql } from '@apollo/client'

export const GetTravelGuidesMenu = gql`
  query GetTravelGuidesMenu(
    $first: Int
    $footerHeaderLocation: MenuLocationEnum
  ) {
    footerHeaderMenuItems: menuItems(
      where: { location: $footerHeaderLocation }
      first: $first
    ) {
      nodes {
        id
        path
        label
        parentId
        cssClasses
        connectedNode {
          node {
            ... on Category {
              name
              uri
              categoryImages {
                changeToSlider
                categoryImages {
                  sourceUrl
                }
                categorySlide1 {
                  sourceUrl
                }
              }
              destinationGuides {
                guidesTitle
              }
              countryCode {
                countryCode
              }
              parent {
                node {
                  name
                }
              }
              posts(
                first: 10
                where: { orderby: { field: DATE, order: ASC }, status: PUBLISH }
              ) {
                edges {
                  node {
                    id
                    title
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
